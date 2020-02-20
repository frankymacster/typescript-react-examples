// https://www.npmjs.com/package/use-saga-reducer

import * as React from "react";
import useSagaReducer from "use-saga-reducer";
import { takeLatest, call, put } from "redux-saga/effects";

const fetchData = async () => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json = await data.json();
    console.log(json);
    return json;
  } catch (e) {
    console.error(e);
  }
};

function* dataFetcher() {
  try {
    const data = yield call(fetchData);
    yield put({ type: "FETCH_SUCCESS", payload: data });
  } catch (error) {
    yield put({ type: "FETCH_ERROR" });
  }
}

function* dataFetchingSaga() {
  yield takeLatest("FETCH", dataFetcher);
}

interface Action {
  type: string;
  payload?: any;
}

function reducer(state = {}, action: Action) {
  if (action.type === "FETCH_SUCCESS") {
    return action.payload;
  }

  return state;
}

const DataFetchingComponent: React.FC = () => {
  const [state, dispatch] = useSagaReducer(dataFetchingSaga, reducer);

  return (
    <>
      <pre>{JSON.stringify(state)}</pre>
      <button onClick={() => dispatch({ type: "FETCH" })}>Fetch Data</button>
    </>
  );
};

export default DataFetchingComponent;
