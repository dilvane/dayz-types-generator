import { TableUi } from "components";
import { TextField, SelectField, CheckField } from "fields";
import { Form, Formik } from "formik";
import { useLocalStorage } from "hooks";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "Modal";
import React, { useMemo, useState, useEffect } from "react";
import { Grid, Flex, Button, Box, Label, Text } from "theme-ui";
import { object, string, number, array, boolean } from "yup";

const templateRoot = (
  content
) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<types>
    ${content}
</types>
`;

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
      <flags 
        count_in_cargo="${flags.count_in_cargo ? "1" : "0"}" 
        count_in_hoarder="${flags.count_in_hoarder ? "1" : "0"}" 
        count_in_map="${flags.count_in_map ? "1" : "0"}" 
        count_in_player="${flags.count_in_player ? "1" : "0"}" 
        crafted="${flags.crafted ? "1" : "0"}" 
        deloot="${flags.deloot ? "1" : "0"}" />
      <category name="${category.value}"/>
      <tag name="${tag.value}"/>
      ${usage.map((u) => `<usage name="${u.value}"/>`)}
      ${value.map((v) => `<usage name="${v.value}"/>`)}
  </type>
`;

const validationSchema = object().shape({
  name: string().required(),
  nominal: number().required(),
  lifetime: number().required(),
  restock: number().required(),
  min: number().required(),
  quantmin: number().required(),
  quantmax: number().required(),
  cost: number().required(),
  flags: object().shape({
    count_in_cargo: boolean(),
    count_in_hoarder: boolean(),
    count_in_map: boolean(),
    count_in_player: boolean(),
    crafted: boolean(),
    deloot: boolean(),
  }),
  category: object().shape({
    value: string().required(),
    label: string().required(),
  }),
  tag: object()
    .shape({ value: string().required(), label: string().required() })
    .required(),
  usage: array()
    .of(
      object().shape({ value: string().required(), label: string().required() })
    )
    .required(),
  value: array()
    .of(
      object().shape({ value: string().required(), label: string().required() })
    )
    .required(),
});
const initialValues: any = {
  name: "",
  nominal: 40,
  lifetime: 3600,
  restock: 1800,
  min: 10,
  quantmin: -1,
  quantmax: -1,
  cost: 100,
  flags: {
    count_in_cargo: false,
    count_in_hoarder: false,
    count_in_map: false,
    count_in_player: false,
    crafted: false,
    deloot: false,
  },
  category: { value: "clothes", label: "Clothes" },
  tag: { value: "shelves", label: "Shelves" },
  usage: [{ value: "Coast", label: "Coast" }],
  value: [{ value: "Tier1", label: "Tier1" }],
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

const values = [
  { value: "Tier1", label: "Tier1" },
  { value: "Tier2", label: "Tier2" },
  { value: "Tier3", label: "Tier3" },
  { value: "Tier4", label: "Tier4" },
];

const exportTypes = (data) => {
  const types = data.map((i) => templateType(i)).join("");
  const content = templateRoot(types);
  saveData(content, "types.xml");
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

const TypesForm = ({ onSubmit, action, initialValues, id }) => (
  <Formik
    validateOnMount={false}
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}>
    {({ isValid }) => {
      return (
        <Form autoComplete="off" noValidate={true} id={id}>
          <Flex
            sx={{
              flexDirection: "column",
              justifyContent: "flex-end",
              px: 4,
            }}>
            <fieldset disabled={false} style={{ border: "none", padding: 0 }}>
              <TextField label="Name" name="name" required />
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Nominal"
                    name="nominal"
                    required
                    type="number"
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Lifetime"
                    name="lifetime"
                    required
                    type="number"
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
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField label="Min" name="min" required type="number" />
                </Box>
              </Flex>
              <Flex>
                <Box sx={{ width: "100%", pr: "2" }}>
                  <TextField
                    label="Quantmin"
                    name="quantmin"
                    required
                    type="number"
                  />
                </Box>
                <Box sx={{ width: "100%" }}>
                  <TextField
                    label="Quantmax"
                    name="quantmax"
                    required
                    type="number"
                  />
                </Box>
              </Flex>

              <TextField label="Cost" name="cost" required type="number" />
              <Flex sx={{ flexDirection: "column" }}>
                <Label>Flags</Label>
                <Flex>
                  <CheckField
                    label="count_in_cargo"
                    name="flags.count_in_cargo"
                    required
                  />
                  <CheckField
                    label="count_in_hoarder"
                    name="flags.count_in_hoarder"
                    required
                  />
                </Flex>
                <Flex>
                  <CheckField
                    label="count_in_map"
                    name="flags.count_in_map"
                    required
                  />
                  <CheckField
                    label="count_in_player"
                    name="flags.count_in_player"
                    required
                  />
                </Flex>
                <Flex>
                  <CheckField label="crafted" name="flags.crafted" required />
                  <CheckField label="deloot" name="flags.deloot" required />
                </Flex>
              </Flex>
              <SelectField
                placeholder=""
                label="Category"
                name="category"
                required
                options={categories}
              />
              <SelectField
                placeholder=""
                label="Tag"
                name="tag"
                required
                options={tags}
              />
              <SelectField
                placeholder=""
                label="Usage"
                name="usage"
                required
                options={usages}
                isMulti
              />
              <SelectField
                placeholder=""
                label="Value"
                name="value"
                required
                options={values}
                isMulti
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
          },
          {
            Header: "Lifetime",
            accessor: "lifetime",
          },
          {
            Header: "Restock",
            accessor: "restock",
          },
          {
            Header: "Min",
            accessor: "min",
          },
          {
            Header: "Quantmin",
            accessor: "quantmin",
          },
          {
            Header: "Quantmax",
            accessor: "quantmax",
          },
          {
            Header: "Cost",
            accessor: "cost",
          },
          {
            Header: "Flags",
            accessor: "flags",
            Cell: ({ row }) =>
              [
                row.original.flags.count_in_cargo && "count_in_cargo",
                row.original.flags.count_in_hoarder && "count_in_hoarder",
                row.original.flags.count_in_map && "count_in_map",
                row.original.flags.count_in_player && "count_in_player",
                row.original.flags.crafted && "crafted",
                row.original.flags.deloot && "deloot",
              ]
                .filter((i) => i)
                .join(", "),
          },
          {
            Header: "Tag",
            accessor: "tag",
            Cell: ({ row }) => row.original.tag.label,
          },
          {
            Header: "Category",
            accessor: "category",
            Cell: ({ row }) => row.original.category.label,
          },
          {
            Header: "Usage",
            accessor: "usage",
            Cell: ({ row }) =>
              row.original.usage.map((usage) => usage.label).join(", "),
          },
          {
            Header: "Value",
            accessor: "value",
            Cell: ({ row }) =>
              row.original.value.map((value) => value.label).join(", "),
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
                  onClick={() => setToDeleteRow(row.original)}>
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
  }, [setStoreData, data]);

  const onSubmitAdd = (values) => {
    const id = generateId();
    setData([{ id, ...values }, ...data]);
  };

  const onSubmitEdit = (id) => (values) => {
    const items = data.map((item) => {
      if (item.id === id) {
        return { id, ...values };
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

  const onRemove = () => {
    const items = data.filter((item) => item.id !== toDeleteRow.id);
    setData(items);
    setSelectedRow(null);
    setToDeleteRow(null);
  };

  return (
    <>
      <Grid sx={{ gridArea: "Form", bg: "secondary", overflowY: "auto" }}>
        <TypesForm
          id="add"
          onSubmit={onSubmitAdd}
          initialValues={initialValues}
          action={
            <Button mt={2} variant="primary" type="submit">
              Add New
            </Button>
          }
        />
      </Grid>
      <Grid sx={{ gridArea: "Table", overflowY: "auto" }}>
        <TableUi
          columns={columns}
          data={data}
          clickedRow={true}
          onClick={() => null}
        />
      </Grid>
      <Grid
        sx={{ gridArea: "TableActions", py: 2, pl: 2, pr: 6, bg: "gray.2" }}>
        <Flex sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text>
            <b>Total Types</b>: {data.length}
          </Text>
          <Box>
            <Modal isOpen={selectedRow?.id} onRequestClose={onCloseModal}>
              <ModalHeader
                title={`Edit ${selectedRow?.name}`}
                onRequestClose={onCloseModal}
              />
              <ModalBody>
                <TypesForm
                  id="edit"
                  onSubmit={onSubmitEdit(selectedRow?.id)}
                  initialValues={selectedRow}
                  action={null}
                />
              </ModalBody>
              <ModalFooter>
                <Button mt={2} variant="primary" type="submit" form="edit">
                  Update
                </Button>
              </ModalFooter>
            </Modal>
            <Modal isOpen={toDeleteRow?.id} onRequestClose={onCloseModal}>
              <ModalHeader
                title={`Remove ${toDeleteRow?.name}?`}
                onRequestClose={onCloseModal}
              />

              <ModalFooter>
                <Button mt={2} variant="danger" onClick={onRemove}>
                  Remove
                </Button>
              </ModalFooter>
            </Modal>
          </Box>
          <Button
            variant="primary"
            type="button"
            onClick={() => exportTypes(data)}>
            Export Types
          </Button>
        </Flex>
      </Grid>
    </>
  );
};
