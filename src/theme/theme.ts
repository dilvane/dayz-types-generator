import { buttons } from "./buttons";
import { colors } from "./colors";

const focus = {
  transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
  ":focus": {
    borderColor: "primary",
    outline: 0,
    boxShadow: "0 0 0 0.2rem rgba(0,119,204,.25)",
  },
};

const disabled = {
  ":disabled": {
    bg: "gray.6",
    borderColor: "disabled",
    color: "gray.6",
  },
};

const focusError = {
  transition: "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
  ":focus": {
    borderColor: "danger",
    outline: 0,
    boxShadow: "0 0 0 0.2rem rgba(255,0,0,.25)",
  },
};

const zIndices: any = [0, 1, 2];

zIndices.modal = 3;

export default {
  space: [0, 4, 8, 16, 24, 32, 64, 128, 256, 512],
  sizes: {
    container: "700px",
    maxWidth: "1024px",
    navbar: "65px",
    sidebar: "270px",
    footer: "50px",
  },
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol"',
    heading: "inherit",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.75,
  },
  colors,
  borders: [1],
  borderWidths: [1],
  radii: [0, 2, 4, 8],
  breakpoints: ["544px", "768px", "1024px"],
  zIndices,
  text: {
    title: {
      transition: "0.2s",
      m: 0,
      p: 0,
      textAlign: ["center", "left"],
      fontSize: [4, null, 5],
    },
    subtitle: {
      transition: "0.2s",
      m: 0,
      p: 0,
      lineHeight: "18px",
      color: "text",
      textAlign: ["center", "left"],
    },
    ellipsis: {
      maxWidth: "80%",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      textAlign: "center",
    },
  },
  grids: { gap: 4 },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
      color: "text",
    },
    h1: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "1,.2",
      fontWeight: "heading",
      fontSize: 5,
      m: 0,
    },
    h2: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "1,.2",
      fontWeight: "heading",
      fontSize: 4,
      mt: 0,
      mb: 2,
    },
    h3: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "1,.2",
      fontWeight: "heading",
      fontSize: 3,
      mt: 0,
      mb: 2,
    },
    h4: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "1,.2",
      fontWeight: "heading",
      fontSize: 2,
      mt: 0,
      mb: 2,
    },
    h5: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "1,.2",
      fontWeight: "heading",
      fontSize: 1,
      mt: 0,
      mb: 2,
    },
    h6: {
      color: "text",
      fontFamily: "heading",
      lineHeight: "1,.2",
      fontWeight: "heading",
      fontSize: 0,
      mt: 0,
      mb: 2,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      fontSize: 2,
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
      mt: 0,
      mb: 3,
    },
    a: {
      color: "primary",
    },
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      code: {
        color: "inherit",
      },
    },
    code: {
      fontFamily: "monospace",
      fontSize: "inherit",
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
      borderColor: "gray.1",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      th: {
        color: "white",
        fontSize: 1,
        bg: "primary",
        position: "sticky",
        top: "0",
        py: 3,
        px: 2,
        textAlign: "left",
      },
      tr: {
        color: "white",
        border: "none",
        bg: "gray.7",
        ":nth-of-type(even)": {
          bg: "secondary",
        },
        ":hover": {
          bg: "primary",
        },
      },
      td: {
        fontSize: 1,
        py: 3,
        px: 2,
        textAlign: "left",
      },
    },
    img: {
      maxWidth: "100%",
    },
    ul: {
      m: 0,
      py: 0,
      pl: 4,
      li: {
        pb: 3,
      },
    },
    hr: {
      display: "block",
      my: 4,
      border: 0,
      height: "1px",
      backgroundImage:
        "linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0))",
      solid: {
        display: "block",
        my: 4,
        border: 0,
        height: "1px",
        color: "gray.5",
      },
    },
    b: {
      fontWeight: "heading",
    },
    progress: {
      height: 10,
      color: "secondary",
      bg: "muted",
    },
    spinner: {
      color: "red",
    },
  },
  ...buttons,
  forms: {
    input: {
      bg: "white",
      mb: 1,
      px: 2,
      py: 1,
      borderColor: "gray.7",
      error: {
        bg: "white",
        mb: 1,
        px: 2,
        py: 1,
        ...focusError,
        borderColor: "danger",
      },
      ...focus,
      ...disabled,
    },
    textarea: {
      bg: "white",
      mb: 3,
      p: 3,
      borderColor: "gray.7",
      ...focus,
      ...disabled,
    },
    label: {
      fontSize: 1,
      color: "white",
      mb: 1,
      error: { mb: 1, color: "danger", fontWeight: "heading" },
      fontWeight: "heading",
      options: { fontWeight: "body" },
      validation: {
        fontSize: 1,
        position: "absolute",
        top: "calc(100% - 25px)",
        color: "danger",
        m: 0,
      },
      small: {
        fontSize: 1,
        fontWeight: "600",
      },
    },
    select: {
      bg: "white",
      px: 3,
      mb: 2,
      borderColor: "gray.7",
      error: {
        px: 3,
        mb: 2,
        borderColor: "danger",
      },
      ...focus,
      ...disabled,
    },
    radio: {
      ...disabled,
    },
    checkbox: {
      color: "white",
      outline: 0,
      "input:checked ~ &": {
        color: "white",
      },
      "input:focus ~ &": {
        color: "gray.7",
      },
    },
  },
  images: {
    default: {
      maxWidth: 300,
      display: "block",
      mb: 4,
    },
    avatar: {
      width: 48,
      height: 48,
      borderRadius: 99999,
    },
    fileUpload: {
      borderWidth: 2,
      borderStyle: "dashed",
      borderColor: "text",
      borderRadius: 2,
      textAlign: "center",
      alignItems: "center",
      height: ["120px", null, "100px"],
      bg: "muted",
      overflow: "hidden",
      position: "relative",
    },
  },
  alerts: {
    primary: {
      color: "background",
      bg: "primary",
    },
    secondary: {
      color: "muted",
      bg: "secondary",
    },
  },
  tooltip: {
    bg: "black",
  },
  badges: {
    rounded: {
      borderRadius: "50%",
    },
  },
};
