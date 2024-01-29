import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const initialFormData = {
  name: "",
  totalSlots: "",
  sizes: [],
  totalFloors: "",
  floors: [],
};

const AddLotComponent = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [floors, setFloors] = useState([]);
  const [sizes, setSizes] = useState(["SMALL", "MEDIUM", "LARGE", "XL"]);

  const handleChange = (field, value) => {
    if (field === "totalFloors") {
      for (let i = 1; i <= formData.totalFloors; i++) {}
    }

    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const addLot = async () => {
    try {
      console.log(formData, "lotPayload");
    } catch (error) {
      console.log(error, "from error");
    }
  };

  return (
    <>
      <Box>
        <Grid container alignItems="center" spacing={2}>
          {/* Left side text */}
          <Grid item xs={6}>
            <Typography variant="h4" component="div">
              Add Lot
            </Typography>
          </Grid>

          {/* Right side button as a link */}
          <Grid item xs={6} container justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={addLot}>
              Add
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: "1rem" }} />

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              type="text"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Slots"
              type="number"
              fullWidth
              value={formData.totalSlots}
              onChange={(e) => handleChange("totalSlots", e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="sizes-label">Sizes</InputLabel>
              <Select
                label="Sizes"
                multiple
                value={formData.sizes}
                onChange={(e) => handleChange("sizes", e.target.value)}
              >
                {sizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Total Floors"
              type="number"
              fullWidth
              value={formData.totalFloors}
              onChange={(e) => handleChange("totalFloors", +e.target.value)}
            />
          </Grid>
        </Grid>

        {/* floor wise */}
        {[...Array(formData.totalFloors).keys()].map((floorNo) => (
          <Grid key={floorNo} container spacing={2} sx={{ marginY: "1rem" }}>
            <Grid item xs={6}>
              <Typography variant="h4" component="div">
                Floor {floorNo + 1}
              </Typography>
            </Grid>

            <Grid item xs={6} container justifyContent="flex-end">
              <TextField
                label="Total Slots"
                type="number"
                fullWidth
                value={formData[`floor_${floorNo + 1}_totalSlots`]}
                onChange={(e) =>
                  handleChange(
                    `floor_${floorNo + 1}_totalSlots`,
                    +e.target.value
                  )
                }
              />
            </Grid>

            {sizes.map((size) => (
              <Grid key={size} item xs={6} sm={6} md={3}>
                <Typography variant="h6">{size}</Typography>
                <TextField
                  label={`Total Slots`}
                  type="number"
                  fullWidth
                  value={formData[`${size}_floor_${floorNo + 1}`]}
                  onChange={(e) =>
                    handleChange(
                      `${size}_floor_${floorNo + 1}`,
                      +e.target.value
                    )
                  }
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </>
  );
};

export default AddLotComponent;
