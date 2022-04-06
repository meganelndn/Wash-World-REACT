import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";

export default function Start(props) {
    const [start, setStart] = useState(false);

    function StartWash() {
        setStart(true);
    }

    useEffect(() => {
        if (start) {
            axios
                .post(
                    api.URL +
                        "/" +
                        props.location.id +
                        "/start/" +
                        props.product.program
                )
                .then((result) => {
                    props.callWash(result);
                    setStart(false);
                });
        }
    }, [start, props]);

    return (
        <>
            <h2 className="mt-5">3. Confirm purchase</h2>
            <div className="row">
                <div className="col">
                    <table className="table table-borderless mb-0">
                        <tbody>
                            <tr>
                                <th>Address:</th>
                                <td>{props.location.name}</td>
                            </tr>
                            <tr>
                                <th>License plate n°:</th>
                                <td>{props.cam.lpn}</td>
                            </tr>
                            <tr>
                                <th>Service:</th>
                                <td>{props.product.name}</td>
                            </tr>
                            <tr>
                                <th>Price:</th>
                                <td>{props.product.price} DKK</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn">
                    <div className="wash-btn mt-auto" onClick={StartWash}>
                            START NOW
                        </div>
                    </div>
                </div>
        </>
    );
}