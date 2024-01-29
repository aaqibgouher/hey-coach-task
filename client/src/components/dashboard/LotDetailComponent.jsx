import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deallocateParkingAction,
  getLotAction,
} from "../../actions/parkingAction";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { SET_DIALOG } from "../../types";

const LotDetailComponent = () => {
  const { lotId } = useParams();
  const dispatch = useDispatch();
  const lotState = useSelector((state) => state.parkingReducer.lot);
  const [lot, setLot] = useState(null);

  const getAllocatedDetails = async () => {
    try {
      console.log(lotId, "lot id");
      const res = await dispatch(getLotAction({ lotId }));
    } catch (error) {
      console.log(error, "from get lot detail component");
    }
  };

  const createDataForLot = async () => {
    let result = [];

    lotState.map((data) => {
      // if floor already exists
      const floorObj = result.find(
        (item) => item.floorNo === data.floor.floorNo
      );
      console.log(data, "from data");
      if (floorObj) {
        floorObj.booked.push(
          ...data.booked.map((booking) => ({
            ...booking,
            label: data.label,
          }))
        );
      } else {
        result.push({
          lotId: data.lot._id,
          floorNo: data.floor.floorNo,
          totalSlotsInFloor: data.floor.totalSlots,
          booked: [
            ...data.booked.map((booking) => ({
              ...booking,
              label: data.label,
            })),
          ],
        });
      }
    });

    console.log(result, "result");
    setLot(result);
  };

  const allocateParking = async () => {
    await dispatch({
      type: SET_DIALOG,
      payload: {
        open: true,
        title: "Allocate Parking",
        type: "ALLOCATE",
        lotId,
      },
    });
  };

  const deallocateParkingCar = async (bookingId) => {
    try {
      console.log(bookingId, "booking");
      await dispatch(deallocateParkingAction({ bookingId }));

      //   update
      getAllocatedDetails();
    } catch (error) {
      console.log(error, "from error");
    }
  };

  useEffect(() => {
    if (lotId) {
      getAllocatedDetails();
    }
  }, [lotId]);

  useEffect(() => {
    if (lotState) {
      createDataForLot();
    }
  }, [lotState]);

  return (
    <>
      <Grid
        container
        alignItems="center"
        spacing={2}
        sx={{ marginBottom: "1rem" }}
      >
        {/* Left side text */}
        <Grid item xs={6}>
          <Typography variant="h4" component="div">
            Lot Detail
          </Typography>
        </Grid>

        {/* Right side button as a link */}
        <Grid item xs={6} container justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={allocateParking}>
            Allocate
          </Button>
        </Grid>
      </Grid>
      {lot && lot.length ? (
        lot.map((floor, index) => (
          <Card key={floor.floorNo} sx={{ marginBottom: 2 }}>
            <CardHeader
              title={`Floor ${floor.floorNo} (${floor.totalSlotsInFloor})`}
            />
            <CardContent>
              <Grid container spacing={2}>
                {floor.booked.map((booking) => (
                  <>
                    <Grid item key={booking._id}>
                      <ListItem
                        disablePadding
                        style={{ border: "1px solid", padding: "10px" }}
                      >
                        <ListItemText
                          primary={`Car No: ${booking.carNo}`}
                          // secondary={`From: ${booking.from}`}
                        />
                        <br />
                        <Chip
                          sx={{ marginLeft: "2px" }}
                          label={booking.label}
                          variant="outlined"
                        />
                        <IconButton
                          aria-label="delete"
                          onClick={() => deallocateParkingCar(booking._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    </Grid>
                  </>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ))
      ) : (
        <p>No lot found</p>
      )}
    </>
  );
};

export default LotDetailComponent;
