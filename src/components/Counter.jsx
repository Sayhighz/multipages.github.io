import React from 'react'
import { useState } from "react";

export const Counter = (props) => {
    const [count, setCount] = useState(0);
    
  return (
    <div className="card">
    <h1 className="card-title">{props.name || 'Counter'}</h1>
    <div className="card-body">
      <button className="btn btn-success" onClick={() => setCount((count) => count + 1)}>+</button>
      <h2>{count}</h2>
      <button className="btn btn-danger" onClick={() => setCount((count) => count - 1)}>-</button>
    </div>
  </div>
  )
}
