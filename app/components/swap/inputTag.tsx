"use client";

import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function InputTag(props: any) {
  const {
    baseAmount,
    setBaseAmount,
    quoteAmount,
    setQuoteAmount,
    tokenName,
    ratio,
  } = props;

  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (tokenName == "OTT") setAmount(quoteAmount);
  }, [quoteAmount]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.value = e.target.value.replace(/[^0-9.]/g, '');
    const value: any = e.target.value;
    setAmount(value);
    console.log("=====", value, amount);
    setBaseAmount(value);
  };

  return (
    <div className="flex justify-between rounded-xl bg-input-bg h-[48px] border border-green-border items-center px-5">
      <input
        onChange={handleAmountChange}
        value={amount ? amount : ""}
        disabled={tokenName == "OTT" ? true : false}
        type="number"
        className="numberInput bg-transparent disabled:cursor-not-allowed w-[75%] text-left outline-none sm:text-[18px] text-[18px] font-mono sm:h-[48px] h-[40px] text-black transition-colors"
        placeholder="0"
      />
      <div className="flex gap-3 place-items-center">
        <div className="flex justify-center place-items-center relative w-5 h-5 ">
          <Image
            className="rounded-full"
            src={`/img/token_icons/${tokenName}.png`}
            fill
            alt=""
          />
        </div>
        {tokenName}
      </div>
    </div>
  );
}
