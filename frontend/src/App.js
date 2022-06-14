import cat from "./assets/my-octocat.png";
import { motion } from "framer-motion";

function App() {
  const leftSide = {
    hidden: {
      x: "-50vw",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 0.6,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };

  const rightSide = {
    hidden: {
      x: "150vw",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: 1,
      transition: {
        delay: 0.7,
        duration: 0.3,
        type: "spring",
        damping: 50,
        stiffness: 500,
      },
    },
  };

  const bottomUp = {
    hidden: {
      y: "200px",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        delay: 1.3,
        duration: 1,
        type: "spring",
        damping: 50,
        stiffness: 500,
      },
    },
  };

  return (
    <div className="w-full min-h-fit overflow-x-hidden mid:h-screen flex mid:flex-row flex-col-reverse mid:relative mid:overflow-hidden">
      <motion.div
        variants={leftSide}
        initial="hidden"
        animate="visible"
        className="text-center mid:w-3/5 w-full h-screen p-5 flex flex-col justify-center items-center px-16"
      >
        <h1 className="text-6xl font-pacifico font-thin">
          Diabetes Risk Predictor!
        </h1>
        <p className="font-fredoka text-2xl mt-5 max-w-[500px]">
          This is a small app that can predict wheter or not you have diabetes,
          will get diabetes and even if your diabetes will increase.
          <br />
        </p>
        <p className="text-sm text-gray-600 my-5 leading-4 max-w-[500px] p-2 border-2 border-black rounded border-dashed">
          Do note!: you should still consider checking a doctor for the actual
          result. <br />
          this is just a project and though it is pretty accurate you should
          always consult a doctor when you get a bad reading.
        </p>

        <a
          href="#_"
          class="relative min-h-[40px] inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-theme_blue transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
        >
          <span class="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-theme_blue group-hover:h-full border-black group-hover:border-2"></span>
          <span class="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
            <svg
              class="w-5 h-5 text-theme_blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
            <svg
              class="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span class="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white font-fredoka font-thin">
            Start Questioner
          </span>
        </a>
        <div class="w-[90%] h-[3px] bg-black my-4 rounded-full" />

        <motion.div
          variants={bottomUp}
          initial="hidden"
          animate="visible"
          className="ml-3 flex flex-wrap justify-center items-center"
        >
          <a
            href="https://github.com/KidCoderT"
            target="_blank"
            className="bg-gray-900 rounded p-2 hover:p-3 transition-all transform ease-in-out duration-200 text-white font-fredoka m-1 font-thin tracking-wide"
            rel="noreferrer"
          >
            Github
          </a>
          <a
            href="https://www.kaggle.com/kidcodert"
            target="_blank"
            className="bg-cyan-600 rounded p-2 hover:p-3 transition-all transform ease-in-out duration-200 text-white font-fredoka m-1 font-thin tracking-wide"
            rel="noreferrer"
          >
            Kaggle
          </a>
          <a
            href="https://www.linkedin.com/in/tejas-sunil-bb18611b4/"
            target="_blank"
            className="bg-blue-800 rounded p-2 hover:p-3 transition-all transform ease-in-out duration-200 text-white font-fredoka m-1 font-thin tracking-wide"
            rel="noreferrer"
          >
            Linkedin
          </a>
          <a
            href="https://github.com/KidCoderT/DiabetesRiskPredictor"
            target="_blank"
            className="bg-theme_blue rounded p-2 hover:p-3 transition-all transform ease-in-out duration-200 text-white font-fredoka m-1 font-thin tracking-wide"
            rel="noreferrer"
          >
            Source Code
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        variants={rightSide}
        initial="hidden"
        animate="visible"
        className="mid:w-2/5 w-full h-screen min-h-fit flex flex-col justify-center items-center py-10 bg-theme_blue mid:bg-transparent"
      >
        <img src={cat} alt={"Me"} className="w-72 rounded-full m-5 lg:w-96" />
        <h1 className="font-fredoka text-white text-3xl lg:text-4xl">
          @kidcodert
        </h1>

        <div className="absolute ml-20 w-screen h-screen bg-theme_blue -z-40 rotate-[105deg] invisible mid:visible" />
      </motion.div>
    </div>
  );
}

export default App;
