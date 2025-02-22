import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import vehicle from "../assest/vehicle.jpg";
import employee from "../assest/employee.png";
import trip from "../assest/trips(1).jpg";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const [sideBar, setSidebar] = useState(false);
    const use = useNavigate();
    const [change, setChange] = useState("Home");
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    function Change(e, values) {
        e.preventDefault();
        setChange(values);

        setTimeout(() => {
            if (values === "Home") use("/dashboard");
            else if (values === "Vehicle") use("/vehicle-details");
            else if (values === "Employee") use("/employee_details");
            else if (values === "Trip") use("/trip_details");
        }, 200);
    }

    return (
        <div className="d-flex vh-100 overflow-x-hidden">
            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            {/* Main Content */}
            <div
                className="flex-grow-1 d-flex flex-column bg-light"
                style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>
                {/* Header Component */}
                <Header sideBar={sideBar} setSidebar={setSidebar} />

                {/* Dashboard Cards */}
                <main className="container-fluid py-4 flex-grow-1 dash_content">
                    <div className="row row-cols-1 row-cols-md-3 g-5 p-4">
                        <div className="col">
                            <div className="card">
                                <img src={vehicle} className="card-img-top" alt="Vehicle" />
                                <div className="card-body text-center bg-light">

                                    <button className="card-text text-center w-50 btn rounded fw-bold btn-success" onClick={() => use("/vehicle-details")}>
                                        <h5 className="card-title">Vehicle</h5> </button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={employee} className="card-img-top" alt="Employee" />
                                <div className="card-body text-center bg-light">

                                    <button className="card-text text-center w-50 btn rounded fw-bold btn-success" onClick={() => use("/employee_details")}>
                                        <h5 className="card-title">Employee</h5> </button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={trip} className="card-img-top" alt="Trip" />
                                <div className="card-body text-center bg-light">

                                    <button className="card-text text-center w-50 btn rounded fw-bold btn-success"
                                        onClick={() => use("/trip_details")}>  <h5 className="card-title">Trip</h5></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

