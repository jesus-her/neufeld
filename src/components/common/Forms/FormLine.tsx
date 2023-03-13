import {
  Box,
  Typography,
  FormControl,
  TextField,
  Stack,
  InputLabel,
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

//@ts-ignore
const FormLine = ({ line }) => {
  //console.log("LINEAAAAA:", line);

  const [startTime, setStartTime] = useState("");
  const [product, setProduct] = useState("");
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

  //@ts-ignore
  const seleccionarProducto = (event) => {
    setProduct(event.target.value);
  };

  const handleRegisterLine = async (e: any) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(
        collection(
          db,
          line === "1"
            ? "line_1"
            : line === "2"
            ? "line_2"
            : line === "3"
            ? "line_3"
            : "line_4"
        ),
        {
          start_time: startTime,
          end_time: endTime,
          number_real: numberReal,
          product: product,
        }
      );
      //console.log("Document written with ID: ", docRef.id);
      navigate(-1);
    } catch (e) {
      //console.error("Error adding document: ", e);
    }
  };

  const productNames = [
    "Doble Chocolate",
    "Zanahoria",
    "Red Velvet",
    "Moka",
    "Nuez",
    "Durazno",
    "Fresa",
    "Chocolate",
    "Mini Doble Chocolate",
    "Mini Zanahoria",
    "Mini Red Velvet",
    "Mini Moka",
    "Arco Iris",
    "Mini Arco Iris",
    "3 Leches  Cereza",
    "3 Leches Nuez",
    "3 leches Choco Blanco",
    "3 Leches Durazno",
    "3 Leches Rompope",
    "Mini 3 Leches",
    "Porcion 3 Leches",
    "Porcion 3 Leches Rompope",
    "Pastel 3 Leches Cajeta",
    "Mini Cheese Cake",
    "Cheese Cake Frutos Rojos Chico",
    "Cheese Cake Frutos Rojos Grande",
    "Rosca Philadelphia",
    "Mini Rosca Philadelphia",
    "Rosca Chocolate",
    "Mini Red Cheese Cake Manzana",
    "Cheese Cake Manzana Grande ",
    "Cheese Cake Capuccino Grande",
    "Flan Napolitano",
    "Pay de Queso Ligero",
    "Pastel Rec Tiramisau",
    "Porcion 3 Leches Mango",
    "Pastel 3 Leches Mango",
  ];
  //console.log("HOLLALALALALALALA", product);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142d">
          Register Line{" "}
          {line === "1" ? "1" : line === "2" ? "2" : line === "3" ? "3" : "4"}{" "}
          params
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
                  defaultValue=""
                  onChange={(event) => {
                    setStartTime(event.target.value);
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 300 }}
                />
              </FormControl>
              <FormControl>
                <TextField
                  id="time"
                  label="End time"
                  type="time"
                  defaultValue=""
                  onChange={(e) => setEndTime(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ width: 300 }}
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
                  sx={{ width: 300 }}
                  onChange={(e) => setNumberReal(e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth sx={{ width: 300 }}>
                <InputLabel id="demo-simple-select-label">Product</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={product}
                  label="product"
                  onChange={seleccionarProducto}
                >
                  {productNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}

                  {/* <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
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
