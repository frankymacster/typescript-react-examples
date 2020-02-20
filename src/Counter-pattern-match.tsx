import * as React from "react";
import match from "./match";

interface CounterProps {
  initialCount?: number;
}

type State = number;

type Action = "increment" | "decrement" | "reset";

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const reducer = (state: State, action: Action): State => {
    return match<Action, State>({
      increment: () => state + 1,
      decrement: () => state - 1,
      reset: () => initialCount
    })(action);
  };

  const [currentCount, dispatch] = React.useReducer(reducer, initialCount);

  return (
    <>
      <h1>{currentCount}</h1>
      <button onClick={() => dispatch("increment")}>increment</button>
      <button onClick={() => dispatch("decrement")}>decrement</button>
      <button onClick={() => dispatch("reset")}>reset</button>
    </>
  );
};

export default Counter;
