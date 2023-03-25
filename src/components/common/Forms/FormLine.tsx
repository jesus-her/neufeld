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
import { useState } from "react";
import CustomButton from "../CustomButton";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "@pankod/refine-react-router-v6";

const FormLine = ({ line }: { line: any }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [product, setProduct] = useState("");
  const [numberReal, setNumberReal] = useState("");

  const navigate = useNavigate();

  const cambiarHoraInicio = (event: any) => {
    setStartTime(event.target.value);
  };
  const cambiarHoraFinal = (event: any) => {
    setEndTime(event.target.value);
  };
  const seleccionarProducto = (event: any) => {
    setProduct(event.target.value);
  };

  // Obtener la fecha actual y mandarla a la base de datos
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  // console.log("JKAHSGDWEGDUWE:", currentDate); // "17-6-2022"

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
          date: currentDate,
        }
      );
      navigate(-1);
    } catch (e) {}
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
  const hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
    "24:00",
  ];

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        Register Line
        {line === "1" ? "1" : line === "2" ? "2" : line === "3" ? "3" : "4"}
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
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            {/* Registro de Hora inicial */}
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">Start time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={startTime}
                label="Start time"
                onChange={cambiarHoraInicio}
              >
                {hours.map((valor) => (
                  <MenuItem key={valor} value={valor}>
                    {valor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Registro de Hora Final */}
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-simple-select-label">End Time</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={endTime}
                label="End time"
                onChange={cambiarHoraFinal}
              >
                {hours.map((valor) => (
                  <MenuItem key={valor} value={valor}>
                    {valor}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Registro de Numero real */}
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

            {/* Registro de producto */}
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
              </Select>
            </FormControl>

            <CustomButton
              type="submit"
              title="Register"
              backgroundColor="#3A9A4B"
              color="#fcfcfc"
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default FormLine;
