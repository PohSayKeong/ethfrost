"use client";
import type { NextPage } from "next";
import CardComponent from "@/components/CardComponent";
import { Text } from "@nextui-org/react";
const Landing: NextPage = () => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          margin: "auto",
          paddingTop: "18rem",
          paddingBottom: "11rem",
          width: "100%",
        }}
      >
        <Text
          h3
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            fontSize: "3rem",
            fontWeight: "600",
            marginBottom: "9rem",
          }}
        >
          The New Liquid Staking Standard
        </Text>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0,1fr))",
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            gap: "2.5rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardComponent
            title="Governance"
            body="Bifrost uses a sophisticated governance mechanisms that allows the derivative to retain its governance capabilities through cross chain interoperability."
            icon="/img/vGLMR.png"
          />
          <CardComponent
            title="Cross-chain"
            body="Compatible with both homogeneous and heterogeneous chain scenarios by preserving native chain staking revenues."
            icon="/img/vGLMR.png"
          />
          <CardComponent
            title="Decentralization"
            body="Derivatives logic run by the Bifrost parachain Runtime Pallet which evolves with Governance democracy referendums."
            icon="/img/vGLMR.png"
          />
          <CardComponent
            title="Multi-scenario"
            body="No liquidations, with a 1-1 peg yield-bearing feature, and valuable utility across multi DeFi protocols for trading, borrowing, leveraging and far more."
            icon="/img/vGLMR.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
