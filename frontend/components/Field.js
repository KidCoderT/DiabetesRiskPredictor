import React from "react";

const Field = ({ index, question, note = undefined, htmlFor, children }) => {
  return (
    <div className="w-full min-h-10 flex justify-between items-center text-xl mb-3">
      <label htmlFor={htmlFor} className="font-fredoka">
        {index}. {question}{" "}
        {note !== undefined ? (
          <span className="text-sm text-gray-400">[Note: {note}]</span>
        ) : (
          <></>
        )}
      </label>
      {children}
    </div>
  );
};

export default Field;
