import { NextResponse } from "next/server";
import { ethers } from "ethers";

import { FAUCET } from "@/utils/constants";

const privateKey = process.env.PRIVATE_KEY;
const rpcUrl = process.env.RPC_URL;

if (!privateKey || !rpcUrl) {
  throw new Error(
    "Environment variables PRIVATE_KEY and RPC_URL are required."
  );
}

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

export async function GET() {
  try {
    const balance = await provider.getBalance(wallet.address);

    const formattedBalance = ethers.formatEther(balance);

    return NextResponse.json({ data: { balance: formattedBalance } });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Something went wrong while fetching the wallet balance." },
      { status: 400 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { toAddress } = await req.json();

    if (!toAddress || !ethers.isAddress(toAddress)) {
      throw Error("Wrong address");
    }

    const tx = {
      to: toAddress,
      value: ethers.parseEther(String(FAUCET.LIMIT_ETH)),
    };

    const transactionResponse = await wallet.sendTransaction(tx);

    return NextResponse.json(
      {
        message: "Sending tokens transaction was created",
        data: { txHash: transactionResponse.hash },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { error: "Something went wrong while fetching the wallet balance." },
      { status: 400 }
    );
  }
}
