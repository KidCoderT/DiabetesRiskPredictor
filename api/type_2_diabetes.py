from fastapi import HTTPException
from schemas import waist_circumference_levels


def run_check(
    age,
    is_female,
    bmi,
    waist_circumference,
    do_any_physical_activity,
    eat_good,
    do_meds_for_high_bp,
    high_blood_glucose,
    parents_siblings_or_child_with_diabetes,
    grandparents_uncle_aunt_or_first_cousin_with_diabetes,
):
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


def check_result(total_score: int):
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
