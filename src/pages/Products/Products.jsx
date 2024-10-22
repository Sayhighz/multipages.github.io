import React from "react";

const Products = ({ product, cart, setCart }) => {
  return (
    <>
      <div className="container overflow-scroll" style={{ height: "640px", width: "1020px" }}>
        <div className="row">
          {product.map((item) => {
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
                    {cart.find((cart) => cart.id === item.id) ? (
                      <span>Added</span>
                    ) :
                    (
                      <button
                        className="btn btn-primary"
                        onClick={() => setCart([...cart, item])}
                      >
                        Add To Cart
                      </button>
                      
                    )
                  }
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
