import styled from "@emotion/styled";
import css from "@styled-system/css";
import React from "react";
import { Grid, Flex, Image } from "theme-ui";

const Content = styled(Grid)`
  grid-area: Navbar;

  ${css({
    bg: "primary",
    color: "white",
    fontSize: 5,
  })}
`;

export const Navbar = () => {
  return (
    <Content>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          borderRight: "2px solid",
          borderColor: "gray.7",
        }}>
        <Image
          src="static/TypesGenerator_DAYZ_White_300x300.png"
          sx={{ width: "200px", height: "200px" }}
        />
      </Flex>
    </Content>
  );
};
