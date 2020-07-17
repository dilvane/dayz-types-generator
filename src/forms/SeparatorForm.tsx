import { TextAreaField } from "fields";
import { Form, Formik } from "formik";
import React from "react";
import { Flex } from "theme-ui";
import * as Yup from "yup";
const { object, string } = Yup;

const initialSeparatorValues = {
  separator: "",
};

const validationSeparatorSchema = object().shape({
  separator: string().required(),
});

export const SeparatorForm = ({
  onSubmit,
  action,
  initialValues = initialSeparatorValues,
  id,
}) => (
  <Formik
    validateOnMount={false}
    initialValues={initialValues}
    validationSchema={validationSeparatorSchema}
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
              <TextAreaField
                label="Separator"
                name="separator"
                required
                rows={4}
              />
            </fieldset>
            {action}
          </Flex>
        </Form>
      );
    }}
  </Formik>
);
