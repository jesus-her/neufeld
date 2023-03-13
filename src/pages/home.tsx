import { Typography, Box, Stack } from "@pankod/refine-mui";
import { PieChart, PropertyReferrals, TotalRevenue } from "components";
import { db } from "../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

const Home = () => {
  // variables de estado
  const [lista, setLista] = useState([]);
  const [lista2, setLista2] = useState([]);
  const [lista3, setLista3] = useState([]);
  const [lista4, setLista4] = useState([]);

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

  // OBTENER DATOS DE LA LINEA 4
  useEffect(() => {
    const getLista4 = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "line_4"));
        const docs: any = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLista4(docs);
      } catch (error) {
        // console.log(error);
      }
    };
    getLista4();
  }, []);
  //@ts-ignore
  // console.log("DATOS LINEA 1:", lista[0]?.number_real);

  // function ArrayAvg(lista: any) {
  //   var i = 0,
  //     summ = 0,
  //     ArrayLen = lista.rate.length;
  //   while (i < ArrayLen) {
  //     summ = summ + lista[i++];
  //   }
  //   return summ / ArrayLen;
  // }
  // var a = ArrayAvg(lista);
  // console.log(a);
  const promedio = lista.reduce((accumulator, object) => {
    //@ts-ignore
    return (
      accumulator +
      //@ts-ignore
      Number(object.number_real) / lista.length
    );
  }, 0);
  const promedio2 = lista2.reduce((accumulator, object) => {
    //@ts-ignore
    return (
      accumulator +
      //@ts-ignore
      Number(object.number_real) / lista2.length
    );
  }, 0);
  const promedio3 = lista3.reduce((accumulator, object) => {
    //@ts-ignore
    return (
      accumulator +
      //@ts-ignore
      Number(object.number_real) / lista3.length
    );
  }, 0);
  const promedio4 = lista4.reduce((accumulator, object) => {
    //@ts-ignore
    return (
      accumulator +
      //@ts-ignore
      Number(object.number_real) / lista4.length
    );
  }, 0);

  // console.log("LOG", promedio); // 👉️ 60

  return (
    <Box>
      <Typography fontSize={25} fontWeight={800} color="#000000">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Productividad Linea #1"
          //@ts-ignore
          value={promedio}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Productividad Linea #2"
          value={promedio2}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Productividad Linea #3"
          value={promedio3}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Productividad Linea #4"
          value={promedio4}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  );
};

export default Home;
