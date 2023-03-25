import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useDelete } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { CustomButton } from "components";
import { LinesColumns } from "components/common/columns";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Line1 = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot = await getDocs(collection(db, "line_1"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // LISTEN (REALTIME)
    // const unsub = onSnapshot(
    //   collection(db, "line_1"),
    //   (snapShot: any) => {
    //     let list: any = [];
    //     snapShot.docs.forEach((doc: any) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //   },
    //   (error: any) => {
    //     console.log(error);
    //   }
    // );

    // return () => {
    //   unsub();
    // };
  }, []);

  const detailsRows = data.map((valor: any) => {
    return {
      id: valor.id,
      start_time: valor.start_time,
      end_time: valor.end_time,
      number_real: valor.number_real,
      product: valor.product,
      date: valor.date,
    };
  });

  return (
    <>
      <Stack mb="15px">
        <Typography fontSize={25} fontWeight={800} color="#000000">
          Linea 1
        </Typography>
      </Stack>
      <Box height="100%">
        <Box mb="25px" flexDirection={"row"} justifyContent="space-around">
          <Stack>
            <CustomButton
              title="Add register"
              handleClick={() => navigate("/lines/create")}
              backgroundColor="#3A9A4B"
              color="#fcfcfc"
              icon={<Add />}
            />
          </Stack>
        </Box>
        <Stack bgcolor="#fcfcfc" height="100%" padding={4}>
          <DataGrid
            rows={detailsRows}
            columns={LinesColumns}
            pageSize={10}
            rowsPerPageOptions={[5]}
            checkboxSelection={false}
          />
        </Stack>
      </Box>
    </>
  );
};

export default Line1;
