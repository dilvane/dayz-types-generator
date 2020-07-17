import { FileUploadField } from "fields";
import { file } from "fields/validations";
import { Form, Formik } from "formik";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "Modal";
import React from "react";
import { Flex, Button } from "theme-ui";
import * as Yup from "yup";

const { object } = Yup;
const MAX_SIZE = 1024 * 10; // 10MB;
const SUPPORTED_FORMATS = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "application/pdf",
];

const validationUploadSchema = object().shape({
  docs: file({ MAX_SIZE, SUPPORTED_FORMATS }),
});

const initialUpload: any = {
  docs: "",
};

export const UploadForm = ({
  onSubmit,
  action,
  id,
  initialValues = initialUpload,
}) => {
  return (
    <Formik
      validateOnMount={false}
      initialValues={initialValues}
      validationSchema={validationUploadSchema}
      onSubmit={onSubmit}>
      {() => {
        return (
          <Form autoComplete="off" noValidate={true} id={id}>
            <Flex
              sx={{
                flexDirection: "column",
                justifyContent: "flex-end",
                px: 4,
              }}>
              <fieldset disabled={false} style={{ border: "none", padding: 0 }}>
                <FileUploadField
                  label="Ficheiro"
                  name="docs"
                  maxSize={MAX_SIZE * 1024}
                  accept={SUPPORTED_FORMATS}
                  onUpload={() => console.log("onUpload")}
                  onRemove={() => console.log("onRemove")}
                  required
                />
              </fieldset>
              {action}
            </Flex>
          </Form>
        );
      }}
    </Formik>
  );
};

export const UploadModal = ({ isOpen, onCloseModal, onConfirm }) => (
  <Modal isOpen={isOpen} onRequestClose={onCloseModal}>
    <ModalHeader title="Upload file" onRequestClose={onCloseModal} />

    <ModalBody>
      <UploadForm
        id="Upload"
        onSubmit={() => console.log("onSubmitUpload")}
        action={null}
      />
    </ModalBody>

    <ModalFooter>
      <Button mt={2} variant="danger" onClick={onConfirm}>
        Upload
      </Button>
    </ModalFooter>
  </Modal>
);
