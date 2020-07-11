import styled from "@emotion/styled";
import css from "@styled-system/css";
import React from "react";
import { Grid, Flex } from "theme-ui";

const Content = styled(Grid)`
  grid-area: Navbar;

  ${css({
    bg: "secondary",
    p: 3,
    color: "white",
    fontSize: 5,
  })}
`;

export const Navbar = () => {
  return (
    <Content>
      <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
        Dayz Types Generator
      </Flex>
    </Content>
  );
};
