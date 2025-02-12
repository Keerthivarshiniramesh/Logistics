import React, { useEffect, useState } from 'react'
import logo from '../assest/logistics_logo.png'
import vehicle from '../assest/vehicle.jpg'
import employee from '../assest/employee.png'
import trip from '../assest/trips(1).jpg'
import cargo from '../assest/cargo.png'
import { useNavigate } from 'react-router-dom'


export default function Home() {


    const [sideBar, setSidebar] = useState(false);
    const use = useNavigate();
    const [change, setChange] = useState('Home')

    function Change(e, values) {
        e.preventDefault()
        setChange(values)
        if (values === 'Home') {
            setTimeout(() => {
                use('/dashboard')
            }, 200);
        }
        else if (values === 'Vehicle') {
            setTimeout(() => {
                use('/vehicle-details')
            }, 200);
        }
        else if (values === 'Employee') {
            setTimeout(() => {
                use('/employee_details')
            }, 200);
        }
        else {
            setTimeout(() => {
                use('/employee_edit')
            }, 200);
        }

    }
    return (
        <div className="d-flex vh-100 overflow-x-hidden ">
            {/* Sidebar */}
            <aside className={`bg-light text-black p-3 position-fixed h-100 ${sideBar ? "" : "d-none d-md-block"}`} style={{ width: "250px" }}>
                <h2 className="h4">Admin Panel</h2>
                <nav>
                    <ul className="list-unstyled">
                        <li className={`p-2  m-5 ${change === 'Home' ? 'format' : ''}`} ><div className=''><i className="bi bi-house-fill text-success mx-1 fs-3 " onClick={(e) => Change(e, 'Home')}></i>Home</div></li>
                        <li className={` p-2  m-5 ${change === 'Vehicle' ? 'format' : ''}`}><div className=''><i className="bi bi-truck text-success mx-1 fs-3 " onClick={(e) => Change(e, 'Vehicle')}></i>Vehicle</div></li>
                        <li className={` p-2  m-5 ${change === 'Employee' ? 'format' : ''}`}><div className=''><i className="bi bi-people-fill text-success mx-1 fs-3 " onClick={(e) => Change(e, 'Employee')}></i>Employee</div></li>
                        <li className={`p-2  m-5 ${change === 'Trip' ? 'format' : ''}`}><div className=''><img src={cargo} style={{ width: '40px', height: '40px' }} className='mx-2 ' onClick={(e) => Change(e, 'Trip')}></img>Trip</div></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>

                {/* Header */}
                <header className="d-flex justify-content-between align-items-center bg-white p-3 shadow">
                    <button className="btn btn-outline-secondary d-md-none" onClick={() => setSidebar(!sideBar)}>
                        <i className="bi bi-list"></i>
                    </button>
                    <img src={logo} alt="Logo" className="" style={{ height: "70px" }} />
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

                {/* Dashboard Cards */}
                <main className="container-fluid py-4  flex-grow-1 dash_content">

                    <div className="row row-cols-1 row-cols-md-3 g-5 p-4">
                        <div className="col ">
                            <div className="card">
                                <img src={vehicle} className="card-img-top" alt="..." />
                                <div className="card-body text-center bg-light">
                                    <h5 className="card-title">Vehicle</h5>
                                    <button className="card-text text-center w-50 btn rounded fw-bold btn-success" onClick={() => use('/vehicle-details')}>Vehicle...</button>
                                </div>
                            </div>
                        </div>
                        <div className="col ">
                            <div className="card">
                                <img src={employee} className="card-img-top" alt="..." />
                                <div className="card-body text-center bg-light">
                                    <h5 className="card-title">Employee</h5>
                                    <button className="card-text text-center w-50 btn rounded fw-bold btn-success" onClick={() => use('/employee_details')}>Employee...</button>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card">
                                <img src={trip} className="card-img-top" alt="..." />
                                <div className="card-body text-center bg-light">
                                    <h5 className="card-title">Trip</h5>
                                    <button className="card-text text-center w-50 btn rounded fw-bold btn-success">Trip...</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};


