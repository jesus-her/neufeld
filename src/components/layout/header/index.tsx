import React from "react";
import { useGetIdentity, useRouterContext } from "@pankod/refine-core";
import {
  AppBar,
  Avatar,
  Button,
  Stack,
  Toolbar,
  Typography,
} from "@pankod/refine-mui";
import { auth } from "../../../firebase";

export const Header: React.FC = () => {
  const user = auth.currentUser;
  const { Link } = useRouterContext();
  //   const { data: user } = useGetIdentity();
  //   const showUserInfo = user && (user.displayName || user.photoURL);

  return (
    <AppBar
      color="default"
      position="sticky"
      elevation={0}
      sx={{ background: "#fcfcf" }}
    >
      <Toolbar>
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="text" disableRipple>
            <Link to="/my-profile">
              <Stack direction="row" gap="16px" alignItems="center">
                <img
                  src={
                    user?.photoURL
                      ? user.photoURL
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                  }
                  width={30}
                  height={30}
                  alt="user_profile"
                />
                {user?.email && (
                  <Typography
                    fontWeight={800}
                    fontSize="14px"
                    fontStyle={{ color: "#2c2c2c" }}
                  >
                    {user.email}
                  </Typography>
                )}
              </Stack>
            </Link>
          </Button>

          {/* <Typography variant="subtitle2">{user?.email} jj</Typography> */}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
