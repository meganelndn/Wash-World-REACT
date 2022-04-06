import React, { useEffect } from "react";
import api from "../api";
import axios from "axios";

export default function Cam(data) {

    useEffect(() => {
        axios
            .get(api.URL + "/cam/" + data.locationID)
            .then((result) => {
                let dataCam = result.data.response;
                dataCam.lpn = getRandomLPN(dataCam.lpn);
                data.setCam(result.data.response);
                data.setCamLoad(false);
            });
    }, [data.locationID]);

    function getRandomLPN(lpn) {
        const chars = lpn.slice(0, 2);
        const numbers = lpn.slice(2) - Math.round(Math.random() * 1);
        return chars + numbers;
    }

    let lpnText;
    if (data.cam.lpn === "BV99123") {
        lpnText = "Plate n°: " + data.cam.lpn + " (PREMIUM)";
    } else {
        lpnText = "Plate n°: " + data.cam.lpn;
    }

    return (
        <div className="wash-cam">
            {data.cam && (
                <div className="wash-label">
                    {data.camLoad && (
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    )}
                    {data.cam.lpn && !data.camLoad && lpnText}
                </div>
            )}
            {data.cam && (
                <p className={data.camLoad ? "text-muted" : ""}>
                    {data.cam.description}
                </p>
            )}
        </div>
    );
}