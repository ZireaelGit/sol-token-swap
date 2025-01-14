import { readContract, writeContract } from "@wagmi/core";
import { Address } from "viem";
import { CONTRACT_ABI, USDT_ABI, RYAN_ABI } from "../utils";
import { CONTRACT_ADDRESS, USDT, RYAN } from "../config";
import { getBalance } from "wagmi/actions";
import { parseEther } from "viem";
import { formatEther } from "viem";
import { waitForTransactionReceipt } from "wagmi/actions";
import { toast } from "react-toastify";
import { Config, useChainId } from "wagmi";
import { arbitrum, sepolia } from "wagmi/chains";

export const getRatio = async (config: Config, chainId: number) => {
  try {
    const abi = CONTRACT_ABI;
    const res: any = await readContract(config, {
      abi,
      address: CONTRACT_ADDRESS as Address,
      functionName: "ratio",
      chainId: arbitrum.id,
      args: [],
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUSDTBalance = async (config: Config, address: Address) => {
  try {
    const abi = USDT_ABI;
    const usdtAddr = USDT.address;
    const res: any = await readContract(config, {
      abi,
      address: usdtAddr as Address,
      functionName: "balanceOf",
      chainId: arbitrum.id,
      args: [address as Address],
    });
    console.log(res);
    return Number(res);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const convertBignitTofloat = (value: any, decimal: number) => {
  return parseFloat((Number(value) / Math.pow(10, decimal)).toFixed(3));
};

export const convertBignitToString = (num: BigInt) => {
  const eth: any = Number(num) / 10 ** 18;
  const head = eth.toString().split(".")[0];
  if (head.length > 9) return head.slice(0, head.length - 9) + "B";
  if (head.length > 6) return head.slice(0, head.length - 6) + "M";
  if (head.length > 3) return head.slice(0, head.length - 3) + "K";
  return eth.toFixed(3);
};
