import * as React from "react";

interface CounterProps {
  initialCount?: number;
}

interface Action {
  type: string;
}

type State = number;

const INCREMENT_REQUESTED = "INCREMENT_REQUESTED";
const DECREMENT_REQUESTED = "DECREMENT_REQUESTED";

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case INCREMENT_REQUESTED:
      return state + 1;
    case DECREMENT_REQUESTED:
      return state - 1;
    default:
      return state;
  }
};

const Counter = ({ initialCount = 0 }: CounterProps) => {
  const [currentCount, dispatch] = React.useReducer(reducer, initialCount);

  return (
    <>
      <h1>{currentCount}</h1>
      <button onClick={() => dispatch({ type: INCREMENT_REQUESTED })}>
        increment
      </button>
      <button onClick={() => dispatch({ type: DECREMENT_REQUESTED })}>
        decrement
      </button>
    </>
  );
};

export default Counter;
