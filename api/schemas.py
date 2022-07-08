# pylint: disable=no-name-in-module
from enum import Enum
from typing import Union
from pydantic import BaseModel


class WeightUnit(str, Enum):
    """Contains Different Weight Units used For the Risk Models
    Used so that I know when to convert the weight value

    Extends:
        str
        Enum
    """

    POUNDS = "lbs"
    KILOGRAMS = "kg"


class ModelInputs(BaseModel):
    """Contains the inputs required for the diabetes predictor models"""

    HighBP: Union[bool, int]
    HighChol: Union[bool, int]
    BMI: float
    Smoker: Union[bool, int]
    Stroke: Union[bool, int]
    HeartDiseaseOrAttack: Union[bool, int]
    PhysActivity: Union[bool, int]
    Fruits: Union[bool, int]
    Veggies: Union[bool, int]
    HvyAlcoholConsump: Union[bool, int]
    GenHlth: int
    MentHlth: int
    PhysHlth: int
    DiffWalk: Union[bool, int]
    Sex: str
    Age: int
    EducationLevel: int
    Income: int


class PreDiabetesRiskTestInput(BaseModel):
    """Contains the Inputs Required to Calculate the Risk for Pre Diabetes"""

    Age: int
    Sex: str
    GestationalDiabetes: bool
    FamilyWithDiabetes: bool
    HighBp: bool
    PhysicallyActive: bool

    Weight: int
    HeightFeet: Union[int, None] = None
    HeightInch: Union[int, None] = None
    HeightMeters: Union[int, None] = None
    WeightType: WeightUnit


class Type2DiabetesRiskTestInput(BaseModel):
    """Contains the Inputs Required to Calculate the Risk for Type 2 Diabetes"""

    Age: int
    WaistCircumference: float
    MedsForHighBP: bool
    HighBloodGlucose: bool

    ParentsSiblingsOrChildWithDiabetes: bool
    GrandParentUncleAuntOrFirstCousin: bool

    DoYouDoAnyPhysActivityAtLeast30Minutes: bool
    DoYouEatFruitsBerriesOrVegetablesOnADailyBasis: bool

    Sex: str

    Weight: int
    HeightFeet: Union[int, None] = None
    HeightInch: Union[int, None] = None
    HeightMeters: Union[int, None] = None
    WeightType: WeightUnit


waist_circumference_levels = {"male": [94, 102], "female": [80, 88]}


class CombinedTestInputs(BaseModel):
    """The Inputs Required to do the Combined Test for all models and risk tests

    Extends:
        BaseModel
    """

    Age: int
    Sex: str
    EducationLevel: int
    Income: int

    HighBP: bool
    HighCholesterol: bool
    HighBloodGlucose: bool
    MedsForHighBP: bool

    GeneralHlth: int
    BadMentalHlthDays: int
    BadPhysicalHlthDays: int
    DifficultyWalking: bool
    PhysicallyActive: bool
    DailyExercise: bool
    WaistCircumference: int
    AnyPhysicalActivityInPastMonth: bool

    Weight: int
    HeightFeet: Union[int, None] = None
    HeightInch: Union[int, None] = None
    HeightMeters: Union[int, None] = None
    WeightType: WeightUnit

    Smoker: bool
    NoOfDrinksPerWeek: int

    Stroke: bool
    HeartDiseaseOrAttack: bool
    GestationalDiabetes: bool

    GrandParentUncleAuntOrFirstCousinWithDiabetes: bool
    ParentsSiblingsOrChildWithDiabetes: bool

    DoYouConsumeFruitsEveryday: bool
    DoYouConsumeVeggiesEveryday: bool
