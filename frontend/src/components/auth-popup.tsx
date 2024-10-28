import { useEffect, useState } from "react";

interface PopupProps {
  message: string;
  isVisible: boolean;
  textColor: string;
}

const Popup: React.FC<PopupProps> = ({ message, isVisible, textColor }) => {
  console.log("SSS");

  return (
    <div
      className={`fixed top-10 right-10 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-500 ease-out ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
      }`}
    >
      <div className="bg-slate-200 p-6 rounded shadow-md text-center">
        <span className={`block text-lg font-bold mb-4 ${textColor}`}>
          {message}
        </span>
      </div>
    </div>
  );
};

export default Popup;
