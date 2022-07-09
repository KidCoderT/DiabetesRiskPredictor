from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
import uvicorn
import joblib

import schemas
from methods import (
    calculate_age_group,
    calculate_bmi,
    preprocess_model_inputs,
    calculate_income_level,
)
import pre_diabetes
import type_2_diabetes

description = """
This is the api for my diabetes prediction models and tests.
"""

tags_metadata = [
    {"name": "Models", "description": "Operations To Run the models"},
    {"name": "Risk Tests", "description": "Operations To Run the Risk Tests"},
]

app = FastAPI(
    title="DiabetesPredictorAPI",
    description=description,
    version="0.0.1",
    openapi_tags=tags_metadata
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading the Modules
MODEL_1 = joblib.load("./models/model_1.sav")
MODEL_2 = joblib.load("./models/model_2.sav")


@app.get("/")
async def docs():
    """Redirects User to the API docs page on open main page"""
    return RedirectResponse(url="/docs")


@app.post("/model_1", tags=["Models"])
def binary_prediction(inputs: schemas.ModelInputs):
    """Gets the Model 1 Predictions For whether or not you have Diabetes

    Args:
        inputs (schemas.BinaryDiabetesPredictionInput): The inputs for the model

    Returns:
        Dict: Contains the Prediction of the model
    """

    prediction_data = preprocess_model_inputs(inputs)
    return {"result": MODEL_1.predict(prediction_data)[0]}


@app.post("/pre_diabetes_risk_check", tags=["Risk Tests"])
def pre_diabetes_risk_test(form_input: schemas.PreDiabetesRiskTestInput):
    """Shows the Risk of you getting pre diabetes.

    It does this by first asking for the different fields then
    classifies them and gets the appointed scores. Then it adds
    up all the scores to then finally calculate your risk of diabetes

    The OG form: https://www.cdc.gov/diabetes/prevention/pdf/Prediabetes-Risk-Test-Final.pdf

    Args:
        form_input (schemas.PreDiabetesRiskTestInput): the risk test inputs

    Returns:
        dict: Contains your risk level and total score
    """

    is_female = "f" in form_input.Sex.lower()
    bmi = calculate_bmi(
        form_input.Weight,
        form_input.HeightFeet,
        form_input.HeightInch,
        form_input.HeightMeters,
        form_input.WeightType,
    )

    score = pre_diabetes.run_check(
        form_input.Age,
        is_female,
        form_input.GestationalDiabetes,
        form_input.FamilyWithDiabetes,
        form_input.HighBp,
        form_input.PhysicallyActive,
        bmi,
    )

    if isinstance(score, HTTPException):
        raise score

    # result
    return pre_diabetes.check_result(score)


@app.post("/model_2", tags=["Models"])
def multiclass_prediction(inputs: schemas.ModelInputs):
    """Gets the Model 2 Predictions For whether or not you have Diabetes, Pre-Diabetes or No Diabetes

    Args:
        inputs (schemas.BinaryDiabetesPredictionInput): The inputs for the model

    Returns:
        Dict: Contains the Prediction of the model
    """

    prediction_data = preprocess_model_inputs(inputs)
    return {"result": MODEL_2.predict(prediction_data)[0]}


@app.post("/type_2_diabetes_risk_check", tags=["Risk Tests"])
def type2_diabetes_risk_test(form_input: schemas.Type2DiabetesRiskTestInput):
    """Shows the Risk of you getting type 2 diabetes.

    It does this in a similar manner to the pre diabetes checking test

    First it asks for the different fields needed then classifies
    them and gets the appointed scores. Then it adds up all the scores
    to then finally calculate your risk of type 2 diabetes

    The OG form: https://www.cdc.gov/diabetes/prevention/pdf/Prediabetes-Risk-Test-Final.pdf

    Args:
        form_input (schemas.Type2DiabetesRiskTestInput): the risk test inputs

    Returns:
        dict: Contains your risk level, risk note and total score
    """

    bmi = calculate_bmi(
        form_input.Weight,
        form_input.HeightFeet,
        form_input.HeightInch,
        form_input.HeightMeters,
        form_input.WeightType,
    )

    is_female = "f" in form_input.Sex.lower()
    score = type_2_diabetes.run_check(
        form_input.Age,
        is_female,
        bmi,
        form_input.WaistCircumference,
        form_input.DoYouDoAnyPhysActivityAtLeast30Minutes,
        form_input.DoYouEatFruitsBerriesOrVegetablesOnADailyBasis,
        form_input.MedsForHighBP,
        form_input.HighBloodGlucose,
        form_input.ParentsSiblingsOrChildWithDiabetes,
        form_input.GrandParentUncleAuntOrFirstCousin,
    )
    if isinstance(score, HTTPException):
        raise score

    return type_2_diabetes.check_result(score)


@app.post("/combined_diabetes_test", tags=["Models", "Risk Tests"])
def combined_diabetes_test(inputs: schemas.CombinedTestInputs):
    """Unlike the Previos Methods this Api call gives you a full break down of whether
    or not you have diabetes, your riskk of getting pre diabetes and your risk of
    getting type 2 diabetes.

    For this the method uses the model 2 as the checking model and
    uses the same risk scores as above to test the other two requirements

    Args:
        inputs (schemas.CombinedTestInputs)
    """
    bmi = calculate_bmi(
        inputs.Weight,
        inputs.HeightFeet,
        inputs.HeightInch,
        inputs.HeightMeters,
        inputs.WeightType,
    )

    is_female = "f" in inputs.Sex.lower()
    is_male = not is_female

    if (is_male and inputs.NoOfDrinksPerWeek > 14) or (
        is_female and inputs.NoOfDrinksPerWeek > 7
    ):
        heavy_alcohol_consumption = True
    else:
        heavy_alcohol_consumption = False

    age_category = calculate_age_group(inputs.Age)
    income_category = calculate_income_level(inputs.Income)

    family_with_diabetes = (
        inputs.GrandParentUncleAuntOrFirstCousinWithDiabetes
        or inputs.ParentsSiblingsOrChildWithDiabetes
    )

    # 1. Model Prediction
    model_prediction_data = [
        i * 1
        for i in [
            inputs.HighBP,
            inputs.HighCholesterol,
            bmi,
            inputs.Smoker,
            inputs.Stroke,
            inputs.HeartDiseaseOrAttack,
            inputs.AnyPhysicalActivityInPastMonth,
            inputs.DoYouConsumeFruitsEveryday,
            inputs.DoYouConsumeVeggiesEveryday,
            heavy_alcohol_consumption,
            inputs.GeneralHlth,
            inputs.BadMentalHlthDays,
            inputs.BadPhysicalHlthDays,
            inputs.DifficultyWalking,
            is_male,
            age_category,
            inputs.EducationLevel,
            income_category,
        ]
    ]

    model_result = MODEL_2.predict([model_prediction_data])[0]

    # 2. Pre Diabetes Risk Info
    pre_diabetes_score = pre_diabetes.run_check(
        inputs.Age,
        is_female,
        inputs.GestationalDiabetes,
        family_with_diabetes,
        inputs.HighBP,
        inputs.PhysicallyActive,
        bmi,
    )
    if isinstance(pre_diabetes_score, HTTPException):
        raise pre_diabetes_score

    pre_diabetes_risk_score = pre_diabetes.check_result(pre_diabetes_score)

    # 3. Type 2 Diabetes Risk Info
    type_2_diabetes_score = type_2_diabetes.run_check(
        inputs.Age,
        is_female,
        bmi,
        inputs.WaistCircumference,
        inputs.DailyExercise,
        inputs.DoYouConsumeFruitsEveryday or inputs.DoYouConsumeVeggiesEveryday,
        inputs.MedsForHighBP,
        inputs.HighBloodGlucose,
        inputs.ParentsSiblingsOrChildWithDiabetes,
        inputs.GrandParentUncleAuntOrFirstCousinWithDiabetes,
    )
    if isinstance(type_2_diabetes_score, HTTPException):
        raise type_2_diabetes_score

    type2_diabetes_risk_score = type_2_diabetes.check_result(type_2_diabetes_score)

    return {
        "Outcome": model_result,
        "Pre-diabetes Risk Score": pre_diabetes_risk_score,
        "Type_2 diabetes Risk Score": type2_diabetes_risk_score,
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)  # type: ignore
