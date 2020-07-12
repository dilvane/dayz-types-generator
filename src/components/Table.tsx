import React from "react";
import { useTable } from "react-table";
import { Box } from "theme-ui";

export const Table = (props) => (
  <Box variant="styles.table" {...props} as="table" />
);
export const Thead = (props) => <Box {...props} as="thead" />;
export const Tbody = (props) => <Box {...props} as="tbody" />;
export const Tfoot = (props) => <Box {...props} as="tfoot" />;
export const Th = (props) => <Box {...props} as="th" />;
export const Tr = (props) => <Box {...props} as="tr" />;
export const Td = (props) => <Box {...props} as="td" />;

export const TableUi = ({ columns, data, onClick, clickedRow = false }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => {
          return headerGroup.headers[0]?.Header ? (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
              ))}
            </Tr>
          ) : null;
        })}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          if (row.original.separator) {
            return (
              <Tr
                sx={{
                  "> td": {
                    fontSize: 1,
                    py: 1,
                    px: 2,
                    textAlign: "center",
                    bg: "success",
                    color: "white",
                  },
                }}>
                <Td colSpan={row.cells.length - 1}>
                  {"// "}
                  {row.original.separator}
                </Td>
                <Td {...row.cells[row.cells.length - 1].getCellProps()}>
                  {row.cells[row.cells.length - 1].render("Cell")}
                </Td>
              </Tr>
            );
          }
          return (
            <Tr
              {...row.getRowProps()}
              onClick={() => onClick(row.original)}
              sx={{ cursor: clickedRow ? "pointer" : "default" }}>
              {row.cells.map((cell) => {
                return <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>;
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
