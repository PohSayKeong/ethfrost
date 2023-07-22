import { Card, Grid, Image, Text } from "@nextui-org/react";
import { makeStyles } from "@material-ui/core/styles";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { CardContent, Typography } from "@mui/material";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import MultilineChartIcon from "@material-ui/icons/MultilineChart";

const useStyles = makeStyles({
  root: {
    padding: "2rem",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
  },
  number: {
    fontSize: "1.5em",
  },
  unit: {
    fontSize: "0.8em",
    fontStyle: "italic",
  },
  title: {
    fontSize: "1.1em",
    color: "grey",
  },
});

interface StatsDisplayProps {
  site: any;
  prices: any;
}

export const StatsDisplay = ({ site, prices }: StatsDisplayProps) => {
  const classes = useStyles();

  return (
    <Grid.Container
      gap={2}
      justify="center"
      style={{ width: "100%", margin: "auto" }}
    >
      <Grid sm={12} md={8}>
        <Card className={classes.root}>
          <CardContent>
            <Text h3 b>
              vGLMR Data
            </Text>
            <Grid.Container gap={3}>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <ShowChartIcon color="primary" fontSize="large" />
                  <div>
                    <Typography>
                      <span className={classes.title}>APY</span>
                      <br />
                      <span className={classes.number}>{site.vGLMR.apy}</span>
                      <span className={classes.unit}>%</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <Image
                    src="img/vGLMR.png"
                    alt="price"
                    width={35}
                    height={35}
                  />
                  <div>
                    <Typography>
                      <span className={classes.title}>Price</span>
                      <br />
                      <span className={classes.number}>1 </span>
                      <span className={classes.unit}>vGLMR</span>
                      <span className={classes.title}> = </span>

                      <span className={classes.number}>
                        {(prices.prices.vglmr / prices.prices.glmr).toFixed(6)}
                      </span>
                      <span className={classes.unit}>GLMR</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <AccountBalanceIcon color="primary" fontSize="large" />
                  <div>
                    <Typography>
                      <span className={classes.title}>Total Staked: </span>
                      <br />
                      <span className={classes.number}>
                        {(site.vGLMR.tvm / 1000000).toPrecision(4)}M{" "}
                      </span>
                      <span className={classes.unit}>GMLR</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <Image
                    src="img/liquidity.jpg"
                    alt="liquidity"
                    width={35}
                    height={35}
                  />
                  <div>
                    <Typography>
                      <span className={classes.title}>Total Liquidity: </span>
                      <br />
                      <span className={classes.number}>
                        $
                        {(
                          (site.vGLMR.tvl * prices.prices.glmr) /
                          1000000
                        ).toFixed(6)}
                        M
                      </span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <MultilineChartIcon color="primary" fontSize="large" />
                  <div>
                    <Typography>
                      <span className={classes.title}>vGLMR TVS: </span>
                      <br />
                      <span className={classes.number}>
                        $
                        {(
                          (site.vGLMR.tvm * prices.prices.glmr) /
                          1000000
                        ).toFixed(6)}
                        M
                      </span>
                    </Typography>
                  </div>
                </div>
              </Grid>
            </Grid.Container>
          </CardContent>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
