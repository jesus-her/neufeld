import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  Stack,
  Select,
  MenuItem,
} from "@pankod/refine-mui";
import { db } from "../../../firebase";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import CustomButton from "../CustomButton";
import { collection, addDoc } from "firebase/firestore";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "@pankod/refine-react-router-v6";
const FormLine = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [numberReal, setNumberReal] = useState("");
  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2014-08-18T21:11:54")
  );
  const navigate = useNavigate();
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
    console.log("TIME AND DATE:", value?.day);
  };

  const handleRegisterLine = async (e: any) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "line_1"), {
        start_time: startTime,
        end_time: endTime,
        number_real: numberReal,
      });
      console.log("Document written with ID: ", docRef.id);
      navigate(-1);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  console.log("START TIME: ", startTime);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Register Line 1 params
        </Typography>

        <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#fcfcfc">
          <form
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
            onSubmit={handleRegisterLine}
          >
            <Stack
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 50,
                // backgroundColor: "yellow",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <FormControl>
                <TextField
                  id="time"
                  label="Start time"
                  type="time"
                  defaultValue="07:45"
                  onChange={(e) => setStartTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 150 }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="time"
                  label="End time"
                  type="time"
                  defaultValue="07:45"
                  onChange={(e) => setEndTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 150 }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  type="number"
                  label="Number real"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 150 }}
                  onChange={(e) => setNumberReal(e.target.value)}
                />
              </FormControl>

              {/* <DateTimePicker
                label="Date&Time picker"
                value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              /> */}
              <CustomButton
                type="submit"
                title={"Register"}
                backgroundColor="#3A9A4B"
                color="#fcfcfc"
              />
            </Stack>
          </form>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default FormLine;
