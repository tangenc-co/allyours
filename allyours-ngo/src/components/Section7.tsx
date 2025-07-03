"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import plus from '../../public/assets/Icons.SVG/Outline Icons/add_copy.svg';

export default function Section7() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questions = [
    {
      question: "How are you ensuring inclusivity and not just engaging in inclusivity washing?",
      answer: "To create an inclusive environment that is not limited to project leaders from ethnic minorities, with disabilities, and internally displaced people because of civil war, we are committed to accepting diversity and practicing inclusive habits in our communications with stakeholders, applicants, and customers, as well as within our internal teams."
    },
    {
      question: "How do you make use of the funds?",
      answer: "We maintain and facilitate our physical workspace with the necessary equipment to ensure the creative process, run the site visits smoothly and offer coaching sessions for the project leaders. In the future, we plan to have a self-sustainable financial model, which will be sufficient to carry out its own services."
    },
    {
      question: "What is allyours’s special essence?",
      answer: "The difference is in Our Purpose, while traditional co-working spaces may focus on everyone, we specifically target small leaders and soloists who wish to pursue their own individual projects in art, design and education. allyours’s lab is not just a working space but a creative community where you can establish networks, be inspired by site visits, and have an active audience for your projects; all that will foster your professional growth."
    },
    {
      question: "What is your approach to sustainability?",
      answer: "As one of our vision aims for building a net-zero future, we will be dedicated to carrying out our missions with human, social, economic and environmental sustainability practices with a deep focus on creating eco-friendly spaces and procedures, regular assessments and advancing through feedback. "
    },
  ];

  return (
    <div className="min-h-screen text-center pt-[120px]">
      <p className="text-[16px] font-[600] mb-[20px]">FAQs</p>
      <h2 className="morangamd text-[48px]/[64px] mb-[85px]">Frequently Ask Questions</h2>

      <div className='flex flex-col items-center'>
        <div className="shadow-[0px_100px_100px_0px_#0000000F] accordion-group max-w-[873px] rounded-[24px] bg-[#f9f9f9] py-[64px] px-[88px] flex flex-col items-center ">
          <div className='max-w-[697px] flex flex-col gap-[75px]'>
            {questions.map((item, idx) => (
              <div key={idx} className="text-left w-[100%] ">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="relative bg-[#f9f9f9] border-none  cursor-pointer"
                >
                  <div className='relative w-[625px]'>
                    <h3 className="morangarg text-[24px] text-[#005CFF] max-w-[585px] text-start">
                      {item.question}
                    </h3>
                    <div className="absolute top-[0] right-[0]">
                      {activeIndex === idx ? (
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" stroke="#005CFF" strokeWidth="2" />
                        </svg>
                      ) : (
                        <Image
                          src={plus}
                          alt="expand"
                          width={24}
                          height={24}
                        />
                      )}
                    </div>
                  </div>
                </button>
                {activeIndex === idx && (
                  <p className="mt-[10px] sfprorg textgray text-[20px]/[26px] max-w-[580px]">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
