import styled from "@emotion/styled";
import { css } from "@styled-system/css";
import { ThemeProvider } from "@emotion/react";
import { theme, GlobalStyles } from "theme";
import { Grid } from "theme-ui";

const Container = styled(Grid)`
  height: 100%;
  width: 100%;
  gap: 0;

  ${css({
    height: ["auto", null, "100%"],
    gridTemplateColumns: ["1fr", null, "400px 1fr"],
    gridTemplateRows: ["1fr", null, "auto 1fr auto"],
    gridTemplateAreas: [
      `
      "Navbar"
      "Form"
      "Table"
      "TableActions"`,
      null,
      `
      "Navbar Table"
      "Form Table"
      "Form TableActions"`,
    ],
  })}
`;

export const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Container>{children}</Container>
    </ThemeProvider>
  );
};
