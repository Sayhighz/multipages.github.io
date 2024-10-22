import React from 'react'

const Carts = ({cart,setCart}) => {
  return (
    <>
    <div className="container overflow-scroll" style={{ height: "640px", width: "1020px" }}>
    <div className="row">
          {cart.map((item) => {
            return (
              <div className="col-md-4" key={item.id}>
                <div className="card m-3" style={{ width: "18rem", height: "30rem"}}>
                  <img
                    src={item.thumbnailUrl}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text font-weight-bold">${item.price.toFixed(2)}</p>
                      <button
                        className="btn btn-primary"
                        onClick={() => setCart(cart.filter((cart) => cart.id !== item.id))}
                      >
                        Remove from cart
                      </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
    </div>
    <h4>Total: ${cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</h4>
  </>
  )
}

export default Carts