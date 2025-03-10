import React, { useEffect, useState } from "react";
import logo from "../assest/logistics_logo.png";
import { useLocation, useNavigate } from "react-router-dom";

export default function Header({ sideBar, setSidebar }) {
    //{adminName}
    const url = process.env.REACT_APP_URL

    let use = useNavigate()


    const [adminName, setAdminName] = useState("");

    useEffect(() => {
        const storedName = localStorage.getItem("userName");
        console.log(storedName)
        if (storedName) {
            setAdminName(JSON.parse(storedName))
            
        }
    }, []);

    let Logout = () => {
        fetch(`${url}logout`, {
            method: "GET",
            credentials: "include"

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success === true) {
                    use('/')
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error :", err)
                alert("Trouble in conncting to Server")
            })
    }

    return (
        <header className="d-flex justify-content-between align-items-center bg-white p-3 ">

            <i className="bi bi-list d-md-none" onClick={() => setSidebar(!sideBar)}></i>

            <img src={logo} alt="Logo" style={{ height: "70px" }} className="mx-2" role="button" />

            <div className="d-flex align-items-center gap-3" role="button">
                <div className="d-flex align-items-center gap-1">
                    <i className="bi bi-person-circle text-primary fs-4"></i>
                    <span>{adminName}</span>
                </div>
                <div className="d-flex align-items-center gap-1" role="button" onClick={Logout}>
                    <i className="bi bi-box-arrow-right text-danger fs-4" ></i>
                    <span>Logout</span>
                </div>
            </div>
        </header>
    );
}
