import React from "react";

export default function Location(data) {

    return (
        <div>
            <h2 className="mt-5">1. Choose a location</h2>
                <div className="d-grid wash-location-list">
                    {data.locations.map((location) => {
                        return (
                            <div key={location.id}>
                                <input
                                    type="radio"
                                    className="btn-check"
                                    id={"card-" + location.id}
                                    name="location-id"
                                    disabled={
                                        location.status !== "available" ? "on" : ""
                                    }
                                    onChange={data.onChoice}
                                    value={location.id}
                                />
                                <label
                                    className={
                                        "wash-location-card " + location.status
                                    }
                                    htmlFor={"card-" + location.id}
                                >
                                    {location.name}
                                    {location.status === "available" && (
                                        <i className="bi bi-arrow-right"></i>
                                    )}
                                </label>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}