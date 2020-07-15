import { Global, css } from "@emotion/core";
import { darken } from "@theme-ui/color";
import React from "react";

const dynamicStyles = (theme: any) => css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    font-size: 100%;
    -webkit-text-size-adjust: 100%;
    font-variant-ligatures: none;
    -webkit-font-variant-ligatures: none;
    background-color: ${darken("white", 0.03)(theme)};
    font-family: ${theme.fonts.body};
  }

  html,
  body,
  #__next {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .tooltip {
    max-width: 400px;
  }
`;

export default () => <Global styles={dynamicStyles} />;
