import * as React from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "./Modal";
import Box from "../Box";
import Text from "../Text";
import depsMock from "../../../tests/depsMock";
import { FontWeight, FontSize } from "../../fontMixins";
import { Spacing } from "../../spacing";
import Flex from "../Flex";
import styled from "@emotion/styled";
import Radio from "../Radio";
import Button, { ButtonTypes } from "../Buttons/Button";
import { Scrollable, Sticky } from "../utils";

export default {
  title: "Atoms/Modal",
  decorators: [withKnobs]
};

const Card = styled(Box)`
  height: 156px;
  width: 122px;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  background-color: #ffffff;
`;

export const playground = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ModalHeader
          title="Modal Title"
          subtitle="Modal Subtitle"
          deps={depsMock}
          onRequestClose={closeModal}
        />
        <ModalBody>The modal body</ModalBody>
        <ModalFooter>
          <Button
            type={ButtonTypes.cta}
            deps={depsMock}
            px={Spacing.medium}
            onClick={closeModal}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const withLongContent = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ModalHeader
          title="Modal Title"
          subtitle="Modal Subtitle"
          deps={depsMock}
          onRequestClose={closeModal}
        />
        <ModalBody>
          {`${"Lorem ipsum dolor sit amet consectetur adipisicing elit. ".repeat(
            100
          )}`}
        </ModalBody>
        <ModalFooter>
          <Button
            type={ButtonTypes.cta}
            deps={depsMock}
            px={Spacing.medium}
            onClick={closeModal}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const withSpecificContent = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ModalHeader
          title="Personalised selection"
          subtitle="Please select the checked luggage for outbound and return for all
            passengers"
          deps={depsMock}
          onRequestClose={closeModal}
        />
        <ModalBody sx={{ px: 0, overflow: "hidden" }}>
          <Scrollable>
            <Sticky
              sx={{
                pt: Spacing.xsmall,
                pb: Spacing.medium,
                px: Spacing.xlarge,
                bg: "white"
              }}
            >
              <Text
                deps={depsMock}
                weight={FontWeight.bold}
                size={FontSize.base}
              >
                Mr. John Doe
              </Text>
            </Sticky>
            <Box
              sx={{
                bg: "#F9F8F8",
                px: Spacing.xlarge,
                pt: Spacing.xlarge,
                pb: Spacing.medium
              }}
            >
              <Flex
                sx={{
                  flexDirection: ["column", null, "row"],
                  justifyContent: ["flex-start", null, "space-between"],
                  alignItems: ["center", null, "flex-start"],
                  mb: Spacing.medium
                }}
              >
                <Card />
                <Card />
                <Card />
                <Card />
              </Flex>
              <Radio
                deps={depsMock}
                value="option1"
                name="radio"
                label="I don’t wish to add extra luggage for Mr. John Doe"
              />
            </Box>
          </Scrollable>
        </ModalBody>
        <ModalFooter>
          <Button
            type={ButtonTypes.cta}
            deps={depsMock}
            px={Spacing.medium}
            onClick={closeModal}
          >
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
