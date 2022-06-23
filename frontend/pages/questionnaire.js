import React, { useState } from "react";
import QuestionnaireTemplate from "../components/QuestionnaireTemplate";
import Waves from "../components/Waves";
import ToggleSwitch from "../components/ToggleSwitch";
import Field from "../components/Field";
import EmojiRating from "../components/EmojiRating";
import NumInput from "../components/NumInput";

// TODO: Add BMI index chart
// TODO: Redo Sex Field

const questionnaire = () => {
  const [highBPValue, setHighBPValue] = useState(false);
  const [cholValue, setCholValue] = useState(false);
  const [BMI, setBMI] = useState(0);
  const [isSmoker, setIsSmoker] = useState(false);
  const [hadStroke, setHadStroke] = useState(false);
  const [hadHeartDiseaseOrAttack, setHadHeartDiseaseOrAttack] = useState(false);
  const [physActivity, setPhysActivity] = useState(false);
  const [eatsFruits, setEatsFruits] = useState(false);
  const [eatsVeggies, setEatsVeggies] = useState(false);
  const [drinksHvyAlcoholConsump, setDrinksHvyAlcoholConsump] = useState(false);
  const [genHlth, setGenHlth] = useState(1);
  const [mentHlth, setMenHlth] = useState(0);
  const [physHlth, setPhysHlth] = useState(0);
  const [diffWalk, setDiffWalk] = useState(false);
  const [sex, setSex] = useState(false);
  const [age, setAge] = useState(18);
  const [income, setIncome] = useState(5000);

  return (
    <div className="w-full h-screen min-h-fit flex justify-evenly items-center">
      <Waves h="50%" />
      <Waves h="43%" flipped />

      <QuestionnaireTemplate
        header="Step1. Check for is Diabetic?"
        submit_text="Submit Result"
      >
        {/* 1.HighBP */}
        <Field
          index="1"
          question="Do you have High BLood Pressure?"
          htmlFor="highBP"
        >
          <ToggleSwitch
            value={highBPValue}
            toggle={setHighBPValue}
            name="highBP"
          />
        </Field>

        {/* 2.HighChol */}
        <Field
          index="2"
          question="Do you have a High Cholesterol?"
          htmlFor="highChol"
        >
          <ToggleSwitch
            value={cholValue}
            toggle={setCholValue}
            name="highChol"
          />
        </Field>

        {/* 3.BMI */}
        <Field
          index="3"
          question="What is you Body Mass Index Value?"
          htmlFor="BMI"
        >
          <NumInput value={BMI} setValue={setBMI} max={42} name="BMI">
            <a className="text-xl text-blue-600 mr-5 font-fredoka hover:underline cursor-pointer   ">
              ??
            </a>
          </NumInput>
        </Field>

        {/* 4.Smoker */}
        <Field
          index="4"
          question={
            <>
              Have you smoked at least 100 cigarettes <br /> in your entire
              life?
            </>
          }
          htmlFor="smoker"
          note="5 packs = 100 cigarettes"
        >
          <ToggleSwitch value={isSmoker} toggle={setIsSmoker} name="smoker" />
        </Field>

        {/* 5.Stroke */}
        <Field
          index="5"
          question={<>Have you ever had a stroke in you life?</>}
          htmlFor="stroke"
        >
          <ToggleSwitch value={hadStroke} toggle={setHadStroke} name="stroke" />
        </Field>

        {/* 6.HeartDiseaseOrAttack */}
        <Field
          index="6"
          question={
            <>
              Have you ever had a myocardial infarction <br /> or coronary heart
              disease in your life?
            </>
          }
          htmlFor="heartDiseaseOrAttack"
        >
          <ToggleSwitch
            value={hadHeartDiseaseOrAttack}
            toggle={setHadHeartDiseaseOrAttack}
            name="heartDiseaseOrAttack"
          />
        </Field>

        {/* 7.PhysActivity */}
        <Field
          index="7"
          question={
            <>
              Have you done any physical activities <br /> in the past 30 days?
            </>
          }
          note="not including work"
          htmlFor="physActivity"
        >
          <ToggleSwitch
            value={physActivity}
            toggle={setPhysActivity}
            name="physActivity"
          />
        </Field>

        {/* 8.Fruits */}
        <Field
          index="8"
          question={<>Do you consume fruits at least once a day?</>}
          htmlFor="fruits"
        >
          <ToggleSwitch
            value={eatsFruits}
            toggle={setEatsFruits}
            name="fruits"
          />
        </Field>

        {/* 9.Veggies */}
        <Field
          index="9"
          question={<>Do you consume Veggies at least once a day?</>}
          htmlFor="veggies"
        >
          <ToggleSwitch
            value={eatsVeggies}
            toggle={setEatsVeggies}
            name="veggies"
          />
        </Field>

        {/* 10.HvyAlcoholConsump */}
        <Field
          index="10"
          question={
            <>
              Men: Do you have more than 14 drinks per week?
              <br />
              Women: Do you have more than 7 drinks per week?
            </>
          }
          htmlFor="hvyAlcoholConsump"
        >
          <ToggleSwitch
            value={drinksHvyAlcoholConsump}
            toggle={setDrinksHvyAlcoholConsump}
            name="hvyAlcoholConsump"
          />
        </Field>

        {/* 11.GenHlth */}
        <Field
          index="11"
          question={
            <>
              On a Scale of 1 to 5. How would you rate <br /> your Health in
              General?
            </>
          }
          htmlFor="genHlth"
        >
          <EmojiRating rating={genHlth} setRating={setGenHlth} />
        </Field>

        {/* 12.MentHlth */}
        <Field
          index="12"
          question={
            <>
              In the past 30 days, how many days <br /> did you have a poor
              mental health?
            </>
          }
          htmlFor="mentHlth"
        >
          <NumInput
            value={mentHlth}
            setValue={setMenHlth}
            max={30}
            name="mentHlth"
          />
        </Field>

        {/* 13.PhysHlth */}
        <Field
          index="13"
          question={
            <>
              In the past 30 days, how many days <br /> did you have a physical
              illness / injury.
            </>
          }
          htmlFor="physHlth"
        >
          <NumInput
            value={physHlth}
            setValue={setPhysHlth}
            max={30}
            name="physHlth"
          />
        </Field>

        {/* 14.DiffWalk */}
        <Field
          index="14"
          question={
            <>
              Do you have a serious difficulty <br></br> climbing or walking up
              stairs?
            </>
          }
          htmlFor="diffWalk"
        >
          <ToggleSwitch value={diffWalk} toggle={setDiffWalk} name="diffWalk" />
        </Field>

        {/* 15.Sex */}
        <Field
          index="15"
          question={<>What is your Sex? (Male or Female?)</>}
          htmlFor="sex"
        >
          <ToggleSwitch
            value={sex}
            toggle={setSex}
            name="sex"
            options={["Female", "Male"]}
          />
        </Field>

        {/* 16.Age */}
        <Field index="16" question={<>How old Are you?</>} htmlFor="age">
          <NumInput
            value={age}
            setValue={setAge}
            max={Infinity}
            min={18}
            name="age"
          />
        </Field>

        {/* 17.Education */}
        <Field
          index="18"
          question={<>How much is your total income?</>}
          htmlFor="income"
        >
          <NumInput
            value={income}
            setValue={setIncome}
            max={Infinity}
            min={0}
            name="income"
            hasBigNum
          />
        </Field>

        {/* 18.Income */}
        <Field
          index="18"
          question={<>How much is your total income?</>}
          htmlFor="income"
        >
          <NumInput
            value={income}
            setValue={setIncome}
            max={Infinity}
            min={0}
            name="income"
            hasBigNum
          />
        </Field>
      </QuestionnaireTemplate>
    </div>
  );
};

export default questionnaire;
