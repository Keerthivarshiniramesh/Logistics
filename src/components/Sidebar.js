import React from "react";
import cargo from "../assest/cargo.png";

export default function Sidebar({ sideBar, setSidebar, change, Change }) {
    return (
        <aside
            className={`bg-light text-black p-3 position-fixed h-100 ${sideBar ? "" : "d-none d-md-block"}`}
            style={{ width: "250px" }}
        >
            <h2 className="h4">Admin Panel</h2>
            <nav>
                <ul className="list-unstyled">
                    <li className={`p-2  m-5 ${change === 'Home' && 'format'}`}>
                        <div className='select1'>
                            <i className="bi bi-house-fill text-success mx-1 fs-3" onClick={(e) => Change(e, 'Home')}></i>Home
                        </div>
                    </li>
                    <li className={` p-2  m-5 ${change === 'Vehicle' && 'format'}`}>
                        <div className='select1'>
                            <i className="bi bi-truck text-success mx-1 fs-3" onClick={(e) => Change(e, 'Vehicle')}></i>Vehicle
                        </div>
                    </li>
                    <li className={` p-2  m-5 ${change === 'Employee' && 'format'}`}>
                        <div className='select1'>
                            <i className="bi bi-people-fill text-success mx-1 fs-3" onClick={(e) => Change(e, 'Employee')}></i>Employee
                        </div>
                    </li>
                    <li className={`p-2  m-5 ${change === 'Trip' ? 'format' : ''}`}>
                        <div className='select1'>
                            <img src={cargo} style={{ width: '40px', height: '40px' }} className='mx-2' onClick={(e) => Change(e, 'Trip')} alt="Trip Icon"></img>Trip
                        </div>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}
