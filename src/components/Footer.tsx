import styled from "@emotion/styled";
import css from "@styled-system/css";
import React from "react";
import { Grid, Flex } from "theme-ui";

const Content = styled(Grid)`
  grid-area: Footer;

  ${css({
    bg: "secondary",
    px: 2,
    color: "white",
  })}
`;

export const Footer = () => {
  return (
    <Content>
      <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
        dayz-types-generator.com
      </Flex>
    </Content>
  );
};
