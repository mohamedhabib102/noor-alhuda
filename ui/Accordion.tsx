"use client"
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";


interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children }) => {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-brand-gold/15 dark:border-main/30 rounded-2xl mb-4 overflow-hidden shadow-sm transition-all duration-300">
      <button
        className="accordion-header w-full bg-brand-gold/5 dark:bg-main/10 hover:bg-brand-gold/10 dark:hover:bg-main/10 lg:p-5 p-4 cursor-pointer select-none flex flex-row justify-between items-center transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg text-right font-bold text-foreground dark:text-gray-100">{title}</h3>

        <span className={`text-xl font-bold transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          <FaPlus
            size={22}
            className='text-main dark:text-brand-gold'
          />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-in-out bg-white dark:bg-main/5 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="p-5 border-t border-brand-gold/10 dark:border-main/10 text-right dark:text-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;