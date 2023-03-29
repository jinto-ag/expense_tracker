import React from 'react';
import { Form } from 'react-bootstrap';
import styles from './FormControl.module.css';

type FormControlProps = React.ComponentProps<typeof Form.Control>;
type FeedbackProps = React.ComponentProps<typeof Form.Control.Feedback>;

interface FormControlComponent extends React.FC<FormControlProps> {
  Feedback: React.FC<FeedbackProps>;
}

const FormControl: FormControlComponent = (props) => {
  return (
    <Form.Control {...props} className={styles.formControl} />
  );
}

FormControl.Feedback = Form.Control.Feedback;

export default FormControl;
