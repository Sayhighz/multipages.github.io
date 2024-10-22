import React, { useState } from "react";
import { Plus } from "./Plus";

export const Variable = (props) => {
  const [A, setA] = useState(props.a || 0);
  const [B, setB] = useState(props.b || 0);

  return (
    <div className="card border bg white">
      <div className="card-body d-flex justify-content-center align-items-center text-center">
        <div className="border p-2 m-1">
          <h2>A:{A}</h2>
        </div>
        <div className="border p-2 m-1">
          <h2>A + B = {A + B}</h2>
        </div>
        <div className="border p-2 m-1">
          <h2>B:{B}</h2>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <Plus count={A} setCount={setA} name="A" />
        <Plus count={B} setCount={setB} name="B" />
      </div>
    </div>
  );
};
