import { GetRoute, Squid } from "@0xsquid/sdk";
import { JsonRpcSigner } from "@ethersproject/providers";
import { ethers } from "ethers";
import { erc20ABI } from "wagmi";

const getSDK = (): Squid => {
    const squid = new Squid({
        baseUrl: "https://testnet.api.0xsquid.com",
        integratorId: "ethfrost-sdk",
    });
    return squid;
};

export const squid = async (signer: JsonRpcSigner) => {
    // instantiate the SDK
    const squid = getSDK();
    // init the SDK
    await squid.init();
    console.log("Squid inited");

    // log Squid supported tokens and chains
    console.log("squid.tokens: \n", squid.tokens);
    console.log("squid.chains: \n", squid.chains);

    // set the token and chain you are looking for
    // chainNames are here: https://docs.axelar.dev/dev/build/chain-names
    const searchTokenSymbol = "WETH";
    const searchChainName = "Ethereum-2";

    const searchChainData = squid.chains.find(
        (t) =>
            t.chainId ===
            squid.chains.find((c) => c.chainName === searchChainName)?.chainId
    );

    const searchToken = squid.tokens.find(
        (t) =>
            t.symbol === searchTokenSymbol &&
            t.chainId ===
                squid.chains.find((c) => c.chainName === searchChainName)
                    ?.chainId
    );

    console.log(
        "chainId for " + searchChainName + ": " + searchChainData?.chainId
    ); // output is 43113
    console.log(
        "tokenAddress for " +
            searchTokenSymbol +
            " on " +
            searchChainData?.networkName +
            ": " +
            searchToken?.address
    );

    const toAddress = await signer.getAddress();
    const wmovr = "0x372d0695E75563D9180F8CE31c9924D7e8aaac47";
    const erc20ContractInterface = new ethers.utils.Interface(erc20ABI);
    const approveEncodeData = erc20ContractInterface.encodeFunctionData(
        "approve",
        ["0xF75F62464fb6ae6E7088b76457E164EeCfB07dB4", "0"]
    );

    const params: GetRoute = {
        fromChain: 5, // Goerli testnet
        fromToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // WETH on Goerli
        fromAmount: "20000000000000000", // 0.02 WETH
        toChain: 1287, // Moonbase
        toToken: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE", // DEV on Moonbase
        toAddress, // the recipient of the trade
        slippage: 99,
        quoteOnly: false, // optional, defaults to false
        enableExpress: true,
        customContractCalls: [
            // replace this with calling XCM action contract
            // {
            //     callType: 1,
            //     target: wmovr, //WMVOR
            //     value: "0",
            //     callData: approveEncodeData,
            //     payload: {
            //         tokenAddress: wmovr,
            //         inputPos: 1,
            //     },
            //     estimatedGas: "400000",
            // },
        ],
    };

    console.log("params: \n", params);

    const { route } = await squid.getRoute(params);
    console.log("route: \n", route);
    // console.log("route: \n", JSON.stringify(route, null, 2))

    const tx = (await squid.executeRoute({
        signer,
        route,
    })) as ethers.providers.TransactionResponse;
    console.log("tx: ", tx);

    const txReceipt = await tx.wait();
    console.log("txReciept: ", txReceipt);

    const getStatusParams = {
        transactionId: txReceipt.transactionHash,
        routeType: route.transactionRequest?.routeType,
    };

    const status = await squid.getStatus(getStatusParams);
    console.log(status);
};
