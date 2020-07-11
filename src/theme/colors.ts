const gray = [
  "#F5F5F5", //0
  "#DCDCDC", //1
  "#D3D3D3", //2
  "#D8D8D8", //3
  "#C0C0C0", //4
  "#BEBEBE", //5
  "#A9A9A9", //6
  "#808080", //7
];

const colors: any = {
  text: "#37352F",
  background: "#fff",
  primary: "#116AB8",
  secondary: "black",
  muted: "#f6f6f6",
  warning: "#D9822B",
  danger: "#D64540",
  white: "#fff",
  whiteAlpha: [],
  disabled: "#ccc",
  success: "#399D6C",
  gray,
  modes: {
    dark: {
      text: "#fff",
      background: "#000",
      primary: "#07c",
      secondary: "#30c",
      muted: "#f6f6f6",
      warning: "orange",
      danger: "#D64540",
    },
  },
};

colors.gray[700] = colors.gray[7];
colors.whiteAlpha[900] = "white";

export { colors };
