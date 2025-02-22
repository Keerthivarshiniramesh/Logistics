import React, { useEffect, useState } from 'react'
import edit_vehicle from '../assest/edit_vehicle.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function EditVehicle() {

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
            desc: "Regular maintenance required",
            lastServiceDate: '2025-01-05',
            nextServiceDate: '2025-04-21'
        },
        {
            vehicleNumber: "TN10AB1256",
            name: "Truck-002",
            manufacturer: "AL",
            yearOfManufacture: 2021,
            type: "Truck",
            desc: "Regular maintenance required",
            lastServiceDate: '2025-02-05',
            nextServiceDate: '2025-05-15'

        }
    ];

    let { id } = useParams()

    let [edit, setEdit] = useState({

        vehicleNumber: '',
        name: '',
        manufacturer: '',
        yearOfManufacture: '',
        type: '',
        desc: '',
        lastServiceDate: '',
        nextServiceDate: ''

    })
    useEffect(() => {
        if (id) {
            const current = vehicles.find((vehi) => vehi.vehicleNumber === id)
            setEdit(current);
        }
    }, [])


    let Update = (e) => {
        e.preventDefault()
        console.log("Views", edit)
    }


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
            {/* Sidebar */}
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
                                                <img src={edit_vehicle} alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center"> Update Vehicle Form</h3>


                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form1">Vehicle Number </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={edit.vehicleNumber || ''}
                                                            onChange={(e) => setEdit({ ...edit, vehicleNumber: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form2">Name</label>
                                                        <input type="text" id="form2" className="form-control form-control-lg" value={edit.name || ''}
                                                            onChange={(e) => setEdit({ ...edit, name: e.target.value })} />

                                                    </div>


                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form3">Manufacturer</label>
                                                        <input type="text" id="form3" className="form-control form-control-lg" value={edit.manufacturer || ''}
                                                            onChange={(e) => setEdit({ ...edit, manufacturer: e.target.value })} />

                                                    </div>


                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form4"> Year of Manufacture</label>
                                                        <input type="text" id="form4" className="form-control form-control-lg"
                                                            value={edit.yearOfManufacture || ''} onChange={(e) => setEdit({ ...edit, yearOfManufacture: e.target.value })} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form5">Type</label>
                                                        <input type="text" id="form5" className="form-control form-control-lg" value={edit.type || ''}
                                                            onChange={(e) => setEdit({ ...edit, type: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form6">Description</label>
                                                        <input type="text" id="form6" className="form-control form-control-lg"
                                                            value={edit.desc || ''} onChange={(e) => setEdit({ ...edit, desc: e.target.value })} />

                                                    </div>


                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form7">Last Service Date</label>
                                                        <input type="date" id="form7" className="form-control form-control-lg" value={edit.lastServiceDate || ''}
                                                            onChange={(e) => setEdit({ ...edit, lastServiceDate: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form8">Next Service Date</label>
                                                        <input type="date" id="form8" className="form-control form-control-lg" value={edit.nextServiceDate || ''}
                                                            onChange={(e) => setEdit({ ...edit, nextServiceDate: e.target.value })} />

                                                    </div>



                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/vehicle-details')}>Cancel</button>
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg ms-2 " onClick={(e) => Update(e)}>Update</button>
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
