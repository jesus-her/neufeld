import React from "react";
import { useRouterContext, TitleProps } from "@pankod/refine-core";
import { Button } from "@pankod/refine-mui";

import { logo, yariga } from "assets";
import NeufeldLogo from "assets/neufeld-logo.png";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button
      fullWidth
      variant="text"
      disableRipple
      style={{ paddingTop: 20, backgroundColor: "#EDE9E6" }}
    >
      <Link to="/">
        {collapsed ? (
          <img src={NeufeldLogo} alt="Yariga" width="40px" />
        ) : (
          <img src={NeufeldLogo} alt="Refine" height="55px" />
        )}
      </Link>
    </Button>
  );
};
