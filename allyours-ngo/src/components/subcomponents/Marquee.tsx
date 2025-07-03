
import React, { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Marquee: FC = () => {
  const items: string[] = ["/assets/Images/peekaboo Image 1.jpg",
  "/assets/Images/peekaboo Image 2.jpg",
  "/assets/Images/peekaboo Image 3.jpg",
  "/assets/Images/peekaboo Image 4.jpg",
  "/assets/Images/peekaboo Image 5.jpg",

  "/assets/Images/peekaboo Image 1.jpg",
  "/assets/Images/peekaboo Image 2.jpg",
  "/assets/Images/peekaboo Image 3.jpg",
  "/assets/Images/peekaboo Image 4.jpg",
  "/assets/Images/peekaboo Image 5.jpg",];

  return (
    <div className="w-full mx-auto text-white overflow-x-hidden mt-[-100px]">
      <div className="flex myGradient items-center">
        <motion.div
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {items.map((item, index) => (
            <Image
            key={index} 
            src={item} 
            alt="Peekaboo illustration"
            width={140} 
            height={50}
            className="mr-[30px]"  
          />
            
          ))}
        </motion.div>

        <motion.div
          initial={{ x: "0" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="flex flex-shrink-0"
        >
          {items.map((item, index) => (
            <Image
            key={index} 
            src={item} 
            alt="Peekaboo illustration"
            width={140} 
            height={50}
            className="mr-[30px]"  
          />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
