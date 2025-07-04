import Image from "next/image";
import Mouse from "../../public/assets/Icons.SVG/Fill Icons/Mouse.svg";
export default function SupportUsHero() {
    return (
      <div className="min-h-screen max-w-[1213px] mx-auto  mt-[150px]  ">
        <div
          className="absolute rounded-[200px]  bg-[#005CFF]"
          style={{
            width: "484.76px",
            height: "485.03px",
            top: "83.35px",
            left: "-378.39px",
            transform: "rotate(-44.46deg)",
            opacity: 1,
          }}
        ></div>

        <div className="text-center max-w-[1104px] mx-auto mb-[100px]">
          <p className="text-[68px]/[80px] mb-[-10px] bg-[#fff] morangamd mb-[30px]">
            Together, we can improve <br /> and build our design community
          </p>
          <p className="text-[20px]/[30px] textgray sfprorg mb-[30px] max-w-[1000px] mx-auto">
            We’re here to fight brain drain and creative burnout by uplifting
            design talent through growth, <br /> community, purpose, and
            opportunity. Your support helps shape a stronger future for the
            industry. 
          </p>
          <div className="flex justify-around max-w-[400px] mx-auto">
            <button className="py-[14px] px-[24px]rounded rounded-[24px] border-none w-[183px] h-[47px] cursor-pointer text-[#fff] bg-[#005cff] text-[16px]/auto">
              Donate Now
            </button>
            <button className="rounded-[24px] border-[0.4px] border-solid w-[183px] h-[47px] cursor-pointer text-[#000] bg-[#fff] text-[16px]">
              Talk to Us
            </button>
          </div>
        </div>
        <div
          className="absolute rounded-[200px]  bg-[#005CFF]"
          style={{
            width: "484.76px",
            height: "485.03px",
            top: "83.35px",
            right: "-378.39px",
            transform: "rotate(-44.46deg)",
            opacity: 1,
          }}
        ></div>
        <div className="flex justify-center text-[#005CFF]">
          <Image
            src={Mouse}
            alt="Mouse"
            width={20}
            height={30}
            className="color-[#005CFF]"
          />
      
        </div>
      </div>
    );
}