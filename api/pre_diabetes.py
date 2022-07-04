from fastapi import HTTPException


def run_check(
    age: int,
    is_female: bool,
    gestational_diabetes: bool,
    family_with_diabetes: bool,
    high_bp: bool,
    physically_active: bool,
    bmi: str | float,
) -> int | HTTPException:
    """Runs the Pre Diabetes Risk Test and Gets the total score

    Args:
        age (int): the age of the person
        is_female (bool): is the person female
        gestational_diabetes (bool): has the person ever had gestational diabetes
        family_with_diabetes (bool): family with diabetes
        high_bp (bool): do you have high BP
        physically_active (bool): are yiu physically active
        bmi (str | float): whats your calculated bmi

    Returns:
        int | HTTPException: either returns a total score or an error message
    """

    total_score = 0

    # 1. Age
    if 40 <= age <= 49:
        total_score += 1
    elif 50 <= age <= 59:
        total_score += 2
    elif age >= 60:
        total_score += 3

    # 2. Sex
    if is_female:
        total_score += 0
    else:
        total_score += 1

    # 3. GestationalDiabetes
    if gestational_diabetes:
        total_score += 1

    # 4. FamilyWith Diabetes
    if family_with_diabetes:
        total_score += 1

    # 5. Do you Have HighBP
    if high_bp:
        total_score += 1

    # 6. Are you PhysicallyActive
    if not physically_active:
        total_score += 1

    # 7. What is your Weight Category
    if isinstance(bmi, str):
        return HTTPException(status_code=400, detail=bmi)

    if 25 <= bmi < 30:
        total_score += 1
    elif 30 <= bmi < 40:
        total_score += 2
    elif bmi >= 40:
        total_score += 3

    return total_score


def check_result(total_score: int) -> dict:
    """Shows the test result for a given score

    Args:
        total_score (int): the score obtained

    Returns:
        dict: the result
    """

    if total_score <= 4:
        return {"risk": "low", "total_score": total_score}
    elif total_score <= 6:
        return {"risk": "medium", "total_score": total_score}

    return {"risk": "high", "total_score": total_score}
