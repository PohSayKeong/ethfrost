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
  Spacer,
  FormElement,
} from "@nextui-org/react";
import type { NextPage } from "next";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { getPrices, getSite } from "@/api/api";
import { CardHeader, Box, Typography, Icon, CardContent } from "@mui/material";
import APYCard from "@/utils/statsCard";
import { setMaxListeners } from "events";
interface Token {
  value: string;
  label: string;
}

// Placeholder tokens
const tokens: Token[] = [
  { value: "ETH", label: "Ethereum" },
  { value: "BTC", label: "Bitcoin" },
  // Add more tokens as per your requirement
];

const Swap: NextPage = () => {
  const [inputToken, setInputToken] = useState(tokens[0]);
  const [outputToken, setOutputToken] = useState(tokens[1]);
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [site,setSite] = useState<any>(null)
  const [prices, setPrices] = useState<any>(null)

  function getTokenByValue(value: string) {
    return tokens.find((token) => token.value === value);
  }

  const handleSwap = () => {
    // Here we can call the function to handle the swap
    console.log(
      `Swapping ${inputAmount} ${inputToken.label} to ${outputToken.label}`
    );
  };

  const handleInputChange = (e: React.ChangeEvent<FormElement>) => {
    setInputAmount(e.target.value);
    // Placeholder calculation
    setOutputAmount(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const site = await getSite()
        const prices = await getPrices()
        
        setSite(site)
        setPrices(prices)
    }
    catch{
      alert('Error occurred while fetching data')
    }}
    
    fetchData()
  }, [])

  return (
    <div>
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={8} md={6}>
        <Card>
          <Card.Header>
            <Row justify="center">
              <Text h3>Swap</Text>
            </Row>
          </Card.Header>
          <Card.Divider />
          <Card.Body>
            <Row justify="center">
              <Col span={8}>
                <Dropdown>
                  <Dropdown.Button>{inputToken.label}</Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Dynamic Actions"
                    onAction={(key) =>
                      setInputToken(getTokenByValue(key as string) as Token)
                    }
                  >
                    {tokens.map((token: Token) => (
                      <Dropdown.Item key={token.value}>
                        {token.label}
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
                <Dropdown>
                  <Dropdown.Button>{outputToken.label}</Dropdown.Button>
                  <Dropdown.Menu
                    aria-label="Dynamic Actions"
                    onAction={(key) =>
                      setOutputToken(getTokenByValue(key as string) as Token)
                    }
                  >
                    {tokens.map((token: Token) => (
                      <Dropdown.Item key={token.value}>
                        {token.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
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
    {site && prices &&
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} sm={8} md={6}>
        <Card>
          <Card.Header>
            <Row justify="center">
              <Text h3>vGLMR Data</Text>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row justify="center">
              <Col span={6}>
                <Text h5>APY: {site.vGLMR.apy}%</Text>
              </Col>
              <Col span={6}>
                <Text h5>1 vGLMR: {prices.prices.vglmr / prices.prices.glmr} GLMR</Text>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={6}>
                <Text h5>Total Staked: {site.vGLMR.tvm} GMLR</Text>
              </Col>
              <Col span={6}>
                <Text h5>Total Liquidity: ${site.vGLMR.tvl * prices.prices.glmr}</Text>
              </Col>
            </Row>
            <Row justify="center">
              <Col span={6}>
                <Text h5>vGLMR TVS: ${site.vGLMR.tvm * prices.prices.glmr}</Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>}
  </div>
  );
};

export default Swap;
