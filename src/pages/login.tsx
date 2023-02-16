import { useContext, useState } from "react";
import {
  Container,
  Box,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@pankod/refine-mui";

import NeufeldLogo from "../assets/neufeld-logo.png";
import { CustomButton } from "components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "@pankod/refine-react-router-v6";

export const Login: React.FC = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  // @ts-ignore
  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        // Signed in
        const user = userCredentials.user;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", `${userCredentials}`);
        navigate("/");
        navigate(0);
        //window.location.reload();
        //dispatch({ type: "LOGIN", payload: user });
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  console.log(email, password);

  return (
    <Container
      style={{
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "row",
        minWidth: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        className="login_logo"
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          minWidth: "50%",
          backgroundColor: "#ECE8E5",
        }}
      >
        <img className="cellImg" src={NeufeldLogo} alt="avatar" />
      </Container>
      <Container
        className="login_form"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "100vh",
          minWidth: "50%",
          backgroundColor: "#fcfcfc",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            fontSize={30}
            fontWeight={800}
            color="#000000"
            textAlign="center"
          >
            Login
          </Typography>
          {/* <GoogleButton /> */}

          <Box mt={2} borderRadius="15px" padding="15px">
            {error && (
              <span style={{ color: "red", fontWeight: 600 }}>
                Wrong email or password!
              </span>
            )}
            <form
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
              onSubmit={handleLogin}
            >
              <Stack direction="row" gap={4}>
                <FormControl>
                  <FormHelperText
                    sx={{
                      fontWeight: 700,
                      margin: "10px 0",
                      fontSize: 16,
                      color: "#11142d",
                    }}
                  >
                    Email
                  </FormHelperText>
                  <TextField
                    fullWidth
                    required
                    id="outlined-basic"
                    color="info"
                    type="email"
                    variant="outlined"
                    placeholder="example@domain.com"
                    onChange={(e) => setEmail(e.target.value)}
                    // {...register("price", { required: true })}
                  />
                </FormControl>
              </Stack>

              <FormControl>
                <FormHelperText
                  sx={{
                    fontWeight: 700,
                    margin: "10px 0",
                    fontSize: 16,
                    color: "#11142d",
                  }}
                >
                  Password
                </FormHelperText>
                <TextField
                  fullWidth
                  required
                  type="password"
                  id="outlined-basic"
                  color="info"
                  variant="outlined"
                  placeholder="* * * * * * * *"
                  onChange={(e) => setPassword(e.target.value)}
                  //   {...register("location", { required: true })}
                />
              </FormControl>

              <CustomButton
                fullWidth
                type="submit"
                title={"Submit"}
                backgroundColor="#3A9A4B"
                color="#fcfcfc"
                style={{ marginTop: 5 }}
              />
            </form>
          </Box>
        </Box>
      </Container>
    </Container>
  );
};
