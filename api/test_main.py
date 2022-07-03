# pylint: disable=relative-beyond-top-level
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_pre_diabetes_method_with_valid_entries():
    """
    This Generates multiple input scenarios,
    calculate their total score and check if it matches
    """

    age_values = [(10, 0), (30, 0), (50, 2), (45, 1), (42, 1), (60, 3), (70, 3)]
    sex_options = [("male", 1), ("female", 0)]
    gestational_diabetes_options = [(True, 1), (False, 0)]
    family_with_diabetes_options = [(True, 1), (False, 0)]
    high_bg_options = [(True, 1), (False, 0)]
    physical_active_options = [(True, 0), (False, 1)]

    weights = [(0, 0), (170, 1), (250, 2), (280, 3)]

    for age in age_values:
        for sex in sex_options:
            for gestation in gestational_diabetes_options:
                for family in family_with_diabetes_options:
                    for bp in high_bg_options:
                        for physical in physical_active_options:
                            for weight in weights:
                                json = {
                                    "Age": age[0],
                                    "Sex": sex[0],
                                    "GestationalDiabetes": gestation[0],
                                    "FamilyWithDiabetes": family[0],
                                    "HighBp": bp[0],
                                    "PhysicallyActive": physical[0],
                                    "Weight": weight[0],
                                    "HeightFeet": 5,
                                    "HeightInch": 9,
                                    "WeightType": "lbs",
                                }

                                total_score = (
                                    age[1]
                                    + sex[1]
                                    + gestation[1]
                                    + family[1]
                                    + bp[1]
                                    + physical[1]
                                    + weight[1]
                                )

                                response = client.post(
                                    "/pre_diabetes_risk_check", json=json
                                )
                                assert response.status_code == 200
                                assert response.json()["total_score"] == total_score

    # DONE!


def test_pre_diabetes_method_with_invalid_entries():
    """
    Tests whether invalid entries are returned invalid by the api.

    Do note the only invalid entries are for the Weight and Height Values
    So those are the only fields I care about
    """

    test_1 = client.post(
        "/pre_diabetes_risk_check",
        json={
            "Age": 0,
            "Sex": "string",
            "GestationalDiabetes": True,
            "FamilyWithDiabetes": True,
            "HighBp": True,
            "PhysicallyActive": True,
            "Weight": 60,
            "HeightFeet": 4,
            "HeightInch": 2,
            "HeightMeters": 0,
            "WeightType": "kg",
        },
    )

    assert test_1.status_code == 400
    assert (
        test_1.json()["detail"]
        == "If your specifying the weight in kilograms then you also need to specify the Height in meters!"
    )

    test_2 = client.post(
        "/pre_diabetes_risk_check",
        json={
            "Age": 0,
            "Sex": "string",
            "GestationalDiabetes": True,
            "FamilyWithDiabetes": True,
            "HighBp": True,
            "PhysicallyActive": True,
            "Weight": 60,
            "HeightFeet": 0,
            "HeightInch": 0,
            "HeightMeters": 50,
            "WeightType": "lbs",
        },
    )

    assert test_2.status_code == 400
    assert (
        test_2.json()["detail"]
        == "If your specifying the weight in pounds then you also need to specify the Height in feet & inches!"
    )

    # DONE !!


def test_type2_diabetes_risk_test_with_valid_data():
    """
    Similar to the Test for pre diabetes method. here I give different data,
    calculate its total score and check to see if it matches
    """

    ages = [(0, 0), (46, 1), (60, 2), (80, 3)]
    weights = [(205, 3), (255, 3), (100, 0), (50, 0), (200, 1), (180, 1)]

    waist_circumferences = [
        ("male", 54, 0),
        ("male", 100, 3),
        ("male", 200, 4),
        ("female", 40, 0),
        ("female", 85, 3),
        ("female", 100, 4),
    ]
    do_physical_activity_options = [(True, 0), (False, 2)]
    do_you_eat_fruits_and_veggies_options = [(True, 0), (False, 1)]
    do_you_do_meds_for_high_bp_options = [(True, 2), (False, 0)]
    high_blood_glucose_options = [(True, 5), (False, 0)]

    fam_with_diabetes_options = [
        (False, False, 0),
        (True, False, 3),
        (True, True, 5),
        (False, True, 5),
    ]

    for age in ages:
        for weight in weights:
            for waist in waist_circumferences:
                for physical_activity in do_physical_activity_options:
                    for eat_good in do_you_eat_fruits_and_veggies_options:
                        for do_meds in do_you_do_meds_for_high_bp_options:
                            for glucose in high_blood_glucose_options:
                                for fam in fam_with_diabetes_options:
                                    json = {
                                        "Age": age[0],
                                        "WaistCircumference": waist[1],
                                        "MedsForHighBP": do_meds[0],
                                        "HighBloodGlucose": glucose[0],
                                        "ParentsSiblingsOrChildWithDiabetes": fam[1],
                                        "GrandParentUncleAuntOrFirstCousin": fam[0],
                                        "DoYouDoAnyPhysActivityAtLeast30Minutes": physical_activity[
                                            0
                                        ],
                                        "DoYouEatFruitsBerriesOrVegetablesOnADailyBasis": eat_good[
                                            0
                                        ],
                                        "Sex": waist[0],
                                        "Weight": weight[0],
                                        "HeightFeet": 5,
                                        "HeightInch": 9,
                                        "HeightMeters": 0,
                                        "WeightType": "lbs",
                                    }

                                    total_score = (
                                        age[1]
                                        + weight[1]
                                        + waist[2]
                                        + physical_activity[1]
                                        + eat_good[1]
                                        + do_meds[1]
                                        + glucose[1]
                                        + fam[2]
                                    )

                                    response = client.post(
                                        "/type_2_diabetes_risk_check", json=json
                                    )
                                    assert response.status_code == 200
                                    assert response.json()["total_score"] == total_score

    # DONE !!


def test_type2_diabetes_risk_test_with_invalid_entries():
    """
    Tests whether invalid entries are returned invalid by the api.

    Do note the only invalid entries are for the Weight and Height Values
    So those are the only fields I care about
    """

    test_1 = client.post(
        "/type_2_diabetes_risk_check",
        json={
            "Age": 0,
            "WaistCircumference": 0,
            "MedsForHighBP": True,
            "HighBloodGlucose": True,
            "ParentsSiblingsOrChildWithDiabetes": True,
            "GrandParentUncleAuntOrFirstCousin": True,
            "DoYouDoAnyPhysActivityAtLeast30Minutes": True,
            "DoYouEatFruitsBerriesOrVegetablesOnADailyBasis": True,
            "Sex": "male",
            "Weight": 0,
            "HeightFeet": 4,
            "HeightInch": 2,
            "HeightMeters": 0,
            "WeightType": "kg",
        },
    )

    assert test_1.status_code == 400
    assert (
        test_1.json()["detail"]
        == "If your specifying the weight in kilograms then you also need to specify the Height in meters!"
    )

    test_2 = client.post(
        "/type_2_diabetes_risk_check",
        json={
            "Age": 0,
            "WaistCircumference": 0,
            "MedsForHighBP": True,
            "HighBloodGlucose": True,
            "ParentsSiblingsOrChildWithDiabetes": True,
            "GrandParentUncleAuntOrFirstCousin": True,
            "DoYouDoAnyPhysActivityAtLeast30Minutes": True,
            "DoYouEatFruitsBerriesOrVegetablesOnADailyBasis": True,
            "Sex": "male",
            "Weight": 0,
            "HeightFeet": 0,
            "HeightInch": 0,
            "HeightMeters": 50,
            "WeightType": "lbs",
        },
    )

    assert test_2.status_code == 400
    assert (
        test_2.json()["detail"]
        == "If your specifying the weight in pounds then you also need to specify the Height in feet & inches!"
    )

    # DONE !!
