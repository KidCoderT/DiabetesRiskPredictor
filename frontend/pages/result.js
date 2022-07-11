import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import QuestionnaireTemplate from "../components/QuestionnaireTemplate";
import Waves from "../components/Waves";

const model_comments = [
  "YOU don't HAVE ANY TYPE DIABETES.",
  "YOU MAY HAVE PRE DIABETES.",
  "YOU MAY HAVE TYPE 2 DIABETES.",
];

const result = () => {
  const router = useRouter();
  const [fetchingData, setFetchingData] = useState(true);
  const [response, setResponse] = useState({
    Outcome: 0,
    "Pre-diabetes Risk Score": {
      risk: "",
      total_score: 0,
    },
    "Type_2 diabetes Risk Score": {
      risk: "",
      approx: "",
      total_score: 0,
    },
  });

  const onStartup = async (data) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/combined_diabetes_test`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponse({ ...data });
      })
      .then(() => {
        setFetchingData(false);
      });
  };

  useEffect(() => {
    if (!router.isReady) return;

    const data = router.query;
    let dataCopy = Object.keys({ ...data })[0];
    onStartup(dataCopy);
    console.log(response);
  }, [router.isReady]);

  return (
    <div className="w-full h-screen min-h-fit flex justify-evenly items-center overflow-hidden">
      <Waves h="50%" />
      <Waves h="43%" flipped />

      <QuestionnaireTemplate
        header="Result"
        submit_text="DONE - GO BACK"
        errors={[]}
        onSubmit={(e) => {
          e.preventDefault();
          Router.push(`/`);
        }}
        fetchingData={fetchingData}
        style="justify-evenly items-center"
        loadingText="Fetching Predictions!"
      >
        <div className="w-56 text-center uppercase h-fit font-fredoka px-1 flex items-center justify-center flex-col">
          <div className="rounded border-8 border-black flex justify-center items-center w-44 h-44 flex-col">
            <h2 className="text-[64px] text-center m-0">
              {response["Pre-diabetes Risk Score"].total_score}
            </h2>

            <h2 className="text-[21px] text-center m-0">
              {parseInt(
                (response["Pre-diabetes Risk Score"].total_score / 11) * 100
              )}
              %
            </h2>
          </div>
          <h2 className="text-2xl my-3">pre diabetes test</h2>
          <h2 className="text-lg">
            YOUR TEST RESULT SHOWS {response["Pre-diabetes Risk Score"].risk}!!
          </h2>
        </div>

        <div className="h-full w-2 bg-black rounded-full" />

        <div className="w-56 text-center uppercase h-fit font-fredoka px-1 flex items-center justify-center flex-col">
          <div className="rounded border-8 border-black text-[128px] flex justify-center items-center w-44 h-44">
            {response["Outcome"]}
          </div>
          <h2 className="text-2xl my-3">model</h2>
          <h2 className="text-lg">
            THE MODEL PREDICTS {model_comments[response["Outcome"]]}
          </h2>
        </div>

        <div className="h-full w-2 bg-black rounded-full" />

        <div className="w-56 text-center uppercase h-fit font-fredoka px-1 flex items-center justify-center flex-col">
          <div className="rounded border-8 border-black flex justify-center items-center w-44 h-44 flex-col">
            <h2 className="text-[64px] text-center m-0">
              {response["Type_2 diabetes Risk Score"].total_score}
            </h2>

            <h2 className="text-[21px] text-center m-0">
              {parseInt(
                (response["Type_2 diabetes Risk Score"].total_score / 26) * 100
              )}
              %
            </h2>
          </div>
          <h2 className="text-2xl my-3">type 2 diabetes test</h2>
          <h2 className="text-lg">
            YOUR TEST RESULT SHOWS {response["Type_2 diabetes Risk Score"].risk}
            !!
          </h2>
        </div>
      </QuestionnaireTemplate>
    </div>
  );
};

export default result;
