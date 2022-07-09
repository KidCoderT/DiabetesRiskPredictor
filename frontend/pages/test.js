import React from "react";

const test = () => {
  const [text, setText] = React.useState("");

  const getTestMethod = async () => {
    const response = await fetch(`http://127.0.0.1:8000/test/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: "tejas" }),
    });

    const fetchedData = await response.json();
    setText(fetchedData.name);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      {/* button */}
      <button
        onClick={() => getTestMethod()}
        className="px-3 py-1 font-fredoka bg-yellow-400 rounded border-2 border-black hover:bg-yellow-300 transition-all ease-in-out duration-150"
      >
        Request
      </button>

      {/* Text / Response */}
      <p className="font-fredoka text-xl my-20">{text}</p>
    </div>
  );
};

export default test;
