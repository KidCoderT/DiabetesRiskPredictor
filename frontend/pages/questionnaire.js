import React, { useState } from "react";
import QuestionnaireTemplate from "../components/QuestionnaireTemplate";
import Waves from "../components/Waves";
import ToggleSwitch from "../components/ToggleSwitch";
import Field from "../components/Field";
import EmojiRating from "../components/EmojiRating";
import NumInput from "../components/NumInput";
import Router from "next/router";

const education = [
  { value: 1, text: "Never attended school or only kindergarten" },
  { value: 2, text: "Grades 1 - 8 (Elementary)" },
  { value: 3, text: "Grades 9 - 11 (High school)" },
  { value: 4, text: "Grade 12 or GED (High school graduate)" },
  {
    value: 5,
    text: "College 1 year to 3 years (Some college or technical school)",
  },
  { value: 6, text: "College 4 years or more (College graduate)" },
];

const questionnaire = () => {
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("male");
  const [educationLevel, setEducationLevel] = useState(undefined);
  const [income, setIncome] = useState(0);

  const [highBp, setHighBp] = useState(false);
  const [highCholesterol, setHighCholesterol] = useState(false);
  const [highBloodGlucose, setHighBloodGlucose] = useState(false);
  const [medsForHighBp, setMedsForHighBp] = useState(false);

  const [genHlth, setGenHlth] = useState(5);
  const [badMentalHlthDays, setBadMentalHlthDays] = useState(0);
  const [badPhysicalHlthDays, setBadPhysicalHlthDays] = useState(0);
  const [difficultyWalking, setDifficultyWalking] = useState(false);
  const [physicallyActive, setPhysicallyActive] = useState(false);
  const [doDailyExercise, setDoDailyExercise] = useState(false);
  const [waistCircumference, setWaistCircumference] = useState(0.0);
  const [anyPhysicalActivityInPastMonth, setAnyPhysicalActivityInPastMonth] =
    useState(false);

  const [weightUnit, setWeightUnit] = useState("kg");
  const [weight, setWeight] = useState(0.0);
  const [heightFeet, setHeightFeet] = useState(0);
  const [heightInch, setHeightInch] = useState(0);
  const [heightMeters, setHeightMeters] = useState(0.0);

  const [isSmoker, setIsSmoker] = useState(false);
  const [noOfDrinksPerWeek, setNoOfDrinksPerWeek] = useState(0);
  const [hadStroke, setHadStroke] = useState(false);
  const [hadHeartDiseaseOrAttack, setHadHeartDiseaseOrAttack] = useState(false);
  const [hadGestationalDiabetes, setHadGestationalDiabetes] = useState(false);
  const [consumeFruitsEveryday, setConsumeFruitsEveryday] = useState(false);
  const [consumeVeggiesEveryday, setConsumeVeggiesEveryday] = useState(false);

  // GrandParentUncleAuntOrFirstCousinWithDiabetes: bool;
  // ParentsSiblingsOrChildWithDiabetes: bool;
  const [GPUAOFCWithDiabetes, setGPUAOFCWithDiabetes] = useState(false);
  const [PSOCWithDiabetes, setPSOCWithDiabetes] = useState(false);

  const [errors, setErrors] = useState([]);

  const submitForm = async () => {
    let errors_ = [];

    if (age < 13) {
      errors_.push(
        "your too young to have diabetes. enter a age from 13 and above"
      );
    }

    if (educationLevel === undefined) {
      errors_.push("Select your education level");
    }

    if (waistCircumference <= 58) {
      errors_.push(
        "Your waist level is a bit too small and kinda indicates you as a kid."
      );
    }

    if (weight === 0) {
      errors_.push("Enter an actual weight.");
    }

    if (weightUnit === "kg") {
      if (heightMeters === 0) {
        errors_.push("Enter your height");
      }
    } else {
      if (heightFeet === 0 || heightInch === 0) {
        errors_.push("Enter your height in feet and inches");
      }
    }

    setErrors(errors_);

    if (errors_.length === 0) {
      let data = {
        Age: parseInt(age),
        Sex: gender,
        EducationLevel: parseInt(educationLevel),
        Income: parseInt(income),
        HighBP: highBp,
        HighCholesterol: highCholesterol,
        HighBloodGlucose: highBloodGlucose,
        MedsForHighBP: medsForHighBp,
        GeneralHlth: parseInt(genHlth),
        BadMentalHlthDays: parseInt(badMentalHlthDays),
        BadPhysicalHlthDays: parseInt(badPhysicalHlthDays),
        DifficultyWalking: difficultyWalking,
        PhysicallyActive: physicallyActive,
        DailyExercise: doDailyExercise,
        WaistCircumference: parseFloat(waistCircumference),
        AnyPhysicalActivityInPastMonth: anyPhysicalActivityInPastMonth,
        Weight: parseFloat(weight),
        HeightFeet: parseInt(heightFeet),
        HeightInch: parseInt(heightInch),
        HeightMeters: parseFloat(heightMeters),
        WeightType: weightUnit,
        Smoker: isSmoker,
        NoOfDrinksPerWeek: noOfDrinksPerWeek,
        Stroke: hadStroke,
        HeartDiseaseOrAttack: hadHeartDiseaseOrAttack,
        GestationalDiabetes: hadGestationalDiabetes,
        GrandParentUncleAuntOrFirstCousinWithDiabetes: GPUAOFCWithDiabetes,
        ParentsSiblingsOrChildWithDiabetes: PSOCWithDiabetes,
        DoYouConsumeFruitsEveryday: consumeFruitsEveryday,
        DoYouConsumeVeggiesEveryday: consumeVeggiesEveryday,
      };
      console.log(data);

      Router.push({
        pathname: `/result`,
        query: JSON.stringify(data),
      });
    }
  };

  return (
    <div className="w-full h-screen min-h-fit flex justify-evenly items-center overflow-hidden">
      <Waves h="50%" />
      <Waves h="43%" flipped />

      <QuestionnaireTemplate
        header="Questionare"
        submit_text="Submit Result"
        errors={errors}
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        fetchingData={false}
        style="flex-col"
      >
        {/* =========================== Section 1 =========================== */}
        <Field index={1} question={<>How old are you?</>} htmlFor={"age"}>
          <NumInput value={age} setValue={setAge} name={"age"} max={Infinity} />
        </Field>

        <Field index={2} question={<>Gender?</>} htmlFor={"gender"}>
          <div className="w-fit h-fit flex items-center flex-column">
            <select
              name="gender"
              onChange={(e) => setGender(e.target.value)}
              className="form-select w-32 appearance-none block px-4 py-1.5 text-base font-fredoka text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0"
              aria-label="Default select example"
              defaultValue={gender}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </Field>

        <Field
          index={3}
          question={<>What is Your Education Level?</>}
          htmlFor={"education"}
        >
          <select
            className="font-fredoka border-black border-2 focus:border-blue-500 px-1 py-1 text-ellipsis rounded w-64"
            onChange={(e) => setEducationLevel(e.target.value)}
            defaultValue={educationLevel}
          >
            <option
              className="w-full text-md border-b-2 border-gray-400"
              value={undefined}
            >
              None
            </option>
            {education.map((data) => (
              <option
                className="w-full text-md border-b-2 border-gray-400"
                value={data.value}
                key={data.value}
              >
                {data.text}
              </option>
            ))}
          </select>
        </Field>

        <Field
          index={4}
          question={<>What is is your income level?</>}
          note="In Dollars"
          htmlFor={"income"}
        >
          <NumInput
            value={income}
            setValue={setIncome}
            min={0}
            max={Infinity}
            name={"income"}
            hasBigNum
          />
        </Field>

        <div className="my-3" />
        {/* =========================== Section 2 =========================== */}
        <Field
          index={5}
          question={<>Do you have high Blood Pressure?</>}
          htmlFor={"highBp"}
        >
          <ToggleSwitch value={highBp} toggle={setHighBp} name={"highBp"} />
        </Field>

        <Field
          index={6}
          question={<>Do you have high Cholesterol?</>}
          htmlFor={"highCholesterol"}
        >
          <ToggleSwitch
            value={highCholesterol}
            toggle={setHighCholesterol}
            name={"highCholesterol"}
          />
        </Field>

        <Field
          index={7}
          question={<>Do you have high blood Glucose?</>}
          htmlFor={"highBloodGlucose"}
        >
          <ToggleSwitch
            value={highBloodGlucose}
            toggle={setHighBloodGlucose}
            name={"highBloodGlucose"}
          />
        </Field>

        <Field
          index={8}
          question={<>Do you have take medication for high Blood Pressure?</>}
          htmlFor={"medsForHighBP"}
        >
          <ToggleSwitch
            value={medsForHighBp}
            toggle={setMedsForHighBp}
            name={"medsForHighBP"}
          />
        </Field>

        <div className="my-3" />
        {/* =========================== Section 2 =========================== */}
        <Field
          index={9}
          question={
            <>
              On a Scale of 5 to 1. How would you rate <br /> your Health in
              General?
            </>
          }
          note="5 being the worst and 1 being the best!"
          htmlFor="genHlth"
        >
          <EmojiRating rating={genHlth} setRating={setGenHlth} />
        </Field>

        <Field
          index={10}
          question={
            <>
              For how many days during the past 30 <br /> days was your mental
              health not good?
            </>
          }
          htmlFor={"badMentalHlthDays"}
        >
          <NumInput
            value={badMentalHlthDays}
            setValue={setBadMentalHlthDays}
            min={0}
            max={30}
            name={"badMentalHlthDays"}
          />
        </Field>

        <Field
          index={11}
          question={
            <>
              For how many days during the past 30 <br /> days was your physical
              health not good?
            </>
          }
          htmlFor={"badPhysicalHlthDays"}
        >
          <NumInput
            value={badPhysicalHlthDays}
            setValue={setBadPhysicalHlthDays}
            min={0}
            max={30}
            name={"badPhysicalHlthDays"}
          />
        </Field>

        <Field
          index={12}
          question={<>Do you have a difficulty walking up stairs?</>}
          htmlFor={"diffWalk"}
        >
          <ToggleSwitch
            value={difficultyWalking}
            toggle={setDifficultyWalking}
            name="diffWalk"
          />
        </Field>

        <Field
          index={13}
          question={<>Are you Physically Active?</>}
          htmlFor={"physicallyActive"}
        >
          <ToggleSwitch
            value={physicallyActive}
            toggle={setPhysicallyActive}
            name="physicallyActive"
          />
        </Field>

        <Field
          index={14}
          question={<>Do you do Daily Exercise?</>}
          htmlFor={"doDailyExercise"}
        >
          <ToggleSwitch
            value={doDailyExercise}
            toggle={setDoDailyExercise}
            name="doDailyExercise"
          />
        </Field>

        <Field
          index={15}
          question={<>What is your waist circumference?</>}
          htmlFor={"waistCircumference"}
        >
          <div className="flex h-fit w-fit justify-center items-center">
            <input
              type="number"
              className="outline-none border-y-2 border-l-2 border-r-2 border-gray-200 py-[0.125rem] focus:outline-none font-fredoka text-center w-24 rounded font-semibold text-md  md:text-basecursor-default flex items-center text-black "
              id={"waistCircumference"}
              name={"waistCircumference"}
              value={waistCircumference}
              onChange={(event) =>
                setWaistCircumference(parseFloat(event.target.value))
              }
              step={0.1}
            />
            <span className="pl-2 font-fredoka">cm</span>
          </div>
        </Field>

        <Field
          index={16}
          question={<>Have you done any physical activity in the past month?</>}
          htmlFor={"anyPhysicalActivityInPastMonth"}
        >
          <ToggleSwitch
            value={anyPhysicalActivityInPastMonth}
            toggle={setAnyPhysicalActivityInPastMonth}
            name="anyPhysicalActivityInPastMonth"
          />
        </Field>

        <div className="my-3" />
        {/* =========================== Section 3 =========================== */}
        <Field
          index={17}
          question={<>What is Your Weight?</>}
          htmlFor={"weight"}
        >
          <div className="w-fit h-fit flex items-center">
            <input
              type="number"
              className="outline-none border-y-2 border-l-2 border-r-2 border-gray-200 py-1.5 focus:outline-none font-fredoka text-center w-24 rounded font-semibold text-md  md:text-basecursor-default flex items-center text-black "
              id={"weight"}
              name={"weight"}
              value={weight}
              onChange={(event) => setWeight(parseFloat(event.target.value))}
              step={0.1}
            />
            <select
              name="weightType"
              onChange={(e) => setWeightUnit(e.target.value)}
              className="form-select w-20 appearance-none block px-3 py-1.5 ml-2 text-base font-fredoka text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0"
              aria-label="Default select example"
              defaultValue={weightUnit}
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
            </select>
          </div>
        </Field>

        <Field
          index={18}
          question={<>What is Your Height?</>}
          htmlFor={"height"}
        >
          {weightUnit === "kg" ? (
            <div className="w-fit h-fit flex items-center">
              <span className="mr-5 font-fredoka">meters</span>
              <input
                type="number"
                className="outline-none border-y-2 border-l-2 border-r-2 border-gray-200 focus:outline-none font-fredoka text-center w-24 rounded font-semibold text-md  md:text-basecursor-default flex items-center text-black "
                id={"height"}
                name={"height"}
                value={heightMeters}
                onChange={(event) =>
                  setHeightMeters(parseFloat(event.target.value))
                }
                step={0.1}
              />
              <span className="pl-2 font-fredoka">m</span>
            </div>
          ) : (
            <div className="w-fit h-fit flex items-center">
              <span className="mr-5 font-fredoka">feet&inches</span>
              <input
                type="number"
                className="outline-none border-y-2 border-l-2 border-r-2 border-gray-200 focus:outline-none font-fredoka text-center w-10 rounded font-semibold text-md  md:text-basecursor-default flex items-center text-black "
                id={"height"}
                name={"height"}
                value={heightFeet}
                onChange={(event) =>
                  setHeightFeet(parseInt(event.target.value))
                }
              />
              <span className="pl-2 font-fredoka">'</span>
              <input
                type="number"
                className="outline-none border-y-2 border-l-2 border-r-2 border-gray-200 focus:outline-none font-fredoka text-center w-10 rounded font-semibold text-md  md:text-basecursor-default flex items-center text-black "
                id={"height"}
                name={"height"}
                value={heightInch}
                onChange={(event) =>
                  setHeightInch(parseInt(event.target.value))
                }
              />
              <span className="pl-2 font-fredoka">"</span>
            </div>
          )}
        </Field>

        <div className="my-3" />
        {/* =========================== Section 4 =========================== */}
        <Field
          index={19}
          question={<>Have you smoked at least a 100 cigarettes in you life?</>}
          note={"5 packs = 100 cigarettes"}
          htmlFor={"isSmoker"}
        >
          <ToggleSwitch value={isSmoker} toggle={setIsSmoker} name="isSmoker" />
        </Field>

        <Field
          index={20}
          question={<>How many drinks do you have in a week?</>}
          note={"Thats in 7 days"}
          htmlFor={"noOfDrinksPerWeek"}
        >
          <NumInput
            value={noOfDrinksPerWeek}
            setValue={setNoOfDrinksPerWeek}
            min={0}
            max={Infinity}
            name={"noOfDrinksPerWeek"}
          />
        </Field>

        <div className="my-3" />

        <Field
          index={21}
          question={<>Have you ever had a Stroke?</>}
          htmlFor={"hadStroke"}
        >
          <ToggleSwitch
            value={hadStroke}
            toggle={setHadStroke}
            name="hadStroke"
          />
        </Field>

        <Field
          index={22}
          question={
            <>Have you ever had any Coronary heart disease or Heart Attack?</>
          }
          htmlFor={"hadHeartDiseaseOrAttack"}
        >
          <ToggleSwitch
            value={hadHeartDiseaseOrAttack}
            toggle={setHadHeartDiseaseOrAttack}
            name="hadHeartDiseaseOrAttack"
          />
        </Field>

        <div className="my-3" />

        <Field
          index={23}
          question={<>Have you ever had any Gestational Diabetes?</>}
          note={"Only for females"}
          htmlFor={"hadGestationalDiabetes"}
        >
          <ToggleSwitch
            value={hadGestationalDiabetes}
            toggle={setHadGestationalDiabetes}
            name="hadGestationalDiabetes"
          />
        </Field>

        <Field
          index={24}
          question={<>Do you Consume Fruits Everyday?</>}
          htmlFor={"consumeFruitsEveryday"}
        >
          <ToggleSwitch
            value={consumeFruitsEveryday}
            toggle={setConsumeFruitsEveryday}
            name="consumeFruitsEveryday"
          />
        </Field>

        <Field
          index={25}
          question={<>Do you Consume Vegetables Everyday?</>}
          htmlFor={"consumeVeggiesEveryday"}
        >
          <ToggleSwitch
            value={consumeVeggiesEveryday}
            toggle={setConsumeVeggiesEveryday}
            name="consumeVeggiesEveryday"
          />
        </Field>

        <div className="my-3" />

        <Field
          index={26}
          question={
            <>
              Do your Grandparents, Uncle, Aunt or First Cousins have any
              diabetes?
            </>
          }
          htmlFor={"GPUAOFCWithDiabetes"}
        >
          <ToggleSwitch
            value={GPUAOFCWithDiabetes}
            toggle={setGPUAOFCWithDiabetes}
            name="GPUAOFCWithDiabetes"
          />
        </Field>

        <Field
          index={27}
          question={<>Do your Parents, Siblings or Child have Diabetes?</>}
          htmlFor={"PSOCWithDiabetes"}
        >
          <ToggleSwitch
            value={PSOCWithDiabetes}
            toggle={setPSOCWithDiabetes}
            name="PSOCWithDiabetes"
          />
        </Field>
      </QuestionnaireTemplate>
    </div>
  );
};

export default questionnaire;
