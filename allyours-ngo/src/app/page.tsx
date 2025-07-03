import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import Section6 from "@/components/Section6";
import Section7 from "@/components/Section7";
import Hero from "../components/Hero";
import Section2 from "../components/Section2";
import "./globals.css";

export default function Home() {
  return (
    <div className="min-h-screen mt-0 ">
      
      <Hero/>
      <Section2/>
      <Section3/>
      <Section4/>
      <Section5/>
      <Section6/>
      <Section7/>
    </div>
  );
} 