import { useState } from "react";
import { Form as RBForm, Stack } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "../styled/Button";
import FormControl from "../styled/FormControl";
import { Button as ButtonType, FormField } from "../types";

interface FormProps {
  fields: FormField[];
  buttons: ButtonType[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ fields, buttons, onSubmit }) => {
  const [validated, setValidated] = useState<boolean>(false);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
    }
    setValidated(true);
    onSubmit(e);
  };

  const fieldComponents = fields.map((field) => {
    return (
      <RBForm.Group
        className="mb-3"
        controlId={`${field.label
          .replaceAll(" ", "")
          .toLowerCase()}GroupControlId`}
        key={field.label}
      >
        {!field.isFloatingLabel ? (
          <>
            <RBForm.Label>{field.label}</RBForm.Label>
            <FormControl
              type={field.type}
              placeholder={field.placeholder}
              required={field.required ? true : false}
              name={field.name}
            />
            {field.invalidText ? (
              <FormControl.Feedback type="invalid">
                {field.invalidText}
              </FormControl.Feedback>
            ) : (
              field.validText && (
                <FormControl.Feedback type="valid">
                  {field.validText}
                </FormControl.Feedback>
              )
            )}
          </>
        ) : (
          <FloatingLabel
            controlId={`${field.label
              .replaceAll(" ", "")
              .toLowerCase()}LabelControlId`}
            label={field.label}
          >
            <FormControl
              type={field.type}
              placeholder={field.placeholder}
              required={field.required ? true : false}
              name={field.name}
            />
            {field.invalidText ? (
              <FormControl.Feedback type="invalid">
                {field.invalidText}
              </FormControl.Feedback>
            ) : (
              field.validText && (
                <FormControl.Feedback type="valid">
                  {field.validText}
                </FormControl.Feedback>
              )
            )}
          </FloatingLabel>
        )}
      </RBForm.Group>
    );
  });

  const buttonComponents = buttons.map((button) => {
    return (
      <Button variant={button.context} type={button.type} key={button.label}>
        {button.label}
      </Button>
    );
  });

  return (
    <RBForm
      noValidate
      validated={validated}
      onSubmit={submitHandler}
      className=""
    >
      {fieldComponents}
      <Stack gap={2}>{buttonComponents}</Stack>
    </RBForm>
  );
};

export default Form;
