from fastapi import FastAPI, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import joblib

import schemas
from methods import calculate_bmi, pre_process_model_inputs

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading the Modules
model_1 = joblib.load("./models/model_1.sav")
model_2 = joblib.load("./models/model_2.sav")


@app.get("/")
async def docs():
    return RedirectResponse(url="/docs")


@app.post("/m1")
def binary_prediction(inputs: schemas.ModelInputs):
    """Gets the Model 1 Predictions For whether or not you have Diabetes

    Args:
        inputs (schemas.BinaryDiabetesPredictionInput): The inputs for the model

    Returns:
        Dict: Contains the Prediction of the model
    """

    prediction_data = pre_process_model_inputs(inputs)
    return {"result": model_1.predict(prediction_data)[0]}


@app.post("/pre")
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

    total_score = 0

    # 1. Age
    if 40 <= form_input.Age <= 49:
        total_score += 1
    elif 50 <= form_input.Age <= 59:
        total_score += 2
    elif form_input.Age >= 60:
        total_score += 3

    # 2. Sex
    if "f" in form_input.Sex.lower():
        total_score += 0
    else:
        total_score += 1

    # 3. GestationalDiabetes
    if form_input.GestationalDiabetes:
        total_score += 1

    # 4. FamilyWith Diabetes
    if form_input.FamilyWithDiabetes:
        total_score += 1

    # 5. Do you Have HighBP
    if form_input.HighBp:
        total_score += 1

    # 6. Are you PhysicallyActive
    if not form_input.PhysicallyActive:
        total_score += 1

    # 7. What is your Weight Category
    bmi = calculate_bmi(
        form_input.Weight,
        form_input.HeightFeet,
        form_input.HeightInch,
        form_input.HeightMeters,
        form_input.WeightType,
    )
    if isinstance(bmi, str):
        raise HTTPException(status_code=400, detail=bmi)

    if 25 <= bmi < 30:
        total_score += 1
    elif 30 <= bmi < 40:
        total_score += 2
    elif bmi >= 40:
        total_score += 3

    # result
    if total_score <= 4:
        return {"risk": "low", "total_score": total_score, "bmi": bmi}
    elif total_score <= 6:
        return {"risk": "medium", "total_score": total_score, "bmi": bmi}
    else:
        return {"risk": "high", "total_score": total_score, "bmi": bmi}


@app.post("/m2")
def multiclass_prediction(inputs: schemas.ModelInputs):
    """Gets the Model 2 Predictions For whether or not you have Diabetes, Pre-Diabetes or No Diabetes

    Args:
        inputs (schemas.BinaryDiabetesPredictionInput): The inputs for the model

    Returns:
        Dict: Contains the Prediction of the model
    """

    prediction_data = pre_process_model_inputs(inputs)
    return {"result": model_2.predict(prediction_data)[0]}


@app.post("/type_2")
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

    risk = ""
    notes = ""

    total_score = 0

    # 1. Age
    if 45 <= form_input.Age <= 54:
        total_score += 1
    elif 55 <= form_input.Age <= 64:
        total_score += 2
    elif 64 <= form_input.Age:
        total_score += 3

    # Sex
    sex = "female" if "f" in form_input.Sex.lower() else "male"

    # 2. BMI
    bmi = calculate_bmi(
        form_input.Weight,
        form_input.HeightFeet,
        form_input.HeightInch,
        form_input.HeightMeters,
        form_input.WeightType,
    )
    if isinstance(bmi, str):
        raise HTTPException(status_code=400, detail=bmi)

    if 25 <= bmi <= 30:
        total_score += 1
    elif bmi > 30:
        total_score += 3

    # 3. Waist Circumference
    waist_data = schemas.waist_circumference_levels[sex]
    if form_input.WaistCircumference < waist_data[0]:
        total_score += 0
    elif form_input.WaistCircumference <= waist_data[1]:
        total_score += 3
    else:
        total_score += 4

    # 4. Do you do Physical Activity
    if not form_input.DoYouDoAnyPhysActivityAtLeast30Minutes:
        total_score += 2

    # 5. How Often do you eat fruits and veggies
    if not form_input.DoYouEatFruitsBerriesOrVegetablesOnADailyBasis:
        total_score += 1

    # 6. Meds for high Blood Pressure
    if form_input.MedsForHighBP:
        total_score += 2

    # 7. High Blood Glucose
    if form_input.HighBloodGlucose:
        total_score += 5

    # 8. Any Family with Diabetes
    if form_input.ParentsSiblingsOrChildWithDiabetes:
        total_score += 5
    elif form_input.GrandParentUncleAuntOrFirstCousin:
        total_score += 3

    if total_score < 7:
        risk = "low"
        notes = " estimated 1 in 100 will develop disease"
    elif total_score <= 11:
        risk = "Slightly elevated"
        notes = "estimated 1 in 25 will develop disease"
    elif total_score <= 14:
        risk = "moderate"
        notes = "estimated 1 in 6 will develop disease"
    elif total_score <= 20:
        risk = "high"
        notes = "estimated 1 in 3 will develop disease"
    else:
        risk = "Very High"
        notes = "estimated 1 in 2 will develop disease"

    return {"risk": risk, "approx": notes, "total_score": total_score}


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)  # type: ignore
