/* eslint-disable no-restricted-globals */
import {
  parseType,
  isAValidType,
  generateId,
  isDuplicated,
  parseSeparator,
  replaceAll,
} from "./src/generator/GeneratorUtils";

const onSubmitAdd = (values, actions, data) => {
  const id = generateId();

  if (isDuplicated(values, data)) {
    actions.setFieldError("name", "This is name already exists.");
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
};

const onSubmitSeparatorAdd = (values, data) => {
  const id = generateId();
  const { separator } = values;
  let finalSeparator = replaceAll(replaceAll(separator, "<", ""), ">", "");
  const result = [...data, { id, separator: finalSeparator || "separator" }];

  return result;
};

self.addEventListener("message", ({ data }) => {
  const { fileContent, currentTyes } = data;
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(fileContent, "text/xml");
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
