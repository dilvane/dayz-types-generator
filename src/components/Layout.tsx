import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import React from "react";
import { theme, GlobalStyles } from "theme";
import { Grid } from "theme-ui";

const Container = styled(Grid)`
  height: 100%;
  width: 100%;
  gap: 0;
  grid-template-columns: 400px 1fr;
  grid-template-rows: auto 1fr auto 30px;
  grid-template-areas:
    "Navbar Table"
    "Form Table"
    "Form TableActions"
    "Footer Footer";
`;

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};
