import React, { useState, useEffect } from "react";
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
    sx.justifyContent = "flex-start";
    sx.minWidth = "100px";
  } else {
    sx.flex = "0 0 100px";
  }

  if (index === 8) {
    sx.flex = "0 0 130px";
    sx.maxWidth = "130px";
  }

  return sx;
};

const getSize = () => ({
  height:
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) - 110,
  width:
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth,
});

export const TableUi = ({ columns, data, onClick }) => {
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
  const [windowSize, setWindowSize] = useState({
    height: 800,
    width: totalColumnsWidth,
  });

  useEffect(() => {
    setWindowSize(getSize());
  }, []);

  useEffect(() => {
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 1,
                py: 1,
                pl: 2,
                textAlign: "center",
                bg: "success",
                color: "white",
              }}>
              <span />
              <span>{row.original.separator}</span>
              <Box px="2">{row.cells[row.cells.length - 1].render("Cell")}</Box>
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
                  justifyContent: "center",
                  alignItems: "center",
                  pl: 2,
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
    <Box {...getTableProps()} sx={{ color: "white" }}>
      {headerGroups.map((headerGroup) => {
        return headerGroup.headers[0]?.Header ? (
          <Flex {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <Flex
                {...column.getHeaderProps()}
                sx={{
                  pl: 2,
                  py: 3,
                  justifyContent: "center",
                  ...getCellWidth(index),
                }}>
                {column.render("Header")}
              </Flex>
            ))}
          </Flex>
        ) : null;
      })}
      <Flex {...getTableBodyProps()}>
        <List
          height={windowSize.height}
          itemCount={rows.length}
          itemSize={() => 50}
          width={windowSize.width}>
          {RenderRow}
        </List>
      </Flex>
    </Box>
  );
};
