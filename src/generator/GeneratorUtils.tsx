import { validationSchema } from "../forms/TypesForm";

export const templateRoot = (
  content
) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<types>
${content}
</types>`;

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
}) => `    <type name="${name}">
        <nominal>${nominal}</nominal>
        <lifetime>${lifetime}</lifetime>
        <restock>${restock}</restock>
        <min>${min}</min>
        <quantmin>${quantmin}</quantmin>
        <quantmax>${quantmax}</quantmax>
        <cost>${cost}</cost>
        <flags count_in_cargo="${flags.count_in_cargo ? "1" : "0"}" count_in_hoarder="${flags.count_in_hoarder ? "1" : "0"}" count_in_map="${flags.count_in_map ? "1" : "0"}" count_in_player="${flags.count_in_player ? "1" : "0"}" crafted="${flags.crafted ? "1" : "0"}" deloot="${flags.deloot ? "1" : "0"}" />${category ? `\n        <category name="${category.value}"/>`:""}${tag ? `\n        <tag name="${tag.value}"/>` :""}${usage ? usage.map((u) => `\n        <usage name="${u.value}"/>`).join(""): ""}${value ? value.map((v) => `\n        <value name="${v.value}"/>`).join(""): ""}
    </type>
`;

// prettier-ignore
export const templateTemporaryType = ({ name, lifetime, flags }) => `    <type name="${name}">
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

export const loadType = (type, initialValues) => {
  const newType = { ...initialValues };
  newType.name = type.getAttribute("name");

  type.childNodes.forEach((item) => {
    // eslint-disable-next-line no-prototype-builtins
    if (newType.hasOwnProperty(item.nodeName)) {
      if (item.nodeName === "flags") {
        const flags = {
          count_in_cargo: item.getAttribute("count_in_cargo"),
          count_in_hoarder: item.getAttribute("count_in_hoarder"),
          count_in_map: item.getAttribute("count_in_map"),
          count_in_player: item.getAttribute("count_in_player"),
          crafted: item.getAttribute("crafted"),
          deloot: item.getAttribute("deloot"),
        };
        newType.flags = flags;
      } else if (item.nodeName === "tag") {
        newType.tag = {
          value: item.getAttribute("name").toLowerCase(),
          label: item.getAttribute("name"),
        };
      } else if (item.nodeName === "category") {
        newType.category = {
          value: item.getAttribute("name").toLowerCase(),
          label: item.getAttribute("name"),
        };
      } else if (item.nodeName === "usage") {
        newType.usage.push({
          value: item.getAttribute("name").toLowerCase(),
          label: item.getAttribute("name"),
        });
      } else if (item.nodeName === "value") {
        newType.value.push({
          value: item.getAttribute("name").toLowerCase(),
          label: item.getAttribute("name"),
        });
      } else {
        newType[item.nodeName] = item.textContent;
      }
    }
  });

  return newType;
};

export const loadTemporaryType = (type, initialValues) => {
  const newType = { ...initialValues };
  newType.name = type.getAttribute("name");
  newType.temporaryItem = true;

  type.childNodes.forEach((item) => {
    // eslint-disable-next-line no-prototype-builtins
    if (newType.hasOwnProperty(item.nodeName)) {
      if (item.nodeName === "flags") {
        const flags = {
          count_in_cargo: item.getAttribute("count_in_cargo") || 0,
          count_in_hoarder: item.getAttribute("count_in_hoarder") || 0,
          count_in_map: item.getAttribute("count_in_map") || 0,
          count_in_player: item.getAttribute("count_in_player") || 0,
          crafted: item.getAttribute("crafted") || 0,
          deloot: item.getAttribute("deloot") || 0,
        };
        newType.flags = flags;
      } else if (item.nodeName === "lifetime") {
        newType.lifetime = item.textContent;
      }
    }
  });

  return newType;
};

export const isAtemporaryType = (type) => {
  const typeAttribures = [
    "nominal",
    "restock",
    "min",
    "quantmin",
    "quantmax",
    "cost",
    "category",
    "tag",
    "usage",
    "value",
  ];
  const temporaryTypeAttributes = ["lifetime", "flags"];
  return (
    ![...type.childNodes].some((node) =>
      typeAttribures.includes(node.nodeName)
    ) &&
    [...type.childNodes].some((node) =>
      temporaryTypeAttributes.includes(node.nodeName)
    )
  );
};

export const parseType = (type) => {
  const initialValues = {
    name: "",
    nominal: null,
    lifetime: 7200,
    restock: 1800,
    min: null,
    quantmin: null,
    quantmax: null,
    cost: 100,
    flags: {
      count_in_cargo: false,
      count_in_hoarder: false,
      count_in_map: false,
      count_in_player: false,
      crafted: false,
      deloot: false,
    },
    category: null,
    tag: null,
    usage: [],
    value: [],
  };

  let finalType = {};

  if (isAtemporaryType(type)) {
    finalType = loadTemporaryType(type, initialValues);
  } else {
    finalType = loadType(type, initialValues);
  }

  return finalType;
};

export const isAValidType = async (type) => {
  return await validationSchema.isValid(type).then((isValid) => isValid);
};

export const parseSeparator = (separator) => {
  const re = /\w+.[\w\d\s]+\w|\w/g;
  const result = re.exec(separator.nodeValue);
  if (result) {
    return `${result[0]}`.trim();
  }
  return false;
};

export const isDuplicated = (values, data) => {
  return data.find((i) => {
    if (i.separator) return false;
    return i.name.toLowerCase() === values.name.toLowerCase();
  });
};

export const replaceAll = (str, cerca, sostituisci) => {
  return str.split(cerca).join(sostituisci);
};

export const addType = (values, actions, data) => {
  const id = generateId();

  if (isDuplicated(values, data)) {
    actions.setFieldError("name", "This is name already exists.");
    return false;
  }

  if (values.temporaryItem) {
    const { name, temporaryItem, lifetime, flags } = values;
    const result = [
      ...data,
      { id, name: name.trim(), temporaryItem, lifetime, flags },
    ];
    return result;
  } else {
    const result = [...data, { id, ...values, name: values.name.trim() }];
    return result;
  }
};

export const addSeparator = (values, data) => {
  const id = generateId();
  const { separator } = values;
  let finalSeparator = replaceAll(replaceAll(separator, "<", ""), ">", "");
  const result = [
    ...data,
    { id, separator: finalSeparator.trim() || "separator" },
  ];

  return result;
};
