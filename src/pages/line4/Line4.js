import React, { useEffect, useMemo, useState } from "react";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useDelete, useTable } from "@pankod/refine-core";
import { Box, Stack, Typography } from "@pankod/refine-mui";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "@pankod/refine-react-router-v6";

import { CustomButton } from "components";
import { LinesColumns } from "components/common/columns";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Line4 = () => {
  const navigate = useNavigate();
  const { mutate } = useDelete();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "line_4"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        //console.log("DATA:", list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const detailsRows = data.map((item) => {
    const timestamp_start = {
      nanoseconds: item.start_time.nanoseconds,
      seconds: item.start_time.seconds,
    };
    const timestamp_end = {
      nanoseconds: item.end_time.nanoseconds,
      seconds: item.end_time.seconds,
    };

    //  console.log(new Date(timestamp_start.seconds * 1000));
    //console.log(detailsRows);

    return {
      id: item.id,
      start_time: item.start_time,
      end_time: item.end_time,
      number_real: item.number_real,
      product: item.product,
    };
  });

  return (
    <>
      <Stack mb="15px">
        <Typography fontSize={25} fontWeight={800} color="#000000">
          Linea 4
        </Typography>
      </Stack>
      <Box height="100%">
        <Box mb="25px" flexDirection={"row"} justifyContent="space-around">
          <Stack>
            <CustomButton
              title="Add register"
              handleClick={() => navigate("/lines4/create")}
              backgroundColor="#3A9A4B"
              color="#fcfcfc"
              icon={<Add />}
            />
          </Stack>
        </Box>
        <Stack bgcolor="#fcfcfc" height="100%" padding={4}>
          <DataGrid
            // rows={detailsRows}
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

export default Line4;
