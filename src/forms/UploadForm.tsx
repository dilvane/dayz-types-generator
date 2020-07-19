import { AbsoluteBase } from "components";
import { FileUploadField } from "fields";
import { file } from "fields/validations";
import { Form, Formik } from "formik";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "Modal";
import React from "react";
import { Flex, Button, Text, Heading, Box } from "theme-ui";
import * as Yup from "yup";

const { object } = Yup;
const SUPPORTED_FORMATS = ["text/xml"];

const validationUploadSchema = object().shape({
  file: file({ SUPPORTED_FORMATS }),
});

const initialUpload: any = {
  file: "",
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
      onSubmit={(values) => onSubmit(values)}>
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
                  label="File"
                  name="file"
                  accept={SUPPORTED_FORMATS}
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

export const UploadModal = ({ isOpen, onCloseModal, onConfirm, loading }) => (
  <Modal isOpen={isOpen} onRequestClose={onCloseModal} height="100%">
    <ModalHeader title="Upload file" onRequestClose={onCloseModal} />

    <ModalBody>
      <UploadForm id="Upload" action={null} onSubmit={onConfirm} />
      {loading && (
        <AbsoluteBase>
          <Box sx={{ color: "white", fontSize: 5 }}>Loading...</Box>
        </AbsoluteBase>
      )}
    </ModalBody>

    <ModalFooter>
      <Button mt={2} variant="primary" form="Upload" type="submit">
        Import
      </Button>
    </ModalFooter>
  </Modal>
);

export const ReportModal = ({ isOpen, onCloseModal, item }) => (
  <Modal isOpen={isOpen} onRequestClose={onCloseModal} height="100%">
    <ModalHeader title="File imported" onRequestClose={onCloseModal} />

    {item && (
      <ModalBody color="white">
        <Box p="4">
          <Flex sx={{ alignItems: "center" }}>
            <Heading as="h3">Valid types: </Heading>
            <Text ml="2">{item.valid}</Text>
          </Flex>
          <Flex sx={{ alignItems: "center" }}>
            <Heading as="h3">Invalid types: </Heading>
            <Text ml="2">{item.invalid}</Text>
          </Flex>
          <Flex sx={{ alignItems: "center" }}>
            <Heading as="h3">Duplicated types: </Heading>
            <Text ml="2">{item.duplicated}</Text>
          </Flex>
          <Flex sx={{ alignItems: "center" }}>
            <Heading as="h3">Separators: </Heading>
            <Text ml="2">{item.separator}</Text>
          </Flex>
        </Box>
      </ModalBody>
    )}

    <ModalFooter>
      <Button mt={2} variant="primary" onClick={onCloseModal}>
        Ok
      </Button>
    </ModalFooter>
  </Modal>
);
