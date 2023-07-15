"use client";

import { useEffect, useState } from "react";
import {
  Card,
  Grid,
  Text,
  Button,
  Row,
  Col,
  Dropdown,
  Input,
  FormElement,
  Avatar,
  Spacer,
} from "@nextui-org/react";
import type { NextPage } from "next";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { getChains, getPrices, getSite, getTokens } from "@/api/api";
import { StatsDisplay } from "@/components/StatsDisplay";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Connected } from "@/components/Connected";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount, useNetwork } from "wagmi";

interface Token {
  address?: string;
  chainId?: number;
  coingeckoId?: string;
  logoURI?: string;
  name?: string;
  symbol?: string;
}

interface Chain {
  networkName?: string;
  chainId?: number;
  rpc?: string;
  chainName?: string;
  chainIconURI?: string;
}

const vGLMR: Token = {
  logoURI: "/img/vGLMR.png",
  name: "vGLMR",
  symbol: "vGLMR",
};

const Swap: NextPage = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [inputToken, setInputToken] = useState<Token>();
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [site, setSite] = useState<any>(null);
  const [prices, setPrices] = useState<any>(null);
  const [chains, setChains] = useState<Chain[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain>();

  // wagmi
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const filteredTokens = tokens.filter(
    (token) => token.chainId == selectedChain?.chainId
  );

  function getTokenByAddress(address: string) {
    return filteredTokens.find((token) => token.address === address);
  }

  const handleSwap = () => {
    // empty
  };

  const handleInputChange = (e: React.ChangeEvent<FormElement>) => {
    setInputAmount(e.target.value);
    // Placeholder calculation
    setOutputAmount(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const site = await getSite();
        const prices = await getPrices();
        const tokenData = await getTokens();
        const chainsData = await getChains();

        const chains = chainsData["chains"];
        const tokens = tokenData["tokens"];

        setChains(chains);
        setTokens(tokens);
        setInputToken(tokens[0]);
        setSelectedChain(chains[0]);
        setSite(site);
        setPrices(prices);
      } catch {
        alert("Error occurred while fetching data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedChain && tokens) {
      setInputToken(filteredTokens[0]);
    }
  }, [filteredTokens, selectedChain, tokens]);

  useEffect(() => {
    if (!chain) return;
    const getChainById = (id: number) =>
      chains.find((chain) => chain.chainId == id);
    setSelectedChain(getChainById(chain.id));
  }, [chain, chains]);

  return (
    <>
      {tokens && inputToken && selectedChain && (
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={8} md={6}>
            <Card>
              <Card.Header>
                <Row justify="center" align="center">
                  <Text h3>Swap</Text>
                  <Spacer x={2} style={{ flexGrow: 0.7 }} />
                  <ConnectButton />
                </Row>
              </Card.Header>
              <Card.Divider />
              <Card.Body>
                <Row justify="center">
                  <Col span={8}>
                    <Dropdown>
                      <Dropdown.Button css={{ minWidth: "200px" }}>
                        <Avatar
                          bordered
                          size="sm"
                          as="button"
                          src={inputToken.logoURI}
                        />
                        <Spacer x={1} />
                        {inputToken.symbol}
                      </Dropdown.Button>
                      <Dropdown.Menu
                        aria-label="Dynamic Actions"
                        onAction={(key) => {
                          setInputToken(
                            getTokenByAddress(key as string) as Token
                          );
                        }}
                      >
                        {filteredTokens.map((token: Token) => (
                          <Dropdown.Item key={token.address}>
                            <Row css={{ alignItems: "center" }}>
                              <Avatar
                                bordered
                                size="sm"
                                as="button"
                                src={token.logoURI}
                              />
                              <Spacer x={1} />
                              {token.name}
                            </Row>
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                  <Col span={4}>
                    <Input
                      type="number"
                      value={inputAmount}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
                <Row justify="center">
                  <ArrowCircleDownIcon fontSize="large" />
                </Row>
                <Row justify="center">
                  <Col span={8}>
                    <div style={{ width: "100%" }}>
                      <Button css={{ minWidth: "200px" }}>
                        <Avatar
                          bordered
                          size="sm"
                          as="button"
                          src={vGLMR.logoURI}
                        />
                        <Spacer x={1} />
                        {vGLMR.name}
                      </Button>
                    </div>
                  </Col>
                  <Col span={4}>
                    <Input
                      type="number"
                      value={outputAmount}
                      onChange={handleInputChange}
                    />
                  </Col>
                </Row>
              </Card.Body>
              {isConnected && (
                <Card.Footer>
                  <Row justify="center">
                    <Connected>
                      <Button onClick={handleSwap} size="lg">
                        Swap
                      </Button>
                    </Connected>
                  </Row>
                </Card.Footer>
              )}
            </Card>
          </Grid>
        </Grid.Container>
      )}

      {site && prices && <StatsDisplay site={site} prices={prices} />}
    </>
  );
};

export default Swap;
