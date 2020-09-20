import React from "react";
import "./style.css";
import * as _ from 'lodash';
/*
You could create a custom hook that keeps track of the previous dependency array in a ref and compares the objects with e.g. Lodash isEqual and only runs the provided function if they are not equal.

Example
*/
const { useState, useEffect, useRef } = React;
const { isEqual } = _;

function useDeepEffect(fn, deps) {
  const isFirst = useRef(true);
  const prevDeps = useRef(deps);

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) =>
      isEqual(obj, deps[index])
    );

    if (isFirst.current || !isSame) {
      fn();
    }

    isFirst.current = false;
    prevDeps.current = deps;
  }, deps);
}

export default function App() {
  const [state, setState] = useState({ foo: "foo" });

  useEffect(() => {
    setTimeout(() => setState({ foo: "foo" }), 1000);
    setTimeout(() => setState({ foo: "bar" }), 2000);
  }, []);

  useDeepEffect(() => {
    console.log("State changed!");
  }, [state]);

  return <div>{JSON.stringify(state)}</div>;
}
