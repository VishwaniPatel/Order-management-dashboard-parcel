import React from "react";
import { Image } from "@mantine/core";
import logo from "../assets/images/logo.png";
function Logo() {
  return <Image radius="md" src={logo} alt="logo" height={55} width={200} />;
}

export default Logo;
