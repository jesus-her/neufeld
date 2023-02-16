import { useGetIdentity, useOne, useTable } from "@pankod/refine-core";
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

import { FormLotProps } from "interfaces/common";
import CustomButton from "../CustomButton";

const FormLot = ({
  type,
  register,
  formLoading,
  onFinishHandler,
  handleSubmit,
}: FormLotProps) => {
  // @ts-ignore
  const { user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "supervisors",
    id: "63e97e8df2ed3db2d2a159b0",
  });

  const myProfile = data?.data ?? [];
  console.log(myProfile);

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        {type} a Lot
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
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <Stack direction="row" justifyContent={"space-between"}>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 800,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Alias
              </FormHelperText>
              <TextField
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("alias", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Address
              </FormHelperText>
              <TextField
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("address", { required: true })}
              />
            </FormControl>
          </Stack>

          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Select Lot Status
              </FormHelperText>
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue="active"
                {...register("status", {
                  required: true,
                })}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: "10px 0",
                  fontSize: 16,
                  color: "#11142d",
                }}
              >
                Admin
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                variant="outlined"
                {...register("admin", { required: true })}
              />
            </FormControl>
          </Stack>

          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: "10px 0",
                fontSize: 16,
                color: "#11142d",
              }}
            >
              Prices
            </FormHelperText>
            <TextField
              fullWidth
              required
              type="number"
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register("prices", { required: true })}
            />
          </FormControl>
          <CustomButton
            type="submit"
            title={formLoading ? "Submitting..." : "Submit"}
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default FormLot;
