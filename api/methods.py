import schemas


def calculate_age_group(age: int) -> int:
    """Calculates the Age Group For a Given Age

    Args:
        age (int): the age of the person

    Returns:
        int: the group hes supposed to be in
    """

    age_category = 1

    if 25 <= age <= 29:
        age_category = 2
    elif 30 <= age <= 34:
        age_category = 3
    elif 35 <= age <= 39:
        age_category = 4
    elif 40 <= age <= 44:
        age_category = 5
    elif 45 <= age <= 49:
        age_category = 6
    elif 50 <= age <= 54:
        age_category = 7
    elif 55 <= age <= 59:
        age_category = 8
    elif 60 <= age <= 64:
        age_category = 9
    elif 65 <= age <= 69:
        age_category = 10
    elif 70 <= age <= 74:
        age_category = 11
    elif 75 <= age <= 79:
        age_category = 12
    elif age >= 80:
        age_category = 13

    return age_category


def calculate_income_level(income: int) -> int:
    """Given a persons income calculates the income level for a person

    Args:
        income (int): the monthly income of a person

    Returns:
        int: the income level of the person
    """

    income_category = 1
    if 10000 <= income < 15000:
        income_category = 2
    if 15000 <= income < 20000:
        income_category = 3
    if 20000 <= income < 25000:
        income_category = 4
    if 25000 <= income < 35000:
        income_category = 5
    if 35000 <= income < 50000:
        income_category = 6
    if 50000 <= income < 75000:
        income_category = 7
    if 75000 <= income:
        income_category = 8

    return income_category


def preprocess_model_inputs(inputs: schemas.ModelInputs) -> list:
    """Process the user inputs and set it up for the model to use

    Args:
        inputs (schemas.ModelInputs): the user inputs

    Returns:
        list: the format in which the model takes the input
    """

    age = inputs.Age
    age_category = calculate_age_group(age)

    income = inputs.Income
    income_category = calculate_income_level(income)

    return [
        [
            inputs.HighBP * 1,
            inputs.HighChol * 1,
            inputs.BMI,
            inputs.Smoker * 1,
            inputs.Stroke * 1,
            inputs.HeartDiseaseOrAttack * 1,
            inputs.PhysActivity * 1,
            inputs.Fruits * 1,
            inputs.Veggies * 1,
            inputs.HvyAlcoholConsump * 1,
            inputs.GenHlth,
            inputs.MentHlth,
            inputs.PhysHlth,
            inputs.DiffWalk * 1,
            ("f" not in inputs.Sex) * 1,
            age_category,
            inputs.EducationLevel,
            income_category,
        ]
    ]


def calculate_bmi(
    weight: int,
    feet: None | int,
    inches: None | int,
    meters: None | float,
    unit: schemas.WeightUnit = schemas.WeightUnit.KILOGRAMS,
):
    """Calculates the Body Mass Index of a person given the persons weight and height.
       It also work for pounds and kg units

    Args:
        weight (int): the weight of the person in their given unit.
        feet (int, optional): Their Height feet portion. Defaults to None.
        inches (int, optional): Their Height inch portion. Defaults to None.
        meters (float, optional): THeir Height in meters. Defaults to None.
        unit (schemas.WeightUnit, optional): The Unit of weight. Defaults to schemas.WeightUnit.KILOGRAMS.

    Returns:
        str | int: returns either str(ERROR), int(The Body Mass Index)
    """

    bmi = 0
    if unit.value == "kg":
        # Check Fields are Present:
        if meters not in [None, 0]:
            height = meters
            bmi = weight / (height**2)  # type: ignore
        else:
            return "If your specifying the weight in kilograms then you also need to specify the Height in meters!"

    else:
        if feet not in [None, 0] and inches not in [None, 0]:
            height = inches + (feet * 12)  # type: ignore
            bmi = (weight / (height**2)) * 703
        else:
            return "If your specifying the weight in pounds then you also need to specify the Height in feet & inches!"

    return bmi
