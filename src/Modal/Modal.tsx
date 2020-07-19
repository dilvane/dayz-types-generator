import { Global, css } from "@emotion/core";
import React from "react";
import ModalBase, { Props } from "react-modal";
import { Box, Text, Flex } from "theme-ui";

export const ModalHeader = ({ title, onRequestClose }) => (
  <Flex
    sx={{
      p: 4,
      justifyContent: "space-between",
      bg: "primary",
      color: "white",
      fontSize: 4,
    }}>
    <Box>
      <Text>{title}</Text>
    </Box>
    <Box onClick={onRequestClose} sx={{ cursor: "pointer" }}>
      X
    </Box>
  </Flex>
);

export const ModalBody = ({ sx = {}, ...props }) => (
  <Box
    {...props}
    sx={{
      overflow: "visible",
      flex: "1 1 auto",
      bg: "primary",
      ...sx,
    }}
  />
);

export const ModalFooter = ({ sx = {}, ...props }) => (
  <Flex
    {...props}
    sx={{
      px: 4,
      py: 3,
      justifyContent: "flex-end",
      bg: "primary",
      ...sx,
    }}
  />
);

interface ModalProps extends Props {
  children: React.ReactElement[] | string;
  height?: string;
  isOpen: boolean | null;
  onRequestClose?: any;
}

export const Modal = ({ children, height = "100%", ...props }: ModalProps) => {
  return (
    <>
      <Global
        styles={css`
          .ReactModal__Overlay {
            opacity: 0;
            transition: opacity 200ms ease-in-out;
          }

          .ReactModal__Overlay--after-open {
            opacity: 1;
          }

          .ReactModal__Overlay--before-close {
            opacity: 0;
          }

          .ReactModal__Content {
            transition: transform 0.3s ease-out;
            transform: translate(0, -50px);
          }

          .ReactModal__Content--after-open {
            transform: translate(0, 0px);
          }

          .ReactModal__Content--before-close {
            transition: transform 0.3s ease-out;
            transform: translate(0, 50px);
          }

          .modal-open {
            overflow: hidden;
          }
        `}
      />
      <ModalBase
        bodyOpenClassName="modal-open"
        closeTimeoutMS={200}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 100,
          },
          content: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: 0,
            border: "none",
            borderRadius: 0,
            outline: "none",
            background: "none",
            overflow: "auto",
          },
        }}
        {...props}>
        <Flex
          sx={{
            p: [0, null, 4],
            width: "100%",
            height,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Flex
            sx={{
              flexDirection: "column",
              background: "white",
              borderRadius: "small",
              boxShadow: "card",
              color: "text",
              minWidth: ["100%", null, "700px"],
              maxHeight: height,
              maxWidth: ["100%", null, "700px"],
              position: "relative",
            }}>
            {children}
          </Flex>
        </Flex>
      </ModalBase>
    </>
  );
};
