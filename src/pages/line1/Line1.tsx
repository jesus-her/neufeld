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

const Line1 = () => {
  const navigate = useNavigate();
  const { mutate } = useDelete();
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
        //("DATA:", list);
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

  // const handleDeleteSupervisor = async (id: any) => {
  //   const response = confirm("Are you sure you want to delete this property?");
  //   if (response) {
  //     mutate(
  //       {
  //         resource: "supervisors",
  //         id: id.id,
  //       },
  //       {
  //         onSuccess: () => {
  //           navigate("/supervisors");
  //         },
  //       }
  //     );
  //   }
  // };

  // const res = await fetch(
  //   `http://localhost:8080/api/v1/supervisors/${id.id}`,
  //   {
  //     method: "DELETE",
  //   }
  // );

  // const data = await res.json();
  // console.log(data);

  // const {
  //   tableQueryResult: { data, isLoading, isError },
  // } = useTable();

  // const allSupervisors = data?.data ?? [];

  // const actionColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 250,
  //     renderCell: (params: any) => {
  //       return (
  //         <div>
  //           {/* <CustomButton
  //             style={{ minWidth: 60, height: 30, fontSize: 14 }}
  //             title="Edit"
  //             handleClick={() => {
  //               navigate(`/supervisors/edit/${params.id}`);
  //             }}
  //             backgroundColor="#475BE8"
  //             color="#fcfcfc"
  //             icon={<Edit />}
  //           /> */}
  //           <CustomButton
  //             style={{ minWidth: 60, height: 30, fontSize: 14, marginLeft: 1 }}
  //             title="Delete"
  //             handleClick={() => {
  //               handleDeleteSupervisor({ id: params.id });
  //             }}
  //             backgroundColor="#FF0000"
  //             color="#fcfcfc"
  //             icon={<Delete />}
  //           />
  //         </div>
  //       );
  //     },
  //   },
  // ];
  // const detailsRows = allLots.map((item) => {
  //   return {
  //     id: item._id,
  //     admin: item.admin,
  //     alias: item.alias,
  //     address: item.address,
  //     prices: item.prices,
  //     status: item.status,
  //   };
  // });

  const detailsRows = data.map((item: any) => {
    const timestamp_start = {
      nanoseconds: item.start_time.nanoseconds,
      seconds: item.start_time.seconds,
    };
    const timestamp_end = {
      nanoseconds: item.end_time.nanoseconds,
      seconds: item.end_time.seconds,
    };

    // console.log(new Date(timestamp_start.seconds * 1000));
    //console.log(detailsRows);

    return {
      id: item.id,
      start_time: item.start_time,
      end_time: item.end_time,
      number_real: item.number_real,
      product: item.product,
    };
  });
  // console.log("HELLO", detailsRows);

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

export default Line1;
