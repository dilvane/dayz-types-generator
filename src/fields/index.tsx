import { Switch } from "@rebass/forms";
import { Block, Absolute, SpinnerAbsolute } from "components";
import { useField } from "formik";
import { useUploadFile } from "hooks";
import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import InputMask from "react-input-mask";
import ReactSelect from "react-select";
import { theme } from "theme";
import {
  Input,
  Label,
  Flex,
  Radio,
  Checkbox,
  Textarea,
  Box,
  Text,
  Button,
} from "theme-ui";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <Block>
      <Label
        htmlFor={props.id || props.name}
        variant={hasError ? "label.error" : "label"}>
        {label}
        {props.tooltip && props.tooltip()}
      </Label>
      {props.mask ? (
        <InputMask {...field} {...props} value={`${field.value}`}>
          <Input variant={hasError ? "input.error" : "input"} />
        </InputMask>
      ) : (
        <Input
          type="text"
          {...field}
          {...props}
          variant={hasError ? "input.error" : "input"}
        />
      )}
    </Block>
  );
};

export const TextAreaField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;
  return (
    <Block>
      <Label
        htmlFor={props.id || props.name}
        variant={hasError ? "label.error" : "label"}>
        {label}
      </Label>
      <Textarea
        rows={8}
        {...field}
        {...props}
        value={field.value || ""}
        variant={hasError ? "input.error" : "input"}
      />
    </Block>
  );
};

export const DateField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <Block>
      <Label
        htmlFor={props.id || props.name}
        variant={hasError ? "label.error" : "label"}>
        {label}
      </Label>
      <InputMask {...field} {...props} mask="99/99/9999">
        <Input
          type="tel"
          variant={hasError ? "input.error" : "input"}
          placeholder="DD/MM/YYYY"
        />
      </InputMask>
    </Block>
  );
};

const customSelectStyles = {
  control: (provided, state) => {
    let borderColor = state.isFocused
      ? theme.colors.primary
      : theme.colors.gray[5];

    if (state.selectProps.hasError) {
      borderColor = theme.colors.danger;
    }

    return {
      ...provided,
      outline: 0,
      borderColor,
      boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(0,119,204,.25)" : "none",
      backgroundColor: state.isDisabled ? theme.colors.gray[5] : "white",
      padding: "0px",
      ":hover": {
        borderColor,
      },
    };
  },
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "white" : "black",
    backgroundColor: state.isFocused ? "black" : "white",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.colors.gray[5] : provided.color,
    backgroundColor: state.isDisabled
      ? theme.colors.gray[5]
      : provided.backgroundColor,
  }),
  multiValueLabel: (provided, state) => ({
    ...provided,
    color: state.isDisabled ? theme.colors.gray[5] : provided.color,
    backgroundColor: state.isDisabled
      ? theme.colors.gray[5]
      : provided.backgroundColor,
  }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    backgroundColor: state.isDisabled
      ? theme.colors.gray[5]
      : provided.backgroundColor,
    color: state.isDisabled ? theme.colors.gray[5] : provided.color,
  }),
};

export const SelectField = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const hasError = meta.touched && meta.error;

  const onChange = (selectedOptions) => {
    helpers.setValue(selectedOptions);
  };

  return (
    <Block mb={2}>
      <Label
        htmlFor={props.id || props.name}
        variant={hasError ? "label.error" : "label"}>
        {label}
        {props.tooltip && props.tooltip()}
      </Label>
      <ReactSelect
        {...field}
        {...props}
        options={options}
        value={field.value}
        onChange={onChange}
        onBlur={field.onBlur}
        styles={customSelectStyles}
        hasError={hasError}
      />
    </Block>
  );
};

export const RadioField = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const hasError = meta.touched && meta.error;

  const onClick = (value) => {
    helpers.setValue(value);
  };

  return (
    <Block>
      <Label
        htmlFor={props.id || props.name}
        variant={hasError ? "label.error" : "label"}>
        {label}
      </Label>

      <Flex
        sx={{
          flexDirection:
            options.length > 2 ? "column" : ["column", null, "row"],
          justifyContent: "flex-start",
          alignItems: ["flex-start", "center"],
          height: ["auto", null, options.length > 2 ? "auto" : "42px"],
        }}>
        {options.map((option) => (
          <Label
            key={option.id}
            sx={{
              flex: "0 1 auto",
              width: "auto",
              pr: option.label ? 2 : 0,
              py: 2,
            }}
            variant="label.options">
            <Radio
              {...props}
              value={option.id}
              onClick={() => onClick(option.id)}
              // eslint-disable-next-line eqeqeq
              defaultChecked={field.value == option.id}
            />
            {option.label}
          </Label>
        ))}
      </Flex>
    </Block>
  );
};

export const CheckField = ({ label, ...props }: any) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <Block>
      <Label variant={hasError ? "label.error" : "label"}>
        <Flex sx={{ alignItems: "center" }}>
          <Checkbox
            {...field}
            {...props}
            defaultChecked={field.value}
            sx={{ color: "white" }}
          />
          {label}
          {props.tooltip && props.tooltip()}
        </Flex>
      </Label>
    </Block>
  );
};

export const SwitchField = ({ label, disabled, ...props }) => {
  const [field, , helpers] = useField(props.name);

  const onClick = () => {
    helpers.setValue(!field.value);
  };

  return (
    <Flex sx={{ alignItems: "center", justifyContent: "center" }}>
      <input {...field} {...props} type="hidden" checked={field.value} />
      <Switch checked={field.value} onClick={onClick} disabled={disabled} />
      <Box sx={{ ml: 2 }}>{label}</Box>
    </Flex>
  );
};

export const FileUploadField = ({ label, accept, ...props }) => {
  const [field, meta, helpers] = useField(props.name);
  const {
    uploadFile,
    fileResponse,
    removeFile,
    loading,
    error,
  } = useUploadFile();
  const hasError = meta.touched && meta.error;

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles[0]) {
      uploadFile(acceptedFiles[0]);
    } else {
      helpers.setValue({
        size: rejectedFiles[0].file.size,
        mime: rejectedFiles[0].file.type,
        name: rejectedFiles[0].file.name,
      });
      helpers.setError(true);
      helpers.setTouched(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: accept.join(","),
  });

  const remove = () => {
    removeFile(field.value);
    helpers.setValue(null);
    if (props.onRemove) {
      props.onRemove();
    }
  };

  useEffect(() => {
    if (fileResponse) {
      helpers.setValue(fileResponse);
      if (props.onUpload) {
        props.onUpload(fileResponse);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileResponse]);

  useEffect(() => {
    if (field.value) {
      helpers.setTouched(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getFileSize = () => {
    const size = field.value.size / 1024;
    return `${size.toFixed(2)} KB`;
  };

  return (
    <Block pb={4}>
      <Label
        htmlFor={props.id || props.name}
        variant={hasError ? "label.error" : "label"}>
        {label} {props.required ? "*" : ""}
      </Label>

      {!field.value && (
        <Flex
          variant="images.fileUpload"
          {...getRootProps()}
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            pt: 3,
            borderColor: hasError ? "red" : "",
          }}>
          <input {...getInputProps()} />
          <Text variant="styles.p" mb="0" px={2} color="white">
            Drag & Drop the file here
          </Text>
          <Absolute
            sx={{
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 3,
            }}>
            <Button variant="small" type="button" disabled={loading}>
              Select
            </Button>
          </Absolute>
          {loading && <SpinnerAbsolute />}
        </Flex>
      )}

      {field.value && (
        <Flex
          variant="images.fileUpload"
          {...getRootProps()}
          sx={{
            justifyContent: "center",
            alignItems: "flex-start",
            pt: 3,
            borderColor: hasError ? "red" : "",
          }}>
          <Text
            variant="styles.p"
            color="white"
            mb="0"
            px={2}
            sx={{
              fontSize: [1, null, 2],
              display: "flex",
              flexDirection: ["column", null, "row"],
              textAlign: "center",
              justifyContent: ["flex-start", null, "center"],
              alignItems: ["center", null, "flex-start"],
            }}>
            <Text variant="ellipsis">{field.value.name}</Text>
            <span> - {getFileSize()}</span>
          </Text>
          <Absolute
            sx={{
              flexDirection: "column",
              justifyContent: "flex-end",
              alignItems: "center",
              p: 3,
            }}>
            <Button variant="small.danger" type="button" onClick={remove}>
              Remove
            </Button>
          </Absolute>
        </Flex>
      )}

      {error || hasError ? (
        <Label variant="label.validation" mt={2}>
          {error || meta.error}
        </Label>
      ) : null}
    </Block>
  );
};
