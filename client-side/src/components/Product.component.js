import React, { useState, useEffect } from "react";

const Product = (props) => {
    const [product, setproduct] = useState({});

    useEffect(() => {
        setproduct(props.product);
    }, [props.product]);

    return (
        <div className="card product">
            <div className="card-header">{product.dept}</div>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <h6 className="card-subtitle text-muted">₹{product.price}</h6>
                <p className="card-text">{product.color}</p>
            </div>
        </div>
    );
};

export default Product;
