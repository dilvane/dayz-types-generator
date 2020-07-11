import { alpha } from "@theme-ui/color";
import React from "react";
import { Flex, Spinner } from "theme-ui";

export const Absolute = ({ sx, ...props }: any) => (
  <Flex
    {...props}
    sx={{
      width: "100%",
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      ...sx,
    }}
  />
);

export const SpinnerAbsolute = ({ size = 56, strokeWidth = 2, ...sx }) => (
  <Absolute
    sx={{
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      p: 4,
      bg: alpha("white", 0.7),
      transition: "0.2",
      zIndex: 999,
      ...sx,
    }}>
    <Spinner strokeWidth={strokeWidth} size={size} />
  </Absolute>
);
