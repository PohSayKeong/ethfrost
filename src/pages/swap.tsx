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
import { Grid as MuiGrid } from "@mui/material";
import type { NextPage } from "next";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { getPrices, getSite } from "@/api/api";
import { makeStyles } from '@material-ui/core/styles';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { CardContent, Typography } from "@mui/material";
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

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3A6EA5',
  },
  pos: {
    marginBottom: 12,
  },
  data: {
    fontWeight: 'bold',
  },
});


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

  const classes = useStyles();

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
                APY: {(site.vGLMR.apy)}%
              </Typography>
            </MuiGrid>
            <MuiGrid item xs={6}>
              <TrendingUpIcon color="primary" />
              <Typography className={classes.data}>
                1 vGLMR: {(prices.prices.vglmr / prices.prices.glmr)} GLMR
              </Typography>
            </MuiGrid>
            <MuiGrid item xs={6}>
              <AccountBalanceIcon color="primary" />
              <Typography className={classes.data}>
                Total Staked: {(site.vGLMR.tvm / 1000000).toFixed(6)}M GMLR
              </Typography>
            </MuiGrid>
            <MuiGrid item xs={6}>
              <MonetizationOnIcon color="primary" />
              <Typography className={classes.data}>
                Total Liquidity: $ {(site.vGLMR.tvl * prices.prices.glmr / 1000000).toFixed(6)}M
              </Typography>
            </MuiGrid>
            <MuiGrid item xs={6}>
              <MonetizationOnIcon color="primary" />
              <Typography className={classes.data}>
                vGLMR TVS: $ {(site.vGLMR.tvm * prices.prices.glmr / 1000000).toFixed(6)}M
              </Typography>
            </MuiGrid>
          </MuiGrid>
        </CardContent>
      </Card>
    </MuiGrid>
    </Grid.Container>
}
  </div>
  );
};

export default Swap;
