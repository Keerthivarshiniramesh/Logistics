import React from "react";
import logo from "../assest/logistics_logo.png";

export default function Header({ sideBar, setSidebar }) {
    return (
        <header className="d-flex justify-content-between align-items-center bg-white p-3 shadow">
            {/* Sidebar Toggle Button (for small screens) */}
            <button className="btn btn-outline-secondary d-md-none" onClick={() => setSidebar(!sideBar)}>
                <i className="bi bi-list"></i>
            </button>

            {/* Logo */}
            <img src={logo} alt="Logo" style={{ height: "70px" }} />

            {/* Admin & Logout */}
            <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-person-circle text-primary fs-4"></i>
                    <span>Admin1</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-box-arrow-right text-danger fs-4"></i>
                    <span>Logout</span>
                </div>
            </div>
        </header>
    );
}
