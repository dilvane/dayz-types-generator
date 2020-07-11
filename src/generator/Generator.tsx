import { TableUi } from "components";
import { TextField, SelectField, CheckField } from "fields";
import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import { Grid, Flex, Button, Box, Label } from "theme-ui";
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
      <category name="${category ? "1" : "0"}"/>
      ${tag.map((t) => `<tag name="${t.value}"/>`)}
      ${usage.map((u) => `<usage name="${u.value}"/>`)}
      ${value.map((v) => `<usage name="${v.value}"/>`)}
  </type>
`;

const validationSchema = object().shape({
  name: string().required(),
  nominal: number(),
  lifetime: number(),
  restock: number(),
  min: number(),
  quantmin: number(),
  quantmax: number(),
  cost: number(),
  flags: object().shape({
    count_in_cargo: boolean(),
    count_in_hoarder: boolean(),
    count_in_map: boolean(),
    count_in_player: boolean(),
    crafted: boolean(),
    deloot: boolean(),
  }),
  category: object().shape({
    value: string(),
    label: string(),
  }),
  tag: array().of(object().shape({ value: string(), label: string() })),
  usage: array().of(object().shape({ value: string(), label: string() })),
  value: array().of(object().shape({ value: string(), label: string() })),
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
  tag: [{ value: "shelves", label: "Shelves" }],
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

export const Generator = () => {
  const [data, setData] = useState<any>([]);

  const generateCode = () => {
    const types = data.map((i) => templateType(i)).join("");
    // eslint-disable-next-line no-console
    console.log(templateRoot(types));
    return templateRoot(types);
  };

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
            Cell: ({ row }) =>
              row.original.tag.map((tag) => tag.label).join(", "),
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
        ],
      },
    ],
    []
  );

  return (
    <>
      <Grid sx={{ gridArea: "Form", bg: "secondary", overflowY: "auto" }}>
        <Formik
          validateOnMount={false}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            setData([values, ...data]);
          }}>
          {({ isValid }) => {
            return (
              <Form autoComplete="off" noValidate={true}>
                <Flex
                  sx={{
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    px: 4,
                  }}>
                  <fieldset
                    disabled={false}
                    style={{ border: "none", padding: 0 }}>
                    <TextField label="Name" name="name" required />
                    <Flex>
                      <Box pr="2">
                        <TextField
                          label="Nominal"
                          name="nominal"
                          required
                          type="number"
                        />
                      </Box>
                      <Box>
                        <TextField
                          label="Lifetime"
                          name="lifetime"
                          required
                          type="number"
                        />
                      </Box>
                    </Flex>
                    <Flex>
                      <Box pr="2">
                        <TextField
                          label="Restock"
                          name="restock"
                          required
                          type="number"
                        />
                      </Box>
                      <Box>
                        <TextField
                          label="Min"
                          name="min"
                          required
                          type="number"
                        />
                      </Box>
                    </Flex>
                    <Flex>
                      <Box pr="2">
                        <TextField
                          label="Quantmin"
                          name="quantmin"
                          required
                          type="number"
                        />
                      </Box>
                      <Box>
                        <TextField
                          label="Quantmax"
                          name="quantmax"
                          required
                          type="number"
                        />
                      </Box>
                    </Flex>

                    <TextField
                      label="Cost"
                      name="cost"
                      required
                      type="number"
                    />
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
                        <CheckField
                          label="crafted"
                          name="flags.crafted"
                          required
                        />
                        <CheckField
                          label="deloot"
                          name="flags.deloot"
                          required
                        />
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
                      isMulti
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
                  <Button mt={2} variant="primary" type="submit">
                    Add New
                  </Button>
                  <Button
                    mt={4}
                    variant="primary"
                    disabled={data.length === 0}
                    type="button"
                    onClick={generateCode}>
                    Generate Code
                  </Button>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Grid>
      <Grid sx={{ gridArea: "Table", overflowY: "auto" }}>
        <TableUi
          columns={columns}
          data={data}
          clickedRow={true}
          onClick={() => null}
        />
      </Grid>
    </>
  );
};
