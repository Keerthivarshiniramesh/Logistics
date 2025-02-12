import React, { useEffect, useState } from 'react'
import logo from '../assest/logistics_logo.png'
import cargo from '../assest/cargo.png'
import view_vehi from '../assest/view_vehicle.jpg'
import { useNavigate, useParams } from 'react-router-dom';

export default function ViewVehicless() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('')
    const use = useNavigate()

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

    let [view, setView] = useState({

        vehicleNumber: '',
        name: '',
        manufacturer: '',
        yearOfManufacture: '',
        type: '',
        desc: ''

    })

    let { id } = useParams()
    useEffect(() => {
        if (id) {
            const current = vehicles.find((vehi) => vehi.vehicleNumber === id)
            setView(current);
        }
    }, [])


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

                    {/* Main Content */}

                    <section className="h-100">
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col">
                                    <div className="card card-registration my-4">
                                        <div className="row g-0">
                                            <div className="col-xl-6 d-none d-xl-block">
                                                <img src={view_vehi}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 " />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center">  Vehicle Details</h3>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" htmlFor="form1">Vehicle Number : </label>
                                                        <p className='ps-3 d-inline-block'>{view.vehicleNumber}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" htmlFor="form2">Name :</label>
                                                        <p className='ps-3 d-inline-block'>{view.name}</p>
                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" htmlFor="form3">Manufacturer : </label>
                                                        <p className='ps-3 d-inline-block'>{view.manufacturer}</p>

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" htmlFor="form4"> Year of Manufacture : </label>
                                                        <p className='ps-3 d-inline-block'>{view.yearOfManufacture}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" htmlFor="form5">Type : </label>
                                                        <p className='ps-3 d-inline-block'>{view.type}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" htmlFor="form6">Description :</label>
                                                        <p className='ps-3 d-inline-block'>{view.desc}</p>

                                                    </div>



                                                    <div className="d-flex justify-content-end pt-3">

                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg ms-2 " onClick={() => use('/vehicle-details')}>Cancel</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}
