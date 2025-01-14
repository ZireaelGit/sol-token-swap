import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export default function TopBar() {

  const openSite = () => {
    window.open("https://ott-investments.com/",  "_blank");
  };

  return (
    <div className="w-full flex min-[880px]:flex-row flex-col place-items-center justify-between md:py-0 py-10 min-[880px]:h-[140px] h-auto bg-gradient-to-t from-transparent from-transparent p-[20px]">
      <div className="">
        {/* <Image
        onClick={openSite}
          className="rounded-full  mt-0 opacity-100 transition-opacity duration-300 cursor-pointer"
          src={`/img/logo.png`}
          width={340}
          height={91}
          alt=""
        /> */}
      </div>
      <div className="flex text-[20px] gap-6 min-[1244px]:flex-row flex-col md:justify-items-end md:mr-12 mr-0 hover:cursor-pointer">
        {/* <ConnectButton /> */}
      </div>
    </div>
  );
}
