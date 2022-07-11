import Image from "next/image";
import { motion } from "framer-motion";
import CustomLink from "../components/CustomLink";
import Link from "next/link";

function Home() {
  const leftSection = {
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

  const rightSection = {
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

  const links = {
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
        variants={leftSection}
        initial="hidden"
        animate="visible"
        className="text-center mid:w-3/5 w-full min-h-fit mid:h-screen p-7 flex flex-col justify-center items-center mid:items-start px-16"
      >
        <motion.h1
          whileHover={{
            scale: 1.1,
            transition: {
              duration: 0.2,
              type: "spring",
              damping: 10,
              stiffness: 100,
            },
          }}
          className="text-3xl sm:text-4xl mid:text-6xl font-pacifico font-thin"
        >
          Diabetes Risk Predictor!
        </motion.h1>
        <motion.p
          whileHover={{
            scale: 1.12,
            transition: {
              duration: 0.1,
              type: "spring",
              damping: 10,
              stiffness: 100,
            },
          }}
          className="font-fredoka text-2xl mt-5 max-w-[500px]"
        >
          This is a small app that can predict wheter or not you have diabetes,
          will get diabetes and even if your diabetes will increase.
          <br />
        </motion.p>
        <motion.p
          whileHover={{
            scale: 1.2,
            transition: {
              duration: 0.2,
              type: "spring",
              damping: 10,
              stiffness: 100,
            },
          }}
          className="text-sm text-gray-600 my-5 leading-4 max-w-[500px] p-2 border-2 border-black rounded border-dashed"
        >
          Do note!: you should still consider checking a doctor for the actual
          result. <br />
          this is just a project and though it is pretty accurate you should
          always consult a doctor when you get a bad reading.
        </motion.p>

        <Link href="/questionnaire">
          <a className="relative min-h-[40px] inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-theme_blue transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
            <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-theme_blue group-hover:h-full border-black group-hover:border-2"></span>
            <span className="absolute right-0 pr-4 duration-100 ease-out group-hover:translate-x-12">
              <svg
                className="w-5 h-5 text-theme_blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white font-fredoka font-thin">
              Start Questioner
            </span>
          </a>
        </Link>
        <div className="w-[90%] h-[3px] bg-black my-4 rounded-full" />

        <motion.div
          variants={links}
          initial="hidden"
          animate="visible"
          className="ml-3 flex flex-wrap justify-center items-center"
        >
          <CustomLink
            text="Github"
            href="https://github.com/KidCoderT"
            color="bg-gray-900"
          />
          <CustomLink
            text="Source Code"
            href="https://github.com/KidCoderT/DiabetesRiskPredictor"
            color="bg-theme_blue"
          />
          <CustomLink
            text="Linkedin"
            href="https://www.linkedin.com/in/tejas-sunil-bb18611b4/"
            color="bg-blue-800"
          />
          <CustomLink
            text="Kaggle"
            href="https://www.kaggle.com/kidcodert"
            color="bg-cyan-600"
          />
        </motion.div>
      </motion.div>

      <motion.div
        variants={rightSection}
        initial="hidden"
        animate="visible"
        className="mid:w-2/5 w-full h-screen min-h-fit flex flex-col justify-center items-center py-10 bg-theme_blue mid:bg-transparent relative overflow-hidden mid:overflow-visible"
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            y: "-35px",
            transition: {
              duration: 0.2,
              type: "spring",
              damping: 10,
              stiffness: 100,
            },
          }}
          className="w-72 h-72 sm:w-96 sm:h-96 h-fit-content m-5 lg:w-96 relative"
        >
          <Image
            src={"/images/kct.png"}
            alt="Me"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </motion.div>

        <h1 className="font-fredoka text-white text-3xl lg:text-4xl">
          @kidcodert
        </h1>

        <div className="absolute ml-20 w-screen h-screen bg-theme_blue -z-40 rotate-[105deg] invisible mid:visible" />
      </motion.div>
    </div>
  );
}

export default Home;
