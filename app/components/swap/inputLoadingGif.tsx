import Image from "next/image";

export default function InputLoadingGif(props: any) {
  const { isLoading } = props;
  return (
    <div
      className={`bg-black-1/90 fixed w-[80px] h-[45px] z-50 ${
        isLoading ? "block" : "hidden"
      }`}
    >

      <div className="flex justify-center w-[25px] h-[25px] items-center mt-5">
        <div className="relative aspect-square w-[80px] h-[30px]">
          <Image src="/img/swaping.gif" fill alt="" />
        </div>
      </div>
    </div>
  );
}
