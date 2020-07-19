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

  .bmc-button img {
    height: 34px !important;
    width: 35px !important;
    margin-bottom: 1px !important;
    box-shadow: none !important;
    border: none !important;
    vertical-align: middle !important;
  }
  .bmc-button {
    padding: 7px 15px 7px 10px !important;
    line-height: 35px !important;
    height: 51px !important;
    text-decoration: none !important;
    display: inline-flex !important;
    color: #ffffff !important;
    background-color: #de3d42 !important;
    border-radius: 5px !important;
    border: 1px solid transparent !important;
    padding: 7px 15px 7px 10px !important;
    font-size: 20px !important;
    letter-spacing: -0.08px !important;
    box-shadow: 0px 1px 2px rgba(190, 190, 190, 0.5) !important;
    -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    margin: 0 auto !important;
    font-family: "Lato", sans-serif !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
  }
  .bmc-button:hover,
  .bmc-button:active,
  .bmc-button:focus {
    -webkit-box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    text-decoration: none !important;
    box-shadow: 0px 1px 2px 2px rgba(190, 190, 190, 0.5) !important;
    opacity: 0.85 !important;
    color: #ffffff !important;
  }

  .bmc-button {
    span {
      margin-left: 5px;
      font-size: 19px !important;
    }
  }
`;

export default () => <Global styles={dynamicStyles} />;
