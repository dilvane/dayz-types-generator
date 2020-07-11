import React from "react";
import { Box } from "theme-ui";

export const Block = ({ sx, ...props }: any) => (
  <Box sx={{ position: "relative", width: "100%", sx }} {...props} />
);
