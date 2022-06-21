import React from "react";

const CustomLink = ({ text, href, color }) => {
  return (
    <a
      href={href}
      target="_blank"
      className={`${color} bg-gray-900 rounded p-2 hover:p-3 transition-all transform ease-in-out duration-200 text-white font-fredoka m-1 font-thin tracking-wide`}
      rel="noreferrer"
    >
      {text}
    </a>
  );
};

export default CustomLink;
