// https://codesandbox.io/s/reactfp-ts-form-validation-nnb4w

import * as React from "react";
import { FC, FormEvent, CSSProperties } from "react";
import { left, right, fold, isLeft, Either } from "fp-ts/es6/Either";

type BLError = string[];
type Validation<A> = [A, Either<BLError, A>];

interface UserValidation {
  firstName: Validation<string>;
  lastName: Validation<string>;
}

interface Validator {
  test: (value: string) => boolean;
  message: string;
}

const required = (field: string): Validator => ({
  test: (value: string) => value.trim() !== "",
  message: `${field} is required`
});
const minLength = (field: string) => (l: number): Validator => ({
  test: (value: string) => value.length >= l,
  message: `${field} has a minimum length of ${l}.`
});
const maxLength = (field: string) => (l: number): Validator => ({
  test: (value: string) => value.length <= l,
  message: `${field} has a maximum length of ${l}.`
});

function getInitialStyle(): Partial<CSSProperties> {
  return {
    padding: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    borderWidth: "2px",
    borderStyle: "solid"
  };
}

const validations: { [key: string]: Validator[] } = {
  firstName: [
    required("First Name"),
    minLength("First Name")(2),
    maxLength("First Name")(50)
  ],
  lastName: [
    required("Last Name"),
    minLength("Last Name")(2),
    maxLength("Last Name")(50)
  ]
};

interface FormProps {}

const initialUserValidation: UserValidation = {
  firstName: ["", right("")],
  lastName: ["", right("")]
};

const Form: FC<FormProps> = () => {
  const [formState, setFormState] = React.useState<UserValidation>(
    initialUserValidation
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState(initialUserValidation);
  };

  const updateField = (e: FormEvent<HTMLInputElement>) => {
    const { value, name } = e.target as HTMLInputElement;
    const validation = validations[name];

    const errors = validation.reduce((acc: Validator[], v: Validator) => {
      if (!v.test(value)) {
        return acc.concat(v.message);
      }

      return acc;
    }, []);

    setFormState({
      ...formState,
      [name]: errors.length ? [value, left(errors)] : [value, right(value)]
    });
  };

  const getDisabledState = (state: typeof formState): boolean => {
    return Object.keys(state)
      .map((k: string) => state[k])
      .some(field => field[0] === "" || isLeft(field[1]));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="firstName"
        label="First Name"
        state={formState.firstName}
        onUpdate={updateField}
      />
      <Input
        id="lastName"
        label="Last Name"
        state={formState.lastName}
        onUpdate={updateField}
      />
      <button type="submit" disabled={getDisabledState(formState)}>
        Save User
      </button>
    </form>
  );
};

interface InputProps {
  state: Validation<string>;
  onUpdate: (e: FormEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
}

const Input: FC<InputProps> = props => {
  const getStyle = (state: typeof props.state) => {
    return fold(
      () => ({ borderColor: "red" }),
      () => ({ borderColor: "transparent" })
    )(state[1]);
  };

  return (
    <div
      style={{
        ...getInitialStyle(),
        ...getStyle(props.state)
      }}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        name={props.id}
        id={props.id}
        onChange={props.onUpdate}
        value={props.state[0]}
      />
      {fold(
        (errors: BLError) => (
          <div style={{ marginLeft: "1rem", color: "red" }}>
            {errors.map((e, idx) => (
              <div key={idx}>{e}</div>
            ))}
          </div>
        ),
        () => <span />
      )(props.state[1])}
    </div>
  );
};

export default Form;
