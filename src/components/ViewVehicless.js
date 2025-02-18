import React, { useEffect, useState } from 'react'
import logo from '../assest/logistics_logo.png'
import cargo from '../assest/cargo.png'
import view_vehi from '../assest/view_vehicle.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ViewVehicless() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Vehicle')
    const use = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        <div className="d-flex vh-100 overflow-x-hidden ">

            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>


                {/* Header Component */}
                <Header sideBar={sideBar} setSidebar={setSidebar} />

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
                                                        <label className="form-label  fw-bold fs-6" >Vehicle Number : </label>
                                                        <p className='ps-3 d-inline-block'>{view.vehicleNumber}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" >Name :</label>
                                                        <p className='ps-3 d-inline-block'>{view.name}</p>
                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" >Manufacturer : </label>
                                                        <p className='ps-3 d-inline-block'>{view.manufacturer}</p>

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" > Year of Manufacture : </label>
                                                        <p className='ps-3 d-inline-block'>{view.yearOfManufacture}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label  fw-bold fs-6" >Type : </label>
                                                        <p className='ps-3 d-inline-block'>{view.type}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Description :</label>
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
