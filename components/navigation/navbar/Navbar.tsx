"use client";
import React from "react";
import NavbarDesktop from "./desktop/NavbarDesktop";
import NavbarMobile from "./mobile/NavbarMobile";
import { useMediaQuery } from "@mantine/hooks";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 744px)");

  return <div>{isMobile ? <NavbarMobile /> : <NavbarDesktop />}</div>;
};

export default Navbar;
