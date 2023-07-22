"use client";

import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import { WagmiConfig } from "wagmi";
import { NextUIProvider } from "@nextui-org/react";

import { config, rainbowChains } from "../wagmi";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={rainbowChains}>
        <NextUIProvider>{mounted && children}</NextUIProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
