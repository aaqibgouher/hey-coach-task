import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allocateParkingAction } from "../../actions/parkingAction";
import { useParams } from "react-router-dom";

const AllocateComponent = ({ lotId }) => {
  const dispatch = useDispatch();
  const [carSize, setCarSize] = useState("SMALL");
  const [carNo, setCarNo] = useState("");
  const [from, setFrom] = useState("");
  const [sizes, setSizes] = useState(["SMALL", "MEDIUM", "LARGE", "XL"]);

  const allocateParking = async () => {
    try {
      console.log(carSize, carNo, from, lotId, "data");
      await dispatch(allocateParkingAction({ lotId, carSize, carNo, from }));
    } catch (error) {
      console.log(error, "from allocate parking");
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Left side text */}
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Size"
              onChange={(e) => setCarSize(e.target.value)}
              value={carSize}
            >
              {sizes.map((size, index) => (
                <MenuItem key={index} value={size}>
                  {size}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-asic"
            label="Car No"
            variant="outlined"
            sx={{ width: "100%" }}
            onChange={(e) => setCarNo(e.target.value)}
            value={carNo}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-basic"
            label="From"
            variant="outlined"
            sx={{ width: "100%" }}
            type="date"
            onChange={(e) => setFrom(e.target.value)}
            value={from}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={allocateParking}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AllocateComponent;
