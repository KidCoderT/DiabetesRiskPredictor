import React from "react";

const NumInput = ({
  value,
  setValue,
  min = 0,
  max,
  name,
  hasBigNum = false,
  isFLoating = false,
}) => {
  const updateValue = (NewValue) =>
    setValue(Math.max(Number(min), Math.min(Number(max), Number(NewValue))));

  return (
    <div className="w-fit h-fit flex items-center">
      <div
        className={`flex flex-row h-10 ${
          hasBigNum ? "w-44" : "w-32"
        } rounded-lg relative bg-transparent`}
      >
        <button
          onClick={() => updateValue(parseInt(value.valueOf()) - 1)}
          className="font-fredoka border-y-2 border-l-2 border-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer flex justify-center align-center"
        >
          <span className="m-auto text-2xl">−</span>
        </button>
        <input
          type="number"
          className="outline-none border-y-2 border-l-2 border-r-2 border-gray-200 focus:outline-none font-fredoka text-center w-full font-semibold text-md  md:text-basecursor-default flex items-center text-black "
          id={name}
          name={name}
          value={value}
          max={max}
          min={min}
          onChange={(event) => updateValue(parseInt(event.target.value))}
          step={isFLoating ? 0.1 : 1}
        ></input>
        <button
          onClick={() => updateValue(parseInt(value.valueOf()) + 1)}
          className="font-fredoka border-y-2 border-r-2 border-gray-200 text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer flex justify-center align-center"
        >
          <span className="m-auto text-2xl">+</span>
        </button>
      </div>
    </div>
  );
};

export default NumInput;
