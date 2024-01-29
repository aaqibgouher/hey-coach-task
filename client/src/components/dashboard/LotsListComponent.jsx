import {
  Card,
  CardContent,
  Typography,
  Grid,
  CardMedia,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getLotsAction } from "../../actions/parkingAction";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LotsListComponent = () => {
  const dispatch = useDispatch();
  const lotsState = useSelector((state) => state.parkingReducer.lots);

  const getLots = async () => {
    try {
      await dispatch(getLotsAction());
    } catch (error) {
      console.log(error, "from get lots list component");
    }
  };

  useEffect(() => {
    getLots();
  }, []);

  return (
    <>
      <Box>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side text */}
          <Grid item xs={6}>
            <Typography variant="h4" component="div">
              Parking Lots
            </Typography>
          </Grid>

          {/* Right side button as a link */}
          <Grid item xs={6} container justifyContent="flex-end">
            <Button
              component={Link}
              to="/add-lot"
              variant="contained"
              color="primary"
            >
              Add
            </Button>
          </Grid>
        </Grid>
        <Divider sx={{ marginY: "1rem" }} />
        <Grid container spacing={3} style={{ display: "flex" }}>
          {lotsState && lotsState.length ? (
            lotsState.map((lot, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={lot.name}
                    height="140"
                    image="https://d3kjluh73b9h9o.cloudfront.net/original/4X/b/0/7/b072008be61ba23e732b3de042e33c31e2e23ccf.jpeg"
                  />
                  <CardContent style={{ flex: "1" }}>
                    <Typography variant="h5" component="div">
                      {lot.name}
                    </Typography>
                    <Typography color="textSecondary">
                      Total Slots: {lot.totalSlots}
                    </Typography>
                    <Typography color="textSecondary">
                      Sizes: {lot.sizes.join(", ")}
                    </Typography>
                    <Typography color="textSecondary">
                      Total Floors: {lot.totalFloors}
                    </Typography>
                  </CardContent>
                  <Button
                    component={Link}
                    to={`/lot/${lot._id}`}
                    variant="contained"
                    color="primary"
                  >
                    View
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <p>No lots</p>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default LotsListComponent;
