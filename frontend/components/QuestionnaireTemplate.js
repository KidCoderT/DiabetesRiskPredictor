import React from "react";
import { motion } from "framer-motion";

const QuestionnaireTemplate = ({ header, submit_text, children }) => {
  const setupTransition = {
    hidden: {
      scale: 3,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={setupTransition}
      initial="hidden"
      animate="visible"
      className="w-[90%] mid:w-[60%] h-[90%] bg-white bg-opacity-40 backdrop-blur-lg drop-shadow-lg rounded-xl flex justify-center items-center p-3"
    >
      <div className="bg-white w-full h-full rounded-md relative p-5 flex justify-center items-center flex-col">
        <div className="w-full h-fit rounded-md flex justify-center items-center">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl mid:text-4xl font-pacifico text-center">
            {header}
          </h1>

          <div class="w-[90%] h-[3px] bg-black my-4 rounded-full" />
        </div>

        {/* Body */}
        <div className="w-full grow rounded-lg border-2 scroll-smooth scrollbar border-gray-100 shadow-xl my-5 overflow-y-auto px-6 py-5 flex flex-col">
          {children}
        </div>

        {/* Submit Btn */}
        <button class="relative flex justify-center items-center py-5 mx-4 text-center w-full overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group">
          <span class="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
          <span class="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
          <span class="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
          <span class="relative font-fredoka mx-auto transition-colors duration-300 delay-200 group-hover:text-white ease uppercase">
            {submit_text}
          </span>
        </button>
      </div>
    </motion.div>
  );
};

export default QuestionnaireTemplate;
