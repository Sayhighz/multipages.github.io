import React from 'react';
export const Plus = (props) => {
  const { count, setCount, name } = props;
  return (
    <div className="card m-3">
      <h5 className="card-title">{name || 'Counter'}</h5>
      <div className="card-body p-2 d-flex">
        <button className="btn btn-success" onClick={() => setCount(count + 1)}>+</button>
        <h6 className='p-3'>{count}</h6>
        <button className="btn btn-danger" onClick={() => setCount(count - 1)}>-</button>
      </div>
    </div>
  );
};
