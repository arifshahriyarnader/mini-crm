import React from "react";
import { useNavigate } from "react-router";

interface SummaryCardProps {
  title: string;
  value: string;
  buttonText: string;
  route:string
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  buttonText,
  route
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };
  return (
    <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {value}
      </p>
      <button onClick={handleClick} className="text-sm text-[#5048E5] font-medium hover:underline cursor-pointer">
        {buttonText}
      </button>
    </div>
  );
};
