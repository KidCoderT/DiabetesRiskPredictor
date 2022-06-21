import React from "react";

const Waves = ({ h, flipped = false }) => {
  let pos = flipped ? "top-0" : "bottom-0";
  const sectionData = [
    { color: "#769BFC", percentage: "83%" },
    { color: "#4B75E2", percentage: "62%" },
    { color: "#4F6AB0", percentage: "40%" },
  ];

  let style = (data) => {
    return {
      height: data.percentage,
      background: data.color,
    };
  };

  return (
    <div
      style={style({ percentage: h, color: "#C9D8FF" })}
      className={`absolute ${pos} left-0 h-${h} w-screen `}
    >
      {sectionData.map((data, idx) => (
        <div
          key={idx}
          style={style(data)}
          className={`absolute ${pos} left-0 w-screen bg-opacity-80 backdrop-blur-lg`}
        />
      ))}
    </div>
  );
};

export default Waves;
