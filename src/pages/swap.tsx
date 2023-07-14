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
import { Grid as MuiGrid } from "@mui/material";
import type { NextPage } from "next";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { getChains, getPrices, getSite, getTokens } from "@/api/api";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { CardContent, Typography } from "@mui/material";

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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A6EA5",
  },
  pos: {
    marginBottom: 12,
  },
  data: {
    fontWeight: "bold",
  },
});

const Swap: NextPage = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [inputToken, setInputToken] = useState<Token>();
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [site, setSite] = useState<any>(null);
  const [prices, setPrices] = useState<any>(null);
  const [chains, setChains] = useState<Chain[]>([]);
  const [selectedChain, setSelectedChain] = useState<Chain>();
  const filteredTokens = tokens.filter(
    (token) => token.chainId == selectedChain?.chainId
  );
  function getTokenByAddress(address: string) {
    return filteredTokens.find((token) => token.address === address);
  }

  function getChainById(id: number) {
    return chains.find((chain) => chain.chainId == id);
  }

  const handleSwap = () => {
    // empty
  };

  const handleInputChange = (e: React.ChangeEvent<FormElement>) => {
    setInputAmount(e.target.value);
    // Placeholder calculation
    setOutputAmount(e.target.value);
  };

  const classes = useStyles();

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
  }, [selectedChain]);
  return (
    <div>
      {tokens && inputToken && selectedChain && (
        <Grid.Container gap={2} justify="center">
          <Grid xs={12} sm={8} md={6}>
            <Card>
              <Card.Header>
                <Row justify="center" align="center">
                  <Text h3>Swap</Text>
                  <Spacer x={2} style={{ flexGrow: 0.7 }} />
                  <Dropdown>
                    <Dropdown.Button css={{ minWidth: "200px" }}>
                      <Avatar
                        bordered
                        size="sm"
                        as="button"
                        src={selectedChain?.chainIconURI}
                      />
                      <Spacer x={1} />
                      {selectedChain?.chainName}
                    </Dropdown.Button>
                    <Dropdown.Menu
                      aria-label="Dynamic Actions"
                      onAction={(key) => {
                        setSelectedChain(getChainById(key as number) as Chain);
                      }}
                    >
                      {chains.map((chain: Chain) => (
                        <Dropdown.Item key={chain.chainId}>
                          <Row css={{ alignItems: "center" }}>
                            <Avatar
                              bordered
                              size="sm"
                              as="button"
                              src={chain.chainIconURI}
                            />
                            <Spacer x={1} />
                            {chain.chainName}
                          </Row>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
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
              <Card.Footer>
                <Row justify="center">
                  <Button onClick={handleSwap} size="lg">
                    Swap
                  </Button>
                </Row>
              </Card.Footer>
            </Card>
          </Grid>
        </Grid.Container>
      )}

      {site && prices && (
        <Grid.Container gap={2} justify="center">
          <MuiGrid item xs={12} sm={8} md={6}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} gutterBottom>
                  vGLMR Data
                </Typography>

                <MuiGrid container spacing={2}>
                  <MuiGrid item xs={6}>
                    <MonetizationOnIcon color="primary" />
                    <Typography className={classes.data}>
                      APY: {site.vGLMR.apy}%
                    </Typography>
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <TrendingUpIcon color="primary" />
                    <Typography className={classes.data}>
                      1 vGLMR: {prices.prices.vglmr / prices.prices.glmr} GLMR
                    </Typography>
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <AccountBalanceIcon color="primary" />
                    <Typography className={classes.data}>
                      Total Staked: {(site.vGLMR.tvm / 1000000).toFixed(6)}M
                      GMLR
                    </Typography>
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <MonetizationOnIcon color="primary" />
                    <Typography className={classes.data}>
                      Total Liquidity: ${" "}
                      {(
                        (site.vGLMR.tvl * prices.prices.glmr) /
                        1000000
                      ).toFixed(6)}
                      M
                    </Typography>
                  </MuiGrid>
                  <MuiGrid item xs={6}>
                    <MonetizationOnIcon color="primary" />
                    <Typography className={classes.data}>
                      vGLMR TVS: ${" "}
                      {(
                        (site.vGLMR.tvm * prices.prices.glmr) /
                        1000000
                      ).toFixed(6)}
                      M
                    </Typography>
                  </MuiGrid>
                </MuiGrid>
              </CardContent>
            </Card>
          </MuiGrid>
        </Grid.Container>
      )}
    </div>
  );
};

export default Swap;
