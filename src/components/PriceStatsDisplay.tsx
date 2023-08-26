import { Card, Grid, Text } from "@nextui-org/react";
import { makeStyles } from "@material-ui/core/styles";
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

export const PriceStatsDisplay = () => {
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
            <Text h3 b>Exchange Data</Text>
            <Grid.Container gap={3}>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <ShowChartIcon color="primary" fontSize="large" />
                  <div>
                    <Typography>
                      <span className={classes.title}>Price</span>
                      <br />
                      <span className={classes.number}>1 </span>
                      <span className={classes.unit}>DOT</span>
                      <span className={classes.title}> = </span>

                      <span className={classes.number}>
                        {("21.296194")}
                      </span>
                      <span className={classes.unit}>BNC</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <MultilineChartIcon color="primary" fontSize="large" />
                  <div>
                    <Typography>
                      <span className={classes.title}>Price Impact</span>
                      <br />
                      
                      <span className={classes.number}> &lt; 0.1179</span>
                      <span className={classes.unit}>%</span>
                    </Typography>
                  </div>
                </div>
              </Grid>
              <Grid xs={12} sm={4}>
                <div className={classes.data}>
                  <div>
                    <Typography>
                      <span className={classes.title}>Liquidity Provider Fee</span>
                      <br />
                      <span className={classes.number}>0.003</span>
                      <span className={classes.unit}>DOT</span>

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
