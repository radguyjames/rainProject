import React from "react";

// Components
import { NavbarLink } from "./NavbarLink";

// Styles
import { Box, Divider } from "@material-ui/core";

export const Navbar = () => {
  return (
    <div>
      <Box display="flex" alignItems="center">
        <NavbarLink />
      </Box>
      <Divider />
    </div>
  );
};
