/* eslint-disable no-restricted-globals */

function loadType(type, initialValues) {
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
          value: item.getAttribute("name"),
          label: item.getAttribute("name"),
        };
      } else if (item.nodeName === "category") {
        newType.category = {
          value: item.getAttribute("name"),
          label: item.getAttribute("name"),
        };
      } else if (item.nodeName === "usage") {
        newType.usage.push({
          value: item.getAttribute("name"),
          label: item.getAttribute("name"),
        });
      } else if (item.nodeName === "value") {
        newType.value.push({
          value: item.getAttribute("name"),
          label: item.getAttribute("name"),
        });
      } else {
        newType[item.nodeName] = item.textContent;
      }
    }
  });

  return newType;
}

function loadTemporaryType(type, initialValues) {
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
}

function isAtemporaryType(type) {
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
}

function parseType(type) {
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
}

function generateId() {
  return "#" + Math.random().toString(36).substr(2, 9);
}

// function isAValidType = async (type) => {
//     const isValid = await utils.isValid(type).then((isValid) => isValid);
//     return isValid;
//   };

function isAValidType() {
  return true;
}

function isDuplicated(values, data) {
  return data.find((i) => {
    if (i.separator) return false;
    return i.name.toLowerCase() === values.name.toLowerCase();
  });
}

function onSubmitAdd(values, data) {
  var id = generateId();

  if (isDuplicated(values, data)) {
    // actions.setFieldError("name", "This is name already exists.");
    return false;
  }

  if (values.temporaryItem) {
    const { name, temporaryItem, lifetime, flags } = values;
    const result = [...data, { id, name, temporaryItem, lifetime, flags }];
    return result;
  } else {
    const result = [...data, { id, ...values }];
    return result;
  }
}

function replaceAll(str, cerca, sostituisci) {
  return str.split(cerca).join(sostituisci);
}

function onSubmitSeparatorAdd(values, data) {
  const id = generateId();
  const { separator } = values;
  let finalSeparator = replaceAll(replaceAll(separator, "<", ""), ">", "");
  const result = [...data, { id, separator: finalSeparator || "separator" }];

  return result;
}

function parseSeparator(separator) {
  const re = /\w+.[\w\d\s]|\w/g;
  const result = re.exec(separator.nodeValue);
  if (result) {
    return result[0];
  }
  return false;
}

self.addEventListener("message", ({ data }) => {
  const { xmlDoc, currentTyes } = data;
  const types = xmlDoc.getElementsByTagName("types");
  const report = {
    valid: 0,
    invalid: 0,
    duplicated: 0,
    separator: 0,
  };

  const actions = {
    setFieldError: () => {
      report.duplicated += 1;
    },
  };

  let newTypes = currentTyes;

  types[0].childNodes.forEach((element) => {
    if (element.nodeName === "type") {
      const type = parseType(element);
      if (isAValidType(type)) {
        const result = onSubmitAdd(type, actions, newTypes);
        if (result) {
          newTypes = result;
          report.valid += 1;
        }
      } else {
        report.invalid += 1;
      }
    }
    if (element.nodeName === "#comment") {
      const separator = parseSeparator(element);
      const result = onSubmitSeparatorAdd({ separator }, newTypes);
      newTypes = result;
      report.separator += 1;
    }
  });

  console.log(newTypes);
});

self.postMessage("from Worker");
