import { TableUi } from "components";
import {
  TypesForm,
  SeparatorForm,
  UploadModal,
  RemoveModal,
  RemoveAllModal,
  EditItemModal,
} from "forms";
import { useLocalStorage } from "hooks";
import React, { useMemo, useState, useEffect } from "react";
import { Grid, Flex, Button, Box, Text, Image } from "theme-ui";

import { generateId, exportOnlyNames, exportTypes } from "./GeneratorUtils";

export const Generator = () => {
  const [store, setStoreData] = useLocalStorage("types", []);
  const [data, setData] = useState<any>(store);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [toDeleteRow, setToDeleteRow] = useState<any>({});
  const [removeAll, setRemoveAll] = useState<any>(false);
  const [upload, setUpload] = useState<any>(false);

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

  const onRemove = () => {
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
            <EditItemModal
              isOpen={selectedRow?.id}
              item={selectedRow}
              title={selectedRow?.name || selectedRow?.separator}
              onCloseModal={onCloseModal}
              form={selectedRow?.separator ? "separatorEdit" : "edit"}
              separatorForm={(item) => (
                <SeparatorForm
                  id="separatorEdit"
                  onSubmit={onSubmitSeparatorEdit(item?.id)}
                  initialValues={item}
                  action={null}
                />
              )}
              typesForm={(item) => (
                <TypesForm
                  id="edit"
                  data={data}
                  onSubmit={onSubmitEdit(item?.id)}
                  initialValues={item}
                  action={null}
                />
              )}
            />

            <RemoveModal
              isOpen={toDeleteRow?.id}
              item={toDeleteRow?.name || toDeleteRow?.separator}
              onCloseModal={onCloseModal}
              onConfirm={onRemove}
            />

            <RemoveAllModal
              isOpen={removeAll}
              onCloseModal={() => setRemoveAll(false)}
              onConfirm={onRemoveAll}
            />

            <UploadModal
              isOpen={upload}
              onCloseModal={onCloseModal}
              onConfirm={() => console.log()}
            />
          </Box>
          <Box>
            <Button
              variant="outline"
              type="button"
              onClick={() => setUpload(true)}
              mr="3">
              <Image src="static/upload.svg" sx={{ width: "20px" }} />
              Upload .xml
            </Button>
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
