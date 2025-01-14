import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function BarcketAnimation() {
  return (
    <div className="flex relative">
      <Image
        className="animate-slow-bounce md:mt-[80px] mt-0 opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
        src={`/img/moneyBacket.png`}
        width={620}
        height={620}
        alt=""
      />
      <div className="absolute w-[11%] h-[13%] bottom-[40%] right-[15%]">
        <Image
          className="animate-slow-bounce-1 md:mt-[80px] mt-0 opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
          src={`/img/moneyCoin.png`}
          fill
          alt=""
        />
      </div>
      <div className="absolute w-[11%] h-[13%] bottom-[27%] right-[35%]">
        <Image
          className="animate-slow-bounce md:mt-[80px] mt-0 opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
          src={`/img/moneyYelloCoin.png`}
          fill
          alt=""
        />
      </div>
      <div className="absolute w-[4%] h-[5%] bottom-[80%] right-[25%]">
        <Image
          className="animate-slow-spin animate-slow-bounce md:mt-[80px] mt-0 opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
          src={`/img/moneyStar.png`}
          fill
          alt=""
        />
      </div>
      <div className="absolute w-[4%] h-[5%] bottom-[25%] right-[20%]">
        <Image
          className="animate-slow-spin md:mt-[80px] mt-0 opacity-100 hover:opacity-70 transition-opacity duration-300 cursor-pointer"
          src={`/img/moneyYelloStar.png`}
          fill
          alt=""
        />
      </div>
    </div>
  );
}
