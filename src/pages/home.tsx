import {
  Typography,
  Box,
  Stack,
  TextField,
  FormControl,
} from "@pankod/refine-mui";
import { db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { ProgressBar } from "components/charts/PropertyReferrals";
import { CustomButton } from "components";
import { Add, Edit } from "@mui/icons-material";

const Home = () => {
  // variables de estado
  const [lista, setLista] = useState([]);
  const [lista2, setLista2] = useState([]);
  const [lista3, setLista3] = useState([]);
  const [cargando, setCargando] = useState(false);

  const [numeroDeseado, setNumeroDeseado] = useState(1);
  const [goal, setGoal] = useState(0);

  // OBTENER DATOS DE LA LINEA 1
  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "line_1"));
        const docs: any = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista(docs);
      } catch (error) {
        //console.log(error);
      }
    };
    getLista();
  }, []);

  // OBTENER DATOS DE LA LINEA 2
  useEffect(() => {
    const getLista2 = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "line_2"));
        const docs: any = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista2(docs);
      } catch (error) {
        //console.log(error);
      }
    };
    getLista2();
  }, []);

  // OBTENER DATOS DE LA LINEA 3
  useEffect(() => {
    const getLista3 = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "line_3"));
        const docs: any = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista3(docs);
      } catch (error) {
        // console.log(error);
      }
    };
    getLista3();
  }, []);

  const promedio = lista.reduce((accumulator, object) => {
    //@ts-ignore
    return (
      accumulator +
      //@ts-ignore
      Math.round((Number(object.number_real) / goal) * 100)
    );
  }, 0);
  const promedio2 = lista2.reduce((accumulator, object) => {
    //@ts-ignore
    return (
      accumulator +
      //@ts-ignore
      Math.round((Number(object.number_real) / goal) * 100)
    );
  }, 0);
  const promedio3 = lista3.reduce((accumulator, object) => {
    //@ts-ignore
    return (
      accumulator +
      //@ts-ignore
      Math.round((Number(object.number_real) / goal) * 100)
    );
  }, 0);

  const handleRegisterGoal = async (e: any) => {
    setCargando(true);
    console.log("ola");
    const ref = doc(db, "goal", "I4bIWmwuTbhZqfCSrvdN");
    e.preventDefault();
    await updateDoc(ref, {
      goal: numeroDeseado,
    });
    window.location.reload();
    setCargando(false);
  };

  // Traer el Numero deseado / Meta desde la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "goal"));
        querySnapshot.forEach((doc) => {
          console.log(doc.data().goal, typeof doc.data().goal);
          //@ts-ignore
          setGoal(Number(doc.data().goal));
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  function getColor(value: any) {
    //value from 0 to 1
    var hue = ((1 - value) * 120).toString(10);
    return ["hsl(", hue, ",100%,50%)"].join("");
  }
  return (
    <Box>
      <Typography
        fontSize={25}
        fontWeight={800}
        color="#000000"
        marginBottom={3}
      >
        Dashboard
      </Typography>

      <Typography
        fontSize={22}
        fontWeight={700}
        color="#11142d"
        textAlign={"center"}
      >
        🎉META ACTUAL🎉: {goal}
      </Typography>
      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <form
          onSubmit={handleRegisterGoal}
          style={{ display: "flex", flexDirection: "row", gap: 10 }}
        >
          <FormControl>
            <TextField
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              type="number"
              label="Meta"
              sx={{ width: 300 }}
              //@ts-ignore
              onChange={(e) => setNumeroDeseado(e.target.value)}
            />
          </FormControl>
          <CustomButton
            disabled={cargando}
            type="submit"
            title="Nueva Meta"
            backgroundColor={"#3A9A4B"}
            color={"#fcfcfc"}
            icon={<Edit />}
          />
        </form>
      </Box>

      <Stack my="20px" direction="column" gap={4}>
        {/* @ts-ignore */}
        <ProgressBar
          title="Linea 1"
          percentage={promedio}
          color={
            promedio < 33
              ? "red"
              : promedio > 34 && promedio < 66
              ? "yellow"
              : "green"
          }
        />
        <ProgressBar
          title="Linea 2"
          percentage={promedio2}
          color={
            promedio2 < 33
              ? "red"
              : promedio2 > 34 && promedio2 < 66
              ? "yellow"
              : "green"
          }
        />
        <ProgressBar
          title="Linea 3"
          percentage={promedio3}
          color={
            promedio3 < 33
              ? "red"
              : promedio3 > 34 && promedio3 < 66
              ? "yellow"
              : "green"
          }
        />
      </Stack>
    </Box>
  );
};

export default Home;
