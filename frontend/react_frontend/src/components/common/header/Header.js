import React from "react";

// Components
import { Logo } from "./headerComponents/logo/Logo";
import { AccountMenu } from "./headerComponents/AccountMenu";

// Styles
import { Box } from "@material-ui/core";

export const Header = () => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bgcolor="#1b1b4f"
      minHeight={96}
      maxHeight={136}
      height="20vh"
    >
      <Logo />
      <AccountMenu />
    </Box>
  );
};
