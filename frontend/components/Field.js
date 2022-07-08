import React from "react";

const Field = ({ index, question, note = undefined, htmlFor, children }) => {
  return (
    <div className="w-full min-h-10 flex-col text-center sm:text-left sm:flex-row flex justify-center sm:justify-between items-center text-xl mb-2">
      <label htmlFor={htmlFor} className="font-fredoka sm:text-lg">
        {index}. {question}{" "}
        {note !== undefined ? (
          <span className="text-xs sm:text-sm text-gray-400">
            [Note: {note}]
          </span>
        ) : (
          <></>
        )}
      </label>
      {children}
    </div>
  );
};

export default Field;
