import { Switch } from "@rebass/forms";
import { Block } from "components";
import { useField } from "formik";
import React from "react";
import InputMask from "react-input-mask";
import ReactSelect from "react-select";
import { theme } from "theme";
import { Input, Label, Flex, Radio, Checkbox, Textarea, Box } from "theme-ui";

export const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props.name);
  const hasError = meta.touched && meta.error;

  return (
    <Block>
      <Label
        htmlFor={props.id || props.name}
        variant={hasError ? "label.error" : "label"}>
        {label}
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
      backgroundColor: "white",
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
        <Checkbox {...field} {...props} defaultChecked={field.value} />
        {label}
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
