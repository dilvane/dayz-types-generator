import * as React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal, { ModalHeader, ModalBody, ModalFooter } from "./Modal";
import depsMock from "../../../tests/depsMock";

describe("Modal component", () => {
  const closeModal = jest.fn();

  it("renders", () => {
    render(
      <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
        <ModalHeader
          title="Modal Title"
          subtitle="Modal Subtitle"
          deps={depsMock}
          onRequestClose={closeModal}
        />
        <ModalBody>The modal body</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Subtitle")).toBeInTheDocument();
    expect(screen.getByText("The modal body")).toBeInTheDocument();
    expect(screen.getByText("Modal Footer")).toBeInTheDocument();
  });

  it("not renders when isOpen is false", () => {
    render(
      <Modal isOpen={false} onRequestClose={closeModal} ariaHideApp={false}>
        <ModalHeader
          title="Modal Title"
          subtitle="Modal Subtitle"
          deps={depsMock}
          onRequestClose={closeModal}
        />
        <ModalBody>The modal body</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );
    expect(screen.queryByText("Modal Title")).toBe(null);
    expect(screen.queryByText("The modal body")).toBe(null);
    expect(screen.queryByText("Modal Footer")).toBe(null);
  });

  it("calls the onRequestClose", () => {
    render(
      <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
        <ModalHeader
          title="Modal Title"
          subtitle="Modal Subtitle"
          deps={depsMock}
          onRequestClose={closeModal}
        />
        <ModalBody>The modal body</ModalBody>
        <ModalFooter>Modal Footer</ModalFooter>
      </Modal>
    );
    const closeButton = screen.queryByTestId("modal-close");
    fireEvent.click(closeButton);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
