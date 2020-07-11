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
          return (
            <Tr
              {...row.getRowProps()}
              onClick={() => onClick(row.original.id)}
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
