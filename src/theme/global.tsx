import { Global, css } from "@emotion/react";
import { darken } from "@theme-ui/color";

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
    height: 20px !important;
    width: 20px !important;
    margin-bottom: 1px !important;
    box-shadow: none !important;
    border: none !important;
    vertical-align: middle !important;
  }

  .bmc-button {
    padding: 0 15px 0 10px !important;
    line-height: auto !important;
    height: 31px !important;
    text-decoration: none !important;
    display: inline-flex !important;
    color: #ffffff !important;
    background-color: #de3d42 !important;
    border-radius: 5px !important;
    border: 1px solid transparent !important;
    letter-spacing: -0.08px !important;
    margin: 0 auto !important;
    font-family: "Lato", sans-serif !important;
    -webkit-box-sizing: border-box !important;
    box-sizing: border-box !important;
    align-items: center;
  }

  .bmc-button:hover,
  .bmc-button:active,
  .bmc-button:focus {
    text-decoration: none !important;
    opacity: 0.85 !important;
    color: #ffffff !important;
  }

  .bmc-button {
    span {
      margin-left: 5px;
      font-size: 15px !important;
    }
  }
`;

export default () => <Global styles={dynamicStyles} />;
