from fastapi import FastAPI
import schemas

import joblib

app = FastAPI()

# model 1
model_1 = joblib.load('./models/model_1.sav')


# Home Page
@app.get('/')
def hello():
    return "Hello World"


# Test For Diabetes
@app.post('/m1')
def model_1_predict(inputs: schemas.ModelTestDiabetes):
    test_data = [[
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
        inputs.Income
    ]]

    return {"result": model_1.predict(test_data)[0]}


# Test For Possibility of prediabetes
@app.post('/pre')
def prediabetes_risk(inputs: schemas.RiskInputs):
    if inputs.total_score <= 4:
        return {"risk": "low"}
    elif inputs.total_score <= 6:
        return {"risk": "medium"}
    else:
        return {"risk": "high"}


# Test For Type 1 or 2

# Test For possibility of type 2
@app.post('/type_2')
def type2_risk(inputs: schemas.RiskInputs):
    risk = ""
    notes = ""

    if inputs.total_score < 7:
        risk = "low"
        notes = " estimated 1 in 100 will develop disease"
    elif inputs.total_score <= 11:
        risk = "Slightly elevated"
        notes = "estimated 1 in 25 will develop disease"
    elif inputs.total_score <= 14:
        risk = "moderate"
        notes = "estimated 1 in 6 will develop disease"
    elif inputs.total_score <= 20:
        risk = "high"
        notes = "estimated 1 in 3 will develop disease"
    else:
        risk = "Very High"
        notes = "estimated 1 in 2 will develop disease"

    return {"risk": risk, "appprox": notes}
