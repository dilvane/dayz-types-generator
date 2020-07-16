import { TableUi } from "components";
import { TextField, SelectField, CheckField, TextAreaField } from "fields";
import { Form, Formik } from "formik";
import { useLocalStorage } from "hooks";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "Modal";
import React, { useMemo, useState, useEffect } from "react";
import ReactTooltip from "react-tooltip";
import { Grid, Flex, Button, Box, Label, Text, Image } from "theme-ui";
import * as Yup from "yup";
const { object, string, number, array, boolean, mixed } = Yup;

const templateRoot = (
  content
) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<types>
    ${content}
</types>
`;

// prettier-ignore
const templateType = ({
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
        ${usage.map((u) => `<usage name="${u.value}"/>`)}
        ${value.map((v) => `<usage name="${v.value}"/>`)}
    </type>
`;

// prettier-ignore
const templateTemporaryType = ({ name, lifetime, flags }) => `
    <type name="${name}">
        <lifetime>${lifetime}</lifetime>
        <flags count_in_cargo="${flags.count_in_cargo ? "1" : "0"}" count_in_hoarder="${flags.count_in_hoarder ? "1" : "0"}" count_in_map="${flags.count_in_map ? "1" : "0"}" count_in_player="${flags.count_in_player ? "1" : "0"}" crafted="${flags.crafted ? "1" : "0"}" deloot="${flags.deloot ? "1" : "0"}" />
    </type>
`;

const templateSeparator = ({ separator }) => `
<!--///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////// ${separator}
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////-->
`;

const templateNameOnly = ({ name }) => `    ${name}
`;

const defaultShape = object().shape({
  value: string().required(),
  label: string().required(),
});

const validationSchema = object().shape({
  temporaryItem: boolean(),
  name: string().required(),
  nominal: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: number().required(),
  }),
  lifetime: number().required(),
  restock: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: number().required(),
  }),
  min: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: number().required(),
  }),
  quantmin: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: number().required(),
  }),
  quantmax: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: number().required(),
  }),
  cost: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: number().required(),
  }),
  flags: object().shape({
    count_in_cargo: boolean(),
    count_in_hoarder: boolean(),
    count_in_map: boolean(),
    count_in_player: boolean(),
    crafted: boolean(),
    deloot: boolean(),
  }),
  category: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: defaultShape.required(),
  }),
  tag: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: defaultShape.required(),
  }),
  usage: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: array().of(defaultShape).nullable(),
  }),
  value: mixed().when("temporaryItem", {
    is: true,
    then: string().nullable(),
    otherwise: array().of(defaultShape).required(),
  }),
});

const validationSeparatorSchema = object().shape({
  separator: string().required(),
});

const initialValues: any = {
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

const initialSeparatorValues = {
  separator: "",
};

const categories = [
  { value: "clothes", label: "Clothes" },
  { value: "containers", label: "Containers" },
  { value: "explosives", label: "Explosives" },
  { value: "food", label: "Food" },
  { value: "tools", label: "Tools" },
  { value: "weapons", label: "Weapons" },
  { value: "vehiclesparts", label: "Vehiclesparts" },
];

const tags = [
  { value: "shelves", label: "Shelves" },
  { value: "floor", label: "Floor" },
];

const usages = [
  { value: "Coast", label: "Coast" },
  { value: "Farm", label: "Farm" },
  { value: "Firefighter", label: "Firefighter" },
  { value: "Hunting", label: "Hunting" },
  { value: "Industrial", label: "Industrial" },
  { value: "Medic", label: "Medic" },
  { value: "Military", label: "Military" },
  { value: "Office", label: "Office" },
  { value: "Police", label: "Police" },
  { value: "Prison", label: "Prison" },
  { value: "School", label: "School" },
  { value: "Town", label: "Town" },
  { value: "Village", label: "Village" },
];

const valuesItems = [
  { value: "Tier1", label: "Tier1" },
  { value: "Tier2", label: "Tier2" },
  { value: "Tier3", label: "Tier3" },
  { value: "Tier4", label: "Tier4" },
];

const exportTypes = (data) => {
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

const exportOnlyNames = (data) => {
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

const saveData = (content, fileName) => {
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

const generateId = () => {
  return "#" + Math.random().toString(36).substr(2, 9);
};

const TypesForm = ({ onSubmit, action, initialValues, id, data }) => (
  <Formik
    validateOnMount={false}
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={(values, actions) => onSubmit(values, actions, data)}>
    {({ values, errors }) => {
      return (
        <Form autoComplete="off" noValidate={true} id={id}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "flex-end",
              px: 4,
            }}>
            <fieldset disabled={false} style={{ border: "none", padding: 0 }}>
              <ReactTooltip
                id="tooltip"
                delayHide={500}
                textColor="white"
                backgroundColor="black"
                effect="solid"
                border
                className="tooltip"
                html={true}
              />

              <TextField
                label="Name"
                name="name"
                required
                tooltip={() => (
                  <Image
                    src="static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Class Name of Item to Spawn."
                  />
                )}
              />

              <Text color="white" mb={2}>
                {errors.name}
              </Text>
              <Flex>
                <CheckField
                  label="Is a temporary item?"
                  name="temporaryItem"
                  required
                />
              </Flex>
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Nominal"
                    name="nominal"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Number of items spawned in the world at any given time. (Ideal Value) Must be more or equal to min value
                        • Be Carefull changing this number. Too many will bring your server to its knees."
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Lifetime"
                    name="lifetime"
                    required
                    type="number"
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Time (In Seconds) before this type of items gets deleted in the world (If no players interact with it)
                        lifetime 604800 (seven days), 3888000 (45 days)."
                      />
                    )}
                  />
                </Box>
              </Flex>
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Restock"
                    name="restock"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="If Value=0, Respawn item type in bulk to reach Nominal Value, If !=0, then Value=Time in seconds to respawn 1 additional item type, until Nominal Value is reached."
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Min"
                    name="min"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Minimum number of items of this type in world, Once number falls below minimum, the Restock process begins. (must be less or equal to nominal value)."
                      />
                    )}
                  />
                </Box>
              </Flex>
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Quantmin"
                    name="quantmin"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Minimum % Value for quantity (Rags #, Mag Ammo Value, Ammo Counts), Use -1 if Not Applicable. (less or equal to quantmax value)."
                      />
                    )}
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Quantmax"
                    name="quantmax"
                    required
                    type="number"
                    disabled={values.temporaryItem}
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Maximum % Value for quantity (Rags #, Mag Ammo Value, Ammo Counts), Use -1 if Not Applicable. (more or equal to quantmin value)."
                      />
                    )}
                  />
                </Box>
              </Flex>

              <TextField
                label="Cost"
                name="cost"
                required
                type="number"
                disabled={values.temporaryItem}
                tooltip={() => (
                  <Image
                    src="static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Priority of Item Spawning in CE queue (100 is default)."
                  />
                )}
              />
              <Flex sx={{ flexDirection: "column" }}>
                <Label>
                  Flags{" "}
                  <Image
                    src="static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Flags directs the spawner, in what case is must take min and nominal values in to consideration for every item counting for spawning:"
                  />
                </Label>
                <Flex>
                  <CheckField
                    label="count_in_cargo"
                    name="flags.count_in_cargo"
                    required
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Count items stored in containers as part of Nominal Value (0=False, 1=True)."
                      />
                    )}
                  />
                  <CheckField
                    label="count_in_hoarder"
                    name="flags.count_in_hoarder"
                    required
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Tents, barrels, undeground stashes (0=False, 1=True)."
                      />
                    )}
                  />
                </Flex>
                <Flex>
                  <CheckField
                    label="count_in_map"
                    name="flags.count_in_map"
                    required
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Count items in map as part of Nominal Value (0=False, 1=True)."
                      />
                    )}
                  />
                  <CheckField
                    label="count_in_player"
                    name="flags.count_in_player"
                    required
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Count items stored in Player Inventory as part of Nominal Value (0=False, 1=True)."
                      />
                    )}
                  />
                </Flex>
                <Flex>
                  <CheckField
                    label="crafted"
                    name="flags.crafted"
                    required
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Is the item a crafted item (0=False, 1=True)."
                      />
                    )}
                  />
                  <CheckField
                    label="deloot"
                    name="flags.deloot"
                    required
                    tooltip={() => (
                      <Image
                        src="static/info.svg"
                        sx={{ ml: 2, width: "15px" }}
                        data-for="tooltip"
                        data-tip="Dynamic event loot objects - helicrashes in majority of cases only by default."
                      />
                    )}
                  />
                </Flex>
              </Flex>
              <SelectField
                placeholder=""
                label="Category"
                name="category"
                required
                options={categories}
                isDisabled={values.temporaryItem}
                tooltip={() => (
                  <Image
                    src="static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Useful for sorting, Internal Category."
                  />
                )}
              />
              <SelectField
                placeholder=""
                label="Tag"
                name="tag"
                options={tags}
                isDisabled={values.temporaryItem}
                tooltip={() => (
                  <Image
                    src="static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="MUST be AFTER the category."
                  />
                )}
              />
              <SelectField
                placeholder=""
                label="Usage"
                name="usage"
                options={usages}
                isDisabled={values.temporaryItem}
                isMulti
                tooltip={() => (
                  <Image
                    src="static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-tip="Internal Category used in the mpmissions\dayzOffline.chernarusplus\cfgRandomPresets.xml file."
                  />
                )}
              />
              <SelectField
                placeholder=""
                label="Value"
                name="value"
                required
                options={valuesItems}
                isDisabled={values.temporaryItem}
                isMulti
                tooltip={() => (
                  <Image
                    src="static/info.svg"
                    sx={{ ml: 2, width: "15px" }}
                    data-for="tooltip"
                    data-html={true}
                    data-tip="Used to specify Central Loot Economy Spawning Locations ( More info here: Loot Locations: https://dayz.gamepedia.com/Central_Loot_Economy)."
                  />
                )}
              />
            </fieldset>
            {action}
          </Flex>
        </Form>
      );
    }}
  </Formik>
);

const SeparatorForm = ({ onSubmit, action, initialValues, id }) => (
  <Formik
    validateOnMount={false}
    initialValues={initialValues}
    validationSchema={validationSeparatorSchema}
    onSubmit={onSubmit}>
    {({ values, isValid }) => {
      return (
        <Form autoComplete="off" noValidate={true} id={id}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "flex-end",
              px: 4,
            }}>
            <fieldset disabled={false} style={{ border: "none", padding: 0 }}>
              <TextAreaField
                label="Separator"
                name="separator"
                required
                rows={4}
              />
            </fieldset>
            {action}
          </Flex>
        </Form>
      );
    }}
  </Formik>
);

export const Generator = () => {
  const [store, setStoreData] = useLocalStorage("types", []);
  const [data, setData] = useState<any>(store);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [toDeleteRow, setToDeleteRow] = useState<any>({});
  const [removeAll, setRemoveAll] = useState<any>(false);

  const columns = useMemo(
    () => [
      {
        Header: null,
        id: "types",
        columns: [
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Nominal",
            accessor: "nominal",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.nominal || "",
          },
          {
            Header: "Lifetime",
            accessor: "lifetime",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.lifetime || "",
          },
          {
            Header: "Restock",
            accessor: "restock",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.restock || "",
          },
          {
            Header: "Min",
            accessor: "min",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.min || "",
          },
          {
            Header: "Quantmin",
            accessor: "quantmin",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.quantmin || "",
          },
          {
            Header: "Quantmax",
            accessor: "quantmax",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.quantmax || "",
          },
          {
            Header: "Cost",
            accessor: "cost",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.cost || "",
          },
          {
            Header: "Flags",
            accessor: "flags",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : [
                    row.original.flags.count_in_cargo && "count_in_cargo",
                    row.original.flags.count_in_hoarder && "count_in_hoarder",
                    row.original.flags.count_in_map && "count_in_map",
                    row.original.flags.count_in_player && "count_in_player",
                    row.original.flags.crafted && "crafted",
                    row.original.flags.deloot && "deloot",
                  ]
                    .filter((i) => i)
                    .join(", ") || "",
          },
          {
            Header: "Tag",
            accessor: "tag",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.tag?.label || "",
          },
          {
            Header: "Category",
            accessor: "category",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.category?.label || "",
          },
          {
            Header: "Usage",
            accessor: "usage",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.usage?.map((usage) => usage.label).join(", ") ||
                  "",
          },
          {
            Header: "Value",
            accessor: "value",
            Cell: ({ row }) =>
              row.original.separator
                ? row.original.separator
                : row.original.value?.map((value) => value.label).join(", ") ||
                  "",
          },
          {
            Header: "",
            id: "actions",
            Cell: ({ row }) => (
              <Flex>
                <Button
                  type="button"
                  mr={2}
                  variant="small"
                  onClick={() => setSelectedRow(row.original)}>
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="small.danger"
                  onClick={(event) => {
                    event.stopPropagation();
                    setToDeleteRow(row.original);
                  }}>
                  Remove
                </Button>
              </Flex>
            ),
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    setStoreData(data);
    const content: any = document.getElementById("content");
    content.scrollTop = content.scrollHeight;
  }, [setStoreData, data]);

  const onSubmitAdd = (values, actions, data) => {
    const id = generateId();

    if (
      data.find((i) => {
        if (i.separator) return false;
        return i.name.toLowerCase() === values.name.toLowerCase();
      })
    ) {
      actions.setFieldError("name", "This is name already exists.");
      return;
    }

    if (values.temporaryItem) {
      const { name, temporaryItem, lifetime, flags } = values;
      setData([...data, { id, name, temporaryItem, lifetime, flags }]);
    } else {
      setData([...data, { id, ...values }]);
    }
  };

  const onSubmitEdit = (id) => (values, actions, data) => {
    if (
      data.find((i) => {
        if (i.separator) return false;
        return (
          i.id !== id && i.name.toLowerCase() === values.name.toLowerCase()
        );
      })
    ) {
      actions.setFieldError("name", "This is name already exists.");
      return;
    }

    const items = data.map((item) => {
      if (item.id === id) {
        if (values.temporaryItem) {
          const { name, temporaryItem, lifetime, flags } = values;
          return { id, name, temporaryItem, lifetime, flags };
        } else {
          return { id, ...values };
        }
      }

      return item;
    });
    setData(items);
    setSelectedRow(null);
  };

  const onCloseModal = () => {
    setSelectedRow(null);
    setToDeleteRow(null);
  };

  const onRemove = (event) => {
    const items = data.filter((item) => item.id !== toDeleteRow.id);
    setData(items);
    setSelectedRow(null);
    setToDeleteRow(null);
  };

  const replaceAll = (str, cerca, sostituisci) => {
    return str.split(cerca).join(sostituisci);
  };

  const onSubmitSeparatorAdd = (values) => {
    const id = generateId();
    const { separator } = values;
    let finalSeparator = replaceAll(replaceAll(separator, "<", ""), ">", "");
    setData([...data, { id, separator: finalSeparator || "separator" }]);
  };

  const onSubmitSeparatorEdit = (id) => (values) => {
    const items = data.map((item) => {
      if (item.id === id) {
        const { separator } = values;
        let finalSeparator = replaceAll(
          replaceAll(separator, "<", ""),
          ">",
          ""
        );
        return {
          id,
          separator: finalSeparator || "separator",
        };
      }

      return item;
    });
    setData(items);
    setSelectedRow(null);
  };

  const onRemoveAll = () => {
    setData([]);
    setRemoveAll(false);
  };

  return (
    <>
      <Grid
        sx={{
          gridArea: "Form",
          bg: "primary",
          overflowY: "auto",
          borderRight: "2px solid",
          borderColor: "gray.7",
        }}>
        <TypesForm
          id="add"
          onSubmit={onSubmitAdd}
          initialValues={initialValues}
          data={data}
          action={
            <Button mt={2} variant="primary" type="submit">
              Add New
            </Button>
          }
        />

        <SeparatorForm
          id="separator"
          onSubmit={onSubmitSeparatorAdd}
          initialValues={initialSeparatorValues}
          action={
            <Button mt={2} mb={3} variant="primary" type="submit">
              Add Separator
            </Button>
          }
        />
      </Grid>
      <Grid
        sx={{ gridArea: "Table", overflowY: "auto", bg: "primary" }}
        id="content">
        <TableUi
          columns={columns}
          data={data}
          clickedRow={true}
          onClick={(row) => setSelectedRow(row)}
        />
      </Grid>
      <Grid
        sx={{
          gridArea: "TableActions",
          py: 2,
          px: 3,
          bg: "primary",
          color: "white",
        }}>
        <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text>
            <b>Total Types</b>: {data.filter((i) => !i.separator).length}
          </Text>
          <Box>
            <Modal isOpen={selectedRow?.id} onRequestClose={onCloseModal}>
              <ModalHeader
                title={`Edit ${selectedRow?.name || selectedRow?.separator}`}
                onRequestClose={onCloseModal}
              />
              <ModalBody>
                {selectedRow?.separator && (
                  <SeparatorForm
                    id="separatorEdit"
                    onSubmit={onSubmitSeparatorEdit(selectedRow?.id)}
                    initialValues={selectedRow}
                    action={null}
                  />
                )}

                {selectedRow && !selectedRow.separator && (
                  <TypesForm
                    id="edit"
                    data={data}
                    onSubmit={onSubmitEdit(selectedRow?.id)}
                    initialValues={selectedRow}
                    action={null}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  mt={2}
                  variant="primary"
                  type="submit"
                  form={selectedRow?.separator ? "separatorEdit" : "edit"}>
                  Update
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={toDeleteRow?.id} onRequestClose={onCloseModal}>
              <ModalHeader
                title={`Remove ${toDeleteRow?.name || toDeleteRow?.separator}?`}
                onRequestClose={onCloseModal}
              />

              <ModalFooter>
                <Button mt={2} variant="danger" onClick={onRemove}>
                  Remove
                </Button>
              </ModalFooter>
            </Modal>
            <Modal
              isOpen={removeAll}
              onRequestClose={() => setRemoveAll(false)}>
              <ModalHeader
                title={`Remove All Items?`}
                onRequestClose={() => setRemoveAll(false)}
              />

              <ModalFooter>
                <Button mt={2} variant="danger" onClick={onRemoveAll}>
                  Remove
                </Button>
              </ModalFooter>
            </Modal>
          </Box>
          <Box>
            <Button
              variant="danger"
              type="button"
              onClick={() => setRemoveAll(true)}
              mr="3">
              Remove All
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => exportOnlyNames(data)}
              mr="3">
              Export Only Names
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => exportTypes(data)}>
              Export Types
            </Button>
          </Box>
        </Flex>
      </Grid>
    </>
  );
};
