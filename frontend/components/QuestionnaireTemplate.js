import React from "react";
import { motion } from "framer-motion";

const QuestionnaireTemplate = ({
  header,
  submit_text,
  errors,
  onSubmit,
  fetchingData,
  children,
}) => {
  const setupTransition = {
    hidden: {
      opacity: 0,
    },
    visible: {
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
      <div
        className={`bg-white w-full h-full rounded-md relative p-5 flex justify-center items-center ${
          !fetchingData ? "flex-col" : "flex-row"
        }`}
      >
        {!fetchingData ? (
          <>
            <div className="w-full h-fit rounded-md flex justify-center items-center">
              <div className="grow h-[3px] bg-black my-4 rounded-full" />

              {/* Header */}
              <h1 className="text-2xl md:text-3xl mid:text-4xl m-3 font-pacifico text-center">
                {header}
              </h1>

              <div className="grow h-[3px] bg-black my-4 rounded-full" />
            </div>

            {/* Body */}
            <div className="w-full grow rounded-lg border-2 scroll-smooth scrollbar border-gray-100 shadow-xl mt-5 mb-2 overflow-y-auto px-6 py-5 flex flex-col items-center">
              {children}
            </div>

            {errors.map((error, idx) => (
              <span className="font-fredoka text-red-600 w-full px-5" key={idx}>
                *{error}
              </span>
            ))}

            {/* Submit Btn */}
            <button
              className="relative flex justify-center items-center py-5 mx-4 text-center w-full mt-3 overflow-hidden font-medium text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner group"
              onClick={onSubmit}
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
              <span className="relative font-fredoka mx-auto transition-colors duration-300 delay-200 group-hover:text-white ease uppercase">
                {submit_text}
              </span>
            </button>
          </>
        ) : (
          <>
            <div class="flex items-center justify-center ">
              <div class="w-40 h-40 border-t-8 border-b-8 border-theme_blue rounded-full animate-spin"></div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default QuestionnaireTemplate;
