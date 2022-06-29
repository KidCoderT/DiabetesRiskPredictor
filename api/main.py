from fastapi import FastAPI
import schemas
import joblib

app = FastAPI()

# model 1
model_1 = joblib.load("./models/model_1.sav")


# Test For Diabetes
@app.get("/m1")
def model_1_predict(inputs: schemas.ModelTestDiabetes):
    test_data = [
        [
            inputs.HighBP * 1,
            inputs.HighChol * 1,
            inputs.CholCheck * 1,
            inputs.BMI,
            inputs.Smoker * 1,
            inputs.Stroke * 1,
            inputs.HeartDiseaseOrAttack * 1,
            inputs.PhysActivity * 1,
            inputs.Fruits * 1,
            inputs.Veggies * 1,
            inputs.HvyAlcoholConsump * 1,
            inputs.AnyHealthcare * 1,
            inputs.NoDocbcCost * 1,
            inputs.GenHlth,
            inputs.MentHlth,
            inputs.PhysHlth,
            inputs.DiffWalk * 1,
            inputs.Sex * 1,
            inputs.Age,
            inputs.Education,
            inputs.Income,
        ]
    ]

    return {"result": model_1.predict(test_data)[0]}


# Test For Possibility of pre-diabetes
@app.get("/pre")
def prediabetes_risk(form_input: schemas.PreDiabetesRiskTestInput):
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
    weight = form_input.Weight
    if form_input.WeightType.value == "kg":
        weight /= 2.205

    check_values = schemas.weight_category[str(form_input.HeightFeet)][
        str(form_input.HeightInch)
    ]
    if check_values[0][1] <= weight <= check_values[0][1]:
        total_score += 1
    elif check_values[1][1] <= weight <= check_values[1][1]:
        total_score += 2
    elif check_values[2] <= weight:
        total_score += 3

    if total_score <= 4:
        return {"risk": "low", "total_score": total_score}
    elif total_score <= 6:
        return {"risk": "medium", "total_score": total_score}
    else:
        return {"risk": "high", "total_score": total_score}


# TODO: Test For Type 1 or 2

# Test For possibility of type 2
@app.get("/type_2")
def type2_risk(form_input: schemas.Type2DiabetesRiskTestInput):
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
    if 25 <= form_input.BodyMassIndex <= 30:
        total_score += 1
    elif form_input.BodyMassIndex > 30:
        total_score += 3

    # 3. Waist Circumference
    waist_data = schemas.waist_circumference[sex]
    if form_input.WaistCircumference < waist_data[0]:
        total_score += 0
    elif form_input.WaistCircumference <= waist_data[1]:
        total_score += 3
    else:
        total_score += 4

    # 4. Do you do Physical Activity
    if form_input.DoYouDoAnyPhysActivityAtLeast30Minutes:
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


# Final Method
