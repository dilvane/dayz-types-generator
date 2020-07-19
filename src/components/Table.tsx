import React from "react";
import { useTable } from "react-table";
import { VariableSizeList as List } from "react-window";
import { Box, Flex } from "theme-ui";

export const Table = (props) => (
  <Box variant="styles.table" {...props} as="table" />
);

const getCellWidth = (index) => {
  const sx: any = {};

  if (index === 0) {
    sx.flex = "1 0 auto";
  } else {
    sx.flex = "0 0 84px";
  }

  if (index === 4) {
    sx.flex = "0 0 40px";
  }

  if (index === 7) {
    sx.flex = "0 0 50px";
  }

  if (index === 8) {
    sx.flex = "0 0 120px";
  }

  if (index === 12) {
    sx.flex = "0 0 70px";
  }

  if (index === 13) {
    sx.flex = "0 0 110px";
  }

  return sx;
};

export const TableUi = ({ columns, data, onClick, clickedRow = false }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      if (row.original.separator) {
        return (
          <Flex
            {...row.getRowProps({
              style,
            })}
            sx={{
              width: "100%",
            }}>
            <Flex
              sx={{
                flex: "1 0 auto",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 1,
                py: 1,
                pl: 2,
                textAlign: "center",
                bg: "success",
                color: "white",
              }}>
              {row.original.separator}
              <Box px="4">{row.cells[row.cells.length - 1].render("Cell")}</Box>
            </Flex>
          </Flex>
        );
      }
      return (
        <Flex
          {...row.getRowProps({
            style,
          })}
          sx={{
            overflow: "hidden",
            bg: index % 2 === 0 ? "secondary" : "gray.7",
            pl: 2,
            cursor: "pointer",
            ":hover": {
              bg: "primary",
            },
          }}
          onClick={() => onClick(row.original)}>
          {row.cells.map((cell, index) => {
            return (
              <Flex
                {...cell.getCellProps()}
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  ...getCellWidth(index),
                }}>
                {cell.render("Cell")}
              </Flex>
            );
          })}
        </Flex>
      );
    },
    [prepareRow, rows]
  );

  return (
    <Box {...getTableProps()} sx={{ color: "white", p: 2 }}>
      {headerGroups.map((headerGroup) => {
        return headerGroup.headers[0]?.Header ? (
          <Flex {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <Flex
                {...column.getHeaderProps()}
                sx={{ pl: 2, py: 3, ...getCellWidth(index) }}>
                {column.render("Header")}
              </Flex>
            ))}
          </Flex>
        ) : null;
      })}
      <Flex {...getTableBodyProps()}>
        <List
          height={1000}
          itemCount={rows.length}
          itemSize={(index) => {
            const row = rows[index];
            return row.original.separator ? 40 : 100;
          }}
          width={totalColumnsWidth}>
          {RenderRow}
        </List>
      </Flex>
    </Box>
  );
};
