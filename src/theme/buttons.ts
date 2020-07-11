import { lighten, darken } from "@theme-ui/color";

const button = {
  cursor: "pointer",
  backgroundColor: "white",
  boxShadow:
    "rgba(67, 90, 111, 0.14) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset",
  borderWidth: "initial",
  borderStyle: "none",
  borderImage: "initial",
  outline: "none",
  borderColor: "rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186)",
  ":disabled": {
    color: "disabled",
    bg: "muted",
    cursor: "not-allowed",
    backgroundImage: "none",
    ":hover": {
      backgroundImage: "none",
    },
  },
  ":focus": {
    boxShadow:
      "rgba(16, 112, 202, 0.14) 0px 0px 0px 3px, rgba(67, 90, 111, 0.3) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.14) 0px -1px 1px 0px inset",
  },
};

const primary = {
  ...button,
  color: "white",
  backgroundImage: (t) =>
    `linear-gradient(${lighten("primary", 0.1)(t)}, ${lighten(
      "primary",
      0
    )(t)})`,
  ":hover": {
    backgroundImage: (t) =>
      `linear-gradient(${t.colors.primary}, ${t.colors.primary})`,
  },
};

const success = {
  ...button,
  color: "white",
  boxShadow:
    "rgba(67, 90, 111, 0.3) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset;",
  backgroundImage: (t) =>
    `linear-gradient(${lighten("success", 0.1)(t)}, ${lighten(
      "success",
      0
    )(t)})`,
  ":hover": {
    backgroundImage: (t) =>
      `linear-gradient(${t.colors.success}, ${t.colors.success})`,
  },
};

const warning = {
  ...button,
  color: "white",
  boxShadow:
    "rgba(67, 90, 111, 0.3) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset;",
  backgroundImage: (t) =>
    `linear-gradient(${lighten("warning", 0.1)(t)}, ${lighten(
      "warning",
      0
    )(t)})`,
  ":hover": {
    backgroundImage: (t) =>
      `linear-gradient(${t.colors.warning}, ${t.colors.warning})`,
  },
};

const danger = {
  ...button,
  color: "white",
  boxShadow:
    "rgba(67, 90, 111, 0.3) 0px 0px 0px 1px inset, rgba(67, 90, 111, 0.06) 0px -1px 1px 0px inset;",
  backgroundImage: (t) =>
    `linear-gradient(${lighten("danger", 0.1)(t)}, ${lighten("danger", 0)(t)})`,
  ":hover": {
    backgroundImage: (t) =>
      `linear-gradient(${t.colors.danger}, ${t.colors.danger})`,
  },
};

const small = { fontSize: 0, py: 1, px: 2 };
const large = { fontSize: 3, px: 4, py: 2 };
const outline = {
  ...button,
  color: "text",
  backgroundImage: (t) =>
    `linear-gradient(${t.colors.white}, ${darken("white", 0.1)(t)})`,
  ":hover": {
    backgroundImage: (t) =>
      `linear-gradient(${darken("white", 0.05)(t)}, ${darken(
        "white",
        0.1
      )(t)})`,
  },
};

export const buttons = {
  primary: { ...button, ...primary },
  success: { ...success },
  warning: { ...warning },
  danger: { ...danger },
  small: {
    ...primary,
    ...small,
    success: { ...success, ...small },
    warning: { ...warning, ...small },
    danger: { ...danger, ...small },
  },
  outline: {
    ...primary,
    ...outline,
    success: { ...outline, color: "success" },
    warning: { ...outline, color: "warning" },
    danger: { ...outline, color: "danger" },
  },
  large: {
    ...primary,
    ...large,
    success: { ...success, ...large },
    warning: { ...warning, ...large },
    danger: { ...danger, ...large },
  },
};
