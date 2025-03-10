import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Loading() {
    const [sideBar, setSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="d-flex vh-100 overflow-x-hidden">
            {/* Sidebar */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} />

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>
                {/* Header  */}
                <Header sideBar={sideBar} setSidebar={setSidebar} />

                {/* Dashboard Cards */}
                <main className="container-fluid py-4 flex-grow-1 dash_content">
                    <div>
                        <div className="d-flex justify-content-center m-5 align-content-center">
                            <div className="spinner-border" role="status">
                                <p></p><span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

