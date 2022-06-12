from pydantic import BaseModel


class ModelTestDiabetes(BaseModel):
    HighBP: bool | int
    HighChol: bool | int
    CholCheck: bool | int
    BMI: float
    Smoker: bool | int
    Stroke: bool | int
    HeartDiseaseOrAttack: bool | int
    PhysActivity: bool | int
    Fruits: bool | int
    Veggies: bool | int
    HvyAlcoholConsump: bool | int
    AnyHealthcare: bool | int
    NoDocbcCost: bool | int
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: bool | int
    Sex: bool | int
    Age: int
    Education: int
    Income: int


class RiskInputs(BaseModel):
    total_score: int
