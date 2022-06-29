from pydantic import BaseModel
from enum import Enum


class WeightUnit(str, Enum):
    POUNDS = "lbs"
    KILOGRAMS = "kg"


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


class PreDiabetesRiskTestInput(BaseModel):
    Age: int
    Sex: str
    GestationalDiabetes: bool
    FamilyWithDiabetes: bool
    HighBp: bool
    PhysicallyActive: bool

    Weight: int
    HeightFeet: int
    HeightInch: int
    WeightType: WeightUnit


class Type2DiabetesRiskTestInput(BaseModel):
    Age: int
    BodyMassIndex: int
    WaistCircumference: float
    MedsForHighBP: bool
    HighBloodGlucose: bool

    ParentsSiblingsOrChildWithDiabetes: bool
    GrandParentUncleAuntOrFirstCousin: bool

    DoYouDoAnyPhysActivityAtLeast30Minutes: bool
    DoYouEatFruitsBerriesOrVegetablesOnADailyBasis: bool

    Sex: str


weight_category = {
    "4": {
        "10": [(119, 142), (143, 190), 190],
        "11": [(124, 147), (148, 197), 198],
    },
    "5": {
        "0": [(128, 152), (153, 203), 204],
        "1": [(132, 157), (158, 210), 211],
        "2": [(136, 163), (164, 217), 218],
        "3": [(141, 168), (169, 224), 225],
        "4": [(145, 173), (174, 231), 232],
        "5": [(150, 179), (180, 239), 240],
        "6": [(155, 185), (186, 246), 247],
        "7": [(159, 190), (191, 254), 255],
        "8": [(164, 196), (197, 261), 262],
        "9": [(169, 202), (203, 269), 270],
        "10": [(174, 208), (209, 277), 278],
        "11": [(179, 214), (215, 285), 286],
    },
    "6": {
        "0": [(184, 220), (221, 293), 294],
        "1": [(189, 226), (227, 301), 302],
        "2": [(194, 232), (233, 310), 311],
        "3": [(200, 239), (240, 318), 319],
        "4": [(205, 245), (246, 237), 328],
    },
}

waist_circumference = {"male": [94, 102], "female": [80, 88]}
