"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useAccount, useBalance, useNetwork } from "wagmi";
import { useEthersSigner } from "../../hooks/useEthersSigner";
import {
  createSquid,
  executeSwap,
  findRoute,
  multiplier,
} from "../../utils/squid";
import { RouteData, Squid } from "@0xsquid/sdk";

interface Token {
  address?: `0x${string}`;
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
  const [inputAmount, setInputAmount] = useState<number>();
  const [outputAmount, setOutputAmount] = useState<number>();
  const [site, setSite] = useState<any>(null);
  const [prices, setPrices] = useState<any>(null);
  const [chains, setChains] = useState<Chain[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain>();
  const [squidInstance, setSquidInstance] = useState<Squid>();
  const [route, setRoute] = useState<RouteData>();

  // wagmi
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { data: inputBalance } = useBalance({
    address,
    token:
      inputToken?.address != "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
        ? inputToken?.address
        : undefined,
  });
  const signer = useEthersSigner();

  useEffect(() => {
    const createSquidInstance = async () => {
      setSquidInstance(await createSquid());
    };
    createSquidInstance();
  }, []);

  useEffect(() => {
    const updateRoute = async () => {
      if (
        signer &&
        squidInstance &&
        inputToken &&
        inputAmount &&
        selectedChain &&
        selectedChain.chainId
      ) {
        const address = inputToken.address;
        const routeInstance = await findRoute(
          signer,
          squidInstance,
          address ? address.toString() : "",
          selectedChain?.chainId.toString(),
          inputAmount
        );
        setRoute(routeInstance.route);
        setSquidInstance(routeInstance.squidInstance);
        const amt =
          parseFloat(routeInstance.route.estimate.toAmount) / multiplier;
        setOutputAmount(amt);
      }
    };

    updateRoute();
  }, [signer, squidInstance, inputToken, inputAmount, selectedChain]);
  const filteredTokens = useMemo(
    () => tokens.filter((token) => token.chainId == selectedChain?.chainId),
    [selectedChain?.chainId, tokens]
  );

  function getTokenByAddress(address: string) {
    return filteredTokens.find((token) => token.address === address);
  }

  const handleSwap = async () => {
    // empty
    if (signer && squidInstance && route) {
      await executeSwap(signer, squidInstance, route);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<FormElement>) => {
    const inputValue = parseFloat(e.target.value);
    setInputAmount(isNaN(inputValue) ? 0 : inputValue);
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
    if (filteredTokens) setInputToken(filteredTokens[0]);
  }, [filteredTokens]);

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
              <Card.Body css={{ padding: 0 }}>
                <Row justify="space-around">
                  <Col span={7}>
                    <Input
                      type="number"
                      value={inputAmount}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <Text>{`Balance: ${inputBalance?.formatted}`}</Text>
                  </Col>
                  <Col span={4}>
                    <Dropdown>
                      <Dropdown.Button css={{ width: "100%" }}>
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
                </Row>
                <Row justify="center">
                  <ArrowCircleDownIcon fontSize="large" />
                </Row>
                <Row justify="space-around">
                  <Col span={7}>
                    <Input
                      type="number"
                      value={outputAmount}
                      onChange={handleInputChange}
                      fullWidth
                    />
                    <Text>Balance: 0</Text>
                  </Col>
                  <Col span={4}>
                    <Button css={{ width: "100%" }}>
                      <Avatar
                        bordered
                        size="sm"
                        as="button"
                        src={vGLMR.logoURI}
                      />
                      <Spacer x={1} />
                      {vGLMR.name}
                      <Spacer x={1} />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
              <Connected>
                <Card.Footer>
                  <Row justify="center">
                    <Connected>
                      <Button onClick={handleSwap} size="lg">
                        Swap
                      </Button>
                    </Connected>
                  </Row>
                </Card.Footer>
              </Connected>
            </Card>
          </Grid>
        </Grid.Container>
      )}

      {site && prices && <StatsDisplay site={site} prices={prices} />}
    </>
  );
};

export default Swap;
