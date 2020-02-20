import * as React from "react";

interface HelloProps {
  compiler: string;
  framework?: string;
}

const initialState = {
  done: false
};

interface State {
  done: boolean;
}

interface Action {
  type: string;
}

const DONE = "DONE";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case DONE:
      return {
        done: true
      };
    default:
      return state;
  }
};

const Hello = ({ compiler, framework }: HelloProps) => {
  // const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <>
      <h1>
        Hello from {compiler} and {framework}!
      </h1>
      {/* <button onClick={dispatch()} /> */}
    </>
  );
};

export default Hello;
