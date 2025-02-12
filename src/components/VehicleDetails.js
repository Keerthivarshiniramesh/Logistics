import React, { useState, useEffect } from 'react';
import logo from '../assest/logistics_logo.png';
import { useNavigate } from 'react-router-dom';
import cargo from '../assest/cargo.png';


export default function VehicleDetails() {

    const [sideBar, setSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [change, setChange] = useState('')
    const use = useNavigate();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const vehicles = [
        {
            vehicleNumber: "TN10AB1234",
            name: "Truck-001",
            manufacturer: "Tata",
            yearOfManufacture: 2020,
            type: "Heavy Truck",
            desc: "Regular maintenance required"
        },
        {
            vehicleNumber: "TN10AB1256",
            name: "Truck-002",
            manufacturer: "AL",
            yearOfManufacture: 2021,
            type: "Truck",
            desc: "Regular maintenance required"
        }
    ];

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
        <div className="d-flex vh-100 overflow-x-hidden">
            {/* Sidebar */}
            <aside className={`bg-light text-black p-3 position-fixed h-100 ${sideBar ? "d-block" : "d-none d-md-block"} z-3`} style={{ width: "250px" }}>
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
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || windowWidth >= 768 ? "250px" : "0" }}>
                {/* Header */}
                <header className="d-flex justify-content-between align-items-center bg-white p-3 shadow">
                    <button className="btn btn-outline-secondary d-md-none" onClick={() => setSidebar(!sideBar)}>
                        <i className="bi bi-list"></i>
                    </button>
                    <img src={logo} alt="Logo" style={{ height: "70px" }} />
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


                <main className="container-fluid py-4 flex-grow-1 dash_content">
                    <button className='btn btn-success m-5 float-end' onClick={() => use('/vehicle')}>Create</button>
                    <table className="table align-middle mb-0 bg-white table-striped">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Vehicle No</th>
                                <th>Name</th>
                                <th>Year</th>
                                <th>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehi, index) => (
                                <tr key={index} className='tr-white'>
                                    <td className='fw-bold'>{index + 1}</td>
                                    <td><p className="fw-normal mb-1">{vehi.vehicleNumber}</p></td>
                                    <td><p className="fw-normal mb-1">{vehi.name}</p></td>
                                    <td><p className="fw-normal mb-1">{vehi.yearOfManufacture}</p></td>
                                    <td><p className="fw-normal mb-1">{vehi.type}</p></td>
                                    <td>
                                        <i className="bi bi-trash-fill mx-2 px-1 text-danger"></i>
                                        <i className="bi bi-pencil-square mx-2 px-1 text-primary" onClick={() => use(`/edit_vehicle/${vehi.vehicleNumber}`)}></i>
                                        <i className="bi bi-eye-fill mx-2 px-1 text-success " onClick={() => use(`/view_vehicle/${vehi.vehicleNumber}`)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    )
}
