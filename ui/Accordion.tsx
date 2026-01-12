"use client"
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";


interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {

  const [isOpen, setIsOpen] = useState(false);

  const contentClasses = isOpen
    ? 'max-h-screen opacity-100'
    : 'max-h-0 opacity-0';


  const iconClasses = isOpen
    ? 'transform rotate-45'
    : 'transform rotate-0';

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg mb-4 overflow-hidden">
      <button
        className="accordion-header w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 lg:p-4 p-2 cursor-pointer select-none flex flex-row justify-between items-center transition duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg text-right font-semibold text-(--main-bg)">{title}</h3>

        <span className={`text-xl font-bold transition-transform duration-300 ${iconClasses}`}>
          <FaPlus
            size={25}
            className='text-(--main-color) dark:text-[#4ade80]'
          />
        </span>
      </button>
      <div
        className={`accordion-content ${contentClasses} transition-all duration-500 ease-in-out`}
      >
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 text-right dark:text-gray-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;