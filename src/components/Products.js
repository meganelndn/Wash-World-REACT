import React, { useEffect } from "react";
import api from "../api";
import axios from "axios";

export default function Products(data) {

    useEffect(() => {
        axios.get(api.URL + "/products/" + data.lpn).then((result) => {
            data.setProducts(result.data.response.products);
        });
    }, [data.locationID, data.lpn]);

    return (
        <>
            <h2>2. Choose a service</h2>
            <div className="wash-product-list mb-5" id="product-list">
                {data.products.map((product, index) => {
                    let Pricetag = product.price + " DKK";
                    if (index === 1 || index === 3) {
                        Pricetag = "N / A";
                    } else if (data.lpn === "BV99123") {
                        Pricetag = "Free (premium only)";
                    }
                    return (
                        <div
                            key={product.productid}
                            className="wash-product shadow"
                        >
                            <div>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </div>
                            <div className="price-section">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    id={"btn-" + product.productid}
                                    name="product-id"
                                    value={product.program}
                                    onChange={data.onProductChange}
                                    disabled={
                                        index === 3 || index === 1 ? "on" : ""
                                    }
                                />
                                <label
                                    className={
                                        index === 3 || index === 1
                                            ? "wash-btn disabled"
                                            : "wash-btn"
                                    }
                                    htmlFor={"btn-" + product.productid}
                                >
                                    {Pricetag}
                                </label>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}