

import { sepolia, cronos } from "viem/chains"
// import TOKEN_LIST_JSON from "@/app/abis/Tokens.json"
// export const TOKEN_LIST = TOKEN_LIST_JSON;

//For test 0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9

export interface IToken {
  name: string;
  isNative: boolean;
  address: string;
  decimal: number;
}

export const USDT = { name: "USDT", isNative: false, address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9", decimal: 18 }
export const RYAN = { name: "RYAN", isNative: false, address: "drvx4iBR9eTNEPVYyR781c3EBL39yNgQoMFrA65rya3", decimal: 18 }

// export const CONTRACT_ADDRESS = "0x3A0e08589118c27596A095c4BFeD9700B6904227";
export const CONTRACT_ADDRESS = "0x8b2250eb4913dc6f09e4b4357b11c0be6377a75e";
