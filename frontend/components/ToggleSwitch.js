import React from "react";

/*
 TODO Animate Yes & No enter and exit effects
*/

const ToggleSwitch = ({ value, toggle, name, options = ["Yes", "No"] }) => {
  const onToggle = () => toggle(!value);

  return (
    <div className="w-fit h-fit flex items-center">
      <h1 className="font-fredoka uppercase mr-5  transition duration-300">
        {value ? options[0] : options[1]}
      </h1>
      <div className="w-fit h-full flex items-center relative">
        <input
          type="checkbox"
          id={name}
          name={name}
          onChange={() => onToggle()}
          checked={value}
          className="switch cursor-pointer h-8 w-16 rounded-full appearance-none bg-red-500 checked:bg-green-500 border-none transition duration-100"
        />
        <button
          onClick={() => onToggle()}
          class="dot absolute h-9 w-9 border-2 border-gray-200 bg-white rounded-full shadow -left-1 top-[-0.1rem] transition"
        ></button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
