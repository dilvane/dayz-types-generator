import { TableUi } from "components";
import {
  TypesForm,
  SeparatorForm,
  UploadModal,
  RemoveModal,
  RemoveAllModal,
  EditItemModal,
} from "forms";
import { ReportModal } from "forms/UploadForm";
import { useLocalStorage } from "hooks";
import React, { useMemo, useState, useEffect } from "react";
import { Grid, Flex, Button, Box, Text, Image } from "theme-ui";

import {
  parseType,
  isAValidType,
  generateId,
  isDuplicated,
  parseSeparator,
  replaceAll,
  addSeparator,
  addType,
  exportOnlyNames,
  exportTypes,
} from "./GeneratorUtils";

const listRef: any = React.createRef();

export const Generator = () => {
  const [store, setStoreData] = useLocalStorage("types", []);
  const [data, setData] = useState<any>(store);
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [toDeleteRow, setToDeleteRow] = useState<any>({});
  const [removeAll, setRemoveAll] = useState<any>(false);
  const [upload, setUpload] = useState<any>(false);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState<any>(false);

  const columns = useMemo(
    () => [
      {
        Header: null,
        id: "types",
        columns: [
          {
            Header: "Name",
            accessor: "name",
            Cell: ({ row }) => {
              return (
                <Text
                  sx={{
                    maxWidth: "400px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}>
                  {row.original.name}
                </Text>
              );
            },
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
  }, [setStoreData, data]);

  const gotoLastItem = () => {
    listRef.current.scrollToItem(data.length);
  };

  const onSubmitAdd = (values, actions, data) => {
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
      setData(result);
      gotoLastItem();
      return result;
    } else {
      const { name } = values;
      const result = [...data, { id, ...values, name: name.trim() }];
      setData(result);
      gotoLastItem();
      return result;
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
          return { id, name: name.trim(), temporaryItem, lifetime, flags };
        } else {
          const { name } = values;
          return { id, ...values, name: name.trim() };
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
    setUpload(null);
    setReport(null);
  };

  const onRemove = () => {
    const items = data.filter((item) => item.id !== toDeleteRow.id);
    setData(items);
    setSelectedRow(null);
    setToDeleteRow(null);
  };

  const onSubmitSeparatorAdd = (values) => {
    const id = generateId();
    const { separator } = values;
    let finalSeparator = replaceAll(replaceAll(separator, "<", ""), ">", "");
    const result = [
      ...data,
      { id, separator: finalSeparator.trim() || "separator" },
    ];
    setData(result);
    gotoLastItem();
    return result;
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
          separator: finalSeparator.trim() || "separator",
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

  const onImportFile = (values) => {
    //onCloseModal();
    const { file } = values;
    setLoading(true);
    setTimeout(() => importFile(file), 1000);
  };

  const importFile = async (file) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(file.content, "text/xml");

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

    let newTypes = data;

    for (const element of types[0].childNodes) {
      if (element.nodeName === "type") {
        const type = parseType(element);

        if (await isAValidType(type)) {
          const result = addType(type, actions, newTypes);
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
        const result = addSeparator({ separator }, newTypes);
        newTypes = result;
        report.separator += 1;
      }
    }

    //setUpload(null);
    setReport(report);
    setData(newTypes);
    setLoading(false);
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
            <Button mt={2} mb={1} variant="primary" type="submit">
              Add Separator
            </Button>
          }
        />
      </Grid>
      <Grid
        sx={{ gridArea: "Table", overflowY: "auto", bg: "primary" }}
        id="content">
        <TableUi
          listRef={listRef}
          columns={columns}
          data={data}
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
                  key={item.id}
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
              onConfirm={onImportFile}
              loading={loading}
            />

            <ReportModal
              isOpen={report}
              item={report}
              onCloseModal={onCloseModal}
            />
          </Box>
          <Box>
            <Button
              variant="outline"
              type="button"
              onClick={() => setUpload(true)}
              mr="3">
              <Flex sx={{ alignItems: "center" }}>
                <Image
                  src="/static/upload.svg"
                  sx={{ height: "15px", mr: 2 }}
                />
                <Text>Upload .xml</Text>
              </Flex>
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
