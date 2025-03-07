import React from "react";
import cargo from "../assest/cargo.png";

export default function Sidebar({ sideBar, setSidebar, change, Change }) {
    const url = process.env.REACT_APP_URL

    let handleDownload = () => {
        fetch(`${url}backup`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 200) {
                    return res.blob();
                } else {
                    throw new Error('Error in fetching the backup.');
                }
            })
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'database_backup.xlsx';
                link.click();
            })
            .catch((error) => {
                console.error('Error in downloading backup:', error);
                alert('Trouble in downloading backup');
            })

    }

    return (
        <aside className={`bg-light text-black p-3 position-fixed h-100 ${sideBar ? "" : "d-none d-md-block"}`} style={{ width: "250px" }}>
            <h2 className="h4">Admin Panel</h2>
            <nav>
                <ul className="list-unstyled">
                    <li className={`p-2  m-5 ${change === 'Home' && 'format'}`}>
                        <div className={` ${change !== 'Home' ? 'select1' : ''}`} onClick={(e) => Change(e, 'Home')} role="button">
                            <i className="bi bi-house-fill text-success mx-1 fs-3" ></i>Home
                        </div>
                    </li>
                    <li className={` p-2  m-5 ${change === 'Vehicle' && 'format'}`}>
                        <div className={` ${change !== 'Vehicle' ? 'select1' : ''}`} onClick={(e) => Change(e, 'Vehicle')} role="button">
                            <i className="bi bi-truck text-success mx-1 fs-3" ></i>Vehicle
                        </div>
                    </li>
                    <li className={` p-2  m-5 ${change === 'Employee' && 'format'}`}>
                        <div className={` ${change !== 'Employee' ? 'select1' : ''}`} onClick={(e) => Change(e, 'Employee')} role="button">
                            <i className="bi bi-people-fill text-success mx-1 fs-3" ></i>Employee
                        </div>
                    </li>
                    <li className={`p-2  m-5 ${change === 'Trip' ? 'format' : ''}`}>
                        <div className={` ${change !== 'Trip' ? 'select1' : ''}`} onClick={(e) => Change(e, 'Trip')} role="button">
                            <img src={cargo} style={{ width: '40px', height: '40px' }} className='mx-2' alt="Trip Icon"></img>Trip
                        </div>
                    </li>
                    <li className={`  m-5 `}>
                        <div className={` `} onClick={handleDownload} role="button">
                            <button className='btn btn-primary '><a href="#" className='text-white text-decoration-none' >
                                <i className="bi bi-download ">DOWNLOAD</i> </a></button>
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
