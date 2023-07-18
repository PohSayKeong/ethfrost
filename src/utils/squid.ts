import { GetRoute, Squid, RouteData } from "@0xsquid/sdk";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
import xcmContract from "../contracts/MoonbeamSlpx.json";

const getSDK = (): Squid => {
  const squid = new Squid({
    baseUrl: "https://testnet.api.0xsquid.com",
    integratorId: "ethfrost-sdk",
  });
  return squid;
};

export const multiplier = 1000000000000000000; //18 zeros

export const createSquid = async () => {
  const squidInstance = getSDK();
  await squidInstance.init();
  return squidInstance;
};

export const findRoute = async (
  signer: JsonRpcSigner,
  squidInstance: Squid,
  tokenAddress: string,
  chainId: string,
  amount: number
) => {
  const toAddress = await signer.getAddress();
  const moonbeamXcmAction = new ethers.utils.Interface(xcmContract.abi);
  const mintVNativeAsset =
    moonbeamXcmAction.encodeFunctionData("mintVNativeAsset");

  const fromAmount = amount * multiplier;
  const params: GetRoute = {
    fromChain: chainId, // Goerli testnet
    fromToken: tokenAddress,
    fromAmount: fromAmount.toString(),
    toChain: 1287, // Moonbase
    toToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // DEV on Moonbase
    toAddress, // the recipient of the trade
    slippage: 99,
    quoteOnly: false, // optional, defaults to false
    enableExpress: true,
    customContractCalls: [
      {
        callType: 2,
        target: xcmContract.address, // WMVOR
        callData: mintVNativeAsset,
        estimatedGas: "400000",
        payload: {
          tokenAddress: xcmContract.address,
          inputPos: -1,
        },
      },
    ],
  };

  const { route } = await squidInstance.getRoute(params);

  return { route, squidInstance };
};

export const executeSwap = async (
  signer: JsonRpcSigner,
  squidInstance: Squid,
  route: RouteData
) => {
  const tx = (await squidInstance.executeRoute({
    signer,
    route,
  })) as ethers.providers.TransactionResponse;
  console.log("tx: ", tx);

  const txReceipt = await tx.wait();
  console.log("txReceipt: ", txReceipt);

  const getStatusParams = {
    transactionId: txReceipt.transactionHash,
    routeType: route.transactionRequest?.routeType,
  };

  const status = await squidInstance.getStatus(getStatusParams);
  console.log(status);
  return status;
};
