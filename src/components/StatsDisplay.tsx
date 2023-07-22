import { Card, Grid } from "@nextui-org/react";
import { makeStyles } from "@material-ui/core/styles";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import { CardContent, Typography } from "@mui/material";
import ShowChartIcon from '@material-ui/icons/ShowChart';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MultilineChartIcon from '@material-ui/icons/MultilineChart';

const useStyles = makeStyles({
  root: {
    // minWidth: 275,
    // backgroundColor: "#f5f5f5",
  },
  cardtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3A6EA5",
  },
  pos: {
    marginBottom: 12,
  },
  data: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
  },
  number: {
    fontSize: '1.5em',
  },
  unit: {
    fontSize: '0.8em',
    fontStyle: 'italic' 
  },
  title: {
    fontSize: '1.1em',
    fontWeight: 'bold',
  }
});

interface StatsDisplayProps {
  site: any;
  prices: any;
}

export const StatsDisplay = ({ site, prices }: StatsDisplayProps) => {
  const classes = useStyles();

  return (
    <Grid.Container gap={2} justify="center">
    <Grid xs={12} sm={8} md={6}>
        <Card className={classes.root}>
          <CardContent>
            <Typography className={classes.cardtitle} gutterBottom>
              vGLMR Data
            </Typography>

            <Grid >
            <Grid xs={6}>
            <div className={classes.data}>

            <ShowChartIcon color="primary" />
            <div>

          <Typography>
            <span className={classes.title}>APY: </span>
            <span className={classes.number}>
              {site.vGLMR.apy}
            </span>
            <span className={classes.unit}>
              %
            </span>
          </Typography>
          </div>
          </div>

        </Grid>
        <Grid xs={6}>
        <div className={classes.data}>

          <AttachMoneyIcon color="primary" />
          <div>
          <Typography>
            <span className={classes.number}>1 </span>
            <span className={classes.unit}>vGLMR</span>
            <span className={classes.title}> =</span>

            <span className={classes.number}>
              {(prices.prices.vglmr / prices.prices.glmr).toFixed(6)}
            </span>
            <span className={classes.unit}>
              GLMR
            </span>
          </Typography>
          </div>
          </div>
        </Grid>
        <Grid xs={6}>
        <div className={classes.data}>

          <AccountBalanceIcon color="primary" />
          <div>
          <Typography>
            <span className={classes.title}>Total Staked: </span>
            <span className={classes.number}>
              {(site.vGLMR.tvm / 1000000).toFixed(6)}M
            </span>
            <span className={classes.unit}>
              GMLR
            </span>
          </Typography>
          </div></div>
        </Grid>
        <Grid xs={6}>
        <div className={classes.data}>

          <MonetizationOnIcon color="primary" />
          <div>
          <Typography >
            <span className={classes.title}>Total Liquidity: </span>
            <span className={classes.number}>
              ${(site.vGLMR.tvl * prices.prices.glmr / 1000000).toFixed(6)}
            </span>
          </Typography>
          </div></div>
        </Grid>
        <Grid xs={6}>
        <div className={classes.data}>

          <MultilineChartIcon color="primary" />
          <div>
          <Typography>
            <span className={classes.title}>vGLMR TVS: </span>
            <span className={classes.number}>
              ${(site.vGLMR.tvm * prices.prices.glmr / 1000000).toFixed(6)}
            </span>
          </Typography>
          </div></div>
        </Grid>
      </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
