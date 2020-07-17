export const templateRoot = (
  content
) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<types>
    ${content}
</types>
`;

// prettier-ignore
export const templateType = ({
  name,
  nominal,
  lifetime,
  restock,
  min,
  quantmin,
  quantmax,
  cost,
  flags,
  category,
  usage,
  tag,
  value,
}) => `
    <type name="${name}">
        <nominal>${nominal}</nominal>
        <lifetime>${lifetime}</lifetime>
        <restock>${restock}</restock>
        <min>${min}</min>
        <quantmin>${quantmin}</quantmin>
        <quantmax>${quantmax}</quantmax>
        <cost>${cost}</cost>
        <flags count_in_cargo="${flags.count_in_cargo ? "1" : "0"}" count_in_hoarder="${flags.count_in_hoarder ? "1" : "0"}" count_in_map="${flags.count_in_map ? "1" : "0"}" count_in_player="${flags.count_in_player ? "1" : "0"}" crafted="${flags.crafted ? "1" : "0"}" deloot="${flags.deloot ? "1" : "0"}" />
        <category name="${category.value}"/>
        <tag name="${tag.value}"/>
        ${usage?.map((u) => `<usage name="${u.value}"/>`)}
        ${value.map((v) => `<usage name="${v.value}"/>`)}
    </type>
`;

// prettier-ignore
export const templateTemporaryType = ({ name, lifetime, flags }) => `
    <type name="${name}">
        <lifetime>${lifetime}</lifetime>
        <flags count_in_cargo="${flags.count_in_cargo ? "1" : "0"}" count_in_hoarder="${flags.count_in_hoarder ? "1" : "0"}" count_in_map="${flags.count_in_map ? "1" : "0"}" count_in_player="${flags.count_in_player ? "1" : "0"}" crafted="${flags.crafted ? "1" : "0"}" deloot="${flags.deloot ? "1" : "0"}" />
    </type>
`;

export const templateSeparator = ({ separator }) => `
<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// ${separator}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
`;

export const templateNameOnly = ({ name }) => `    ${name}
`;

export const exportTypes = (data) => {
  if (data.length === 0) {
    return;
  }
  const types = data
    .map((i) => {
      if (i.temporaryItem) {
        return templateTemporaryType(i);
      }

      if (i.separator) {
        return templateSeparator(i);
      }

      return templateType(i);
    })
    .join("");
  const content = templateRoot(types);
  saveData(content, "types.xml");
};

export const exportOnlyNames = (data) => {
  if (data.length === 0) {
    return;
  }
  const content = data
    .map((i) => {
      if (i.separator) {
        return templateSeparator(i);
      }

      return templateNameOnly(i);
    })
    .join("");

  saveData(content, "names.txt");
};

export const saveData = (content, fileName) => {
  var a: any = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";

  const blob = new Blob([content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const generateId = () => {
  return "#" + Math.random().toString(36).substr(2, 9);
};
