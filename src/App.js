import React, { useState, useEffect } from "react";
import "./style.css";
import Navbar from "./components/Navbar";
import Location from "./components/Location";
import Cam from "./components/Cam";
import Products from "./components/Products";
import api from "./api";
import axios from "axios";
import Start from "./components/Start";

export default function App() {
    // Locations
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState({});

    useEffect(() => {
        axios.get(api.URL + "/locations").then((result) => {
            setLocations(result.data.response.locations);
        });
    }, []);

    function onChoice(event) {
        setLocation(locations[event.target.value - 1]);
        setCamLoad(true);
        setProduct({});
    }

    // Cam
    const [cam, setCam] = useState({});
    const [camLoad, setCamLoad] = useState(false);

    // Products
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});

    function onProductChange(event) {
        setProduct(products[event.target.value - 1]);
        document.getElementById("Wash-start").scrollIntoView();
    }

    // Start
    const [program, setProgram] = useState({});

    // Clock and pop up
    const [time, setTime] = useState(0);

    function stringMinutesToInt(str) {
        let ms = str;
        let a = ms.split(":");

        let seconds = parseInt(a[0] * 60) + parseInt(a[1]);

        return seconds;
    }

    const [startWash, setStartWash] = useState(false);

    function callWash(result) {
        setStartWash(true);
        setProgram(result.data.response);

        setTime(stringMinutesToInt(result.data.response.estimated_duration));
    }

    function washFinished() {
        alert(program.program + " car wash finished.");
    }

    return (
        <>
            <Navbar />
            <main className="container">
                {locations.length > 0 && (
                    <Location
                        locations={locations}
                        setLocations={setLocations}
                        onChoice={onChoice}
                    />
                )}
                {location.id && (
                    <Cam
                        locationID={location.id}
                        setCam={setCam}
                        cam={cam}
                        setCamLoad={setCamLoad}
                        camLoad={camLoad}
                    />
                )}
                {location.id && cam.lpn && camLoad === false && (
                    <Products
                        lpn={cam.lpn}
                        locationID={location.id}
                        products={products}
                        setProducts={setProducts}
                        onProductChange={onProductChange}
                    />
                )}
                <div id="Wash-start" className="mb-5">
                    {product.program && location && (
                        <Start
                            product={product}
                            location={location}
                            cam={cam}
                            setProgram={setProgram}
                            callWash={callWash}
                            stringMinutesToInt={stringMinutesToInt}
                        />
                    )}
                </div>
            </main>
        </>
    );
}