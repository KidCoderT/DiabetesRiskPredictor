import React from "react";
import { motion } from "framer-motion";

const Waves = ({ h, flipped = false }) => {
  let pos = flipped ? "top-0" : "bottom-0";
  const sectionData = [
    { color: "#769BFC", percentage: "83%" },
    { color: "#4B75E2", percentage: "62%" },
    { color: "#4F6AB0", percentage: "40%" },
  ];

  const setupTransition = {
    hidden: {
      y: flipped ? "-100%" : "100%",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.6,
      },
    },
  };

  let style = (data) => {
    return {
      height: data.percentage,
      background: data.color,
    };
  };

  return (
    <motion.div
      style={style({ percentage: h, color: "#C9D8FF" })}
      variants={setupTransition}
      initial="hidden"
      animate="visible"
      className={`absolute ${pos} left-0 h-${h} w-screen `}
    >
      {sectionData.map((data, idx) => (
        <div
          key={idx}
          style={style(data)}
          className={`absolute ${pos} left-0 w-screen bg-opacity-80 backdrop-blur-lg`}
        />
      ))}
    </motion.div>
  );
};

export default Waves;
