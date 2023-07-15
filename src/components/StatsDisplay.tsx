import { Card, Grid } from "@nextui-org/react";
import { Grid as MuiGrid } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { CardContent, Typography } from "@mui/material";

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

interface StatsDisplayProps {
  site: any;
  prices: any;
}

export const StatsDisplay = ({ site, prices }: StatsDisplayProps) => {
  const classes = useStyles();

  return (
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
                  Total Staked: {(site.vGLMR.tvm / 1000000).toFixed(6)}M GMLR
                </Typography>
              </MuiGrid>
              <MuiGrid item xs={6}>
                <MonetizationOnIcon color="primary" />
                <Typography className={classes.data}>
                  Total Liquidity: ${" "}
                  {((site.vGLMR.tvl * prices.prices.glmr) / 1000000).toFixed(6)}
                  M
                </Typography>
              </MuiGrid>
              <MuiGrid item xs={6}>
                <MonetizationOnIcon color="primary" />
                <Typography className={classes.data}>
                  vGLMR TVS: ${" "}
                  {((site.vGLMR.tvm * prices.prices.glmr) / 1000000).toFixed(6)}
                  McreateConfig
                </Typography>
              </MuiGrid>
            </MuiGrid>
          </CardContent>
        </Card>
      </MuiGrid>
    </Grid.Container>
  );
};
