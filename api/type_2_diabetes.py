from fastapi import HTTPException
from schemas import waist_circumference_levels


def run_check(
    age: int,
    is_female: bool,
    bmi: int | str,
    waist_circumference: float,
    do_any_physical_activity: bool,
    eat_good: bool,
    do_meds_for_high_bp: bool,
    high_blood_glucose: bool,
    parents_siblings_or_child_with_diabetes: bool,
    grandparents_uncle_aunt_or_first_cousin_with_diabetes: bool,
) -> int | HTTPException:
    """Runs the Type 2 diabetes check analyzing the user input and showing the final score

    Args:
        age (int): the age of the person
        is_female (bool): the gender of the person
        bmi (int | str): the body mass index of the person
        waist_circumference (float): the waist circumference of a person
        do_any_physical_activity (bool): does the person do any physical activity
        eat_good (bool): does the person eat fruits or veggies daily
        do_meds_for_high_bp (bool): does the person do meds for high bp
        high_blood_glucose (bool): does the person have high blood glucose
        parents_siblings_or_child_with_diabetes (bool): parents, sibling or child of the person with diabetes
        grandparents_uncle_aunt_or_first_cousin_with_diabetes (bool): grandparents uncle aunt or first_cousin with diabetes

    Returns:
        int | HTTPException: the score obtained for the person. the lower the better
    """

    total_score = 0

    # 1. Age
    if 45 <= age <= 54:
        total_score += 1
    elif 55 <= age <= 64:
        total_score += 2
    elif 64 <= age:
        total_score += 3

    # Sex
    sex = "female" if is_female else "male"

    # 2. BMI
    if isinstance(bmi, str):
        return HTTPException(status_code=400, detail=bmi)
    
    if 25 <= bmi <= 30:
        total_score += 1
    elif bmi > 30:
        total_score += 3

    # 3. Waist Circumference
    waist_data = waist_circumference_levels[sex]
    if waist_circumference < waist_data[0]:
        total_score += 0
    elif waist_circumference <= waist_data[1]:
        total_score += 3
    else:
        total_score += 4

    # 4. Do you do Physical Activity
    if not do_any_physical_activity:
        total_score += 2

    # 5. How Often do you eat fruits and veggies
    if not eat_good:
        total_score += 1

    # 6. Meds for high Blood Pressure
    if do_meds_for_high_bp:
        total_score += 2

    # 7. High Blood Glucose
    if high_blood_glucose:
        total_score += 5

    # 8. Any Family with Diabetes
    if parents_siblings_or_child_with_diabetes:
        total_score += 5
    elif grandparents_uncle_aunt_or_first_cousin_with_diabetes:
        total_score += 3

    return total_score


def check_result(total_score: int) -> dict:
    """Check the risk of getting type_2_diabetes by the persons score

    Args:
        total_score (int): the score obtained by the above check

    Returns:
        dict: the result of the check
    """

    risk = ""
    notes = ""

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
