import styled from "@emotion/styled";
import css from "@styled-system/css";
import { Absolute } from "components";
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
          mb: 3,
        }}>
        <Image
          src="static/TypesGenerator_DAYZ_White_300x300.png"
          sx={{ width: "200px", height: "200px" }}
        />
        <Absolute sx={{ mx: 4, mt: 2, width: "50px", height: "50px" }}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://discord.io/squadz">
            <Image
              src="static/discord.png"
              sx={{ width: "50px", height: "50px" }}
            />
          </a>
        </Absolute>
        <a
          className="bmc-button"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.buymeacoffee.com/squadzteam">
          <img
            src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
            alt="Buy me a coffee"
          />
          <span>Buy us a coffee</span>
        </a>
      </Flex>
    </Content>
  );
};
