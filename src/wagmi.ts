import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { avalancheFuji, bscTestnet, goerli, polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const walletConnectProjectId = "3fd6555082bbcab387f101059b6a785f";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, avalancheFuji, bscTestnet, polygonMumbai],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "ethfrost",
  chains,
  projectId: walletConnectProjectId,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
