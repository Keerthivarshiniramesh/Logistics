import React, { useEffect, useState } from 'react'
import edit_vehicle from '../assest/edit_vehicle.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Loading from './Loading';

export default function EditVehicle() {

    const url = process.env.REACT_APP_URL

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Vehicle')
    const use = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const formatDate = (isoString) => {
        if (!isoString) return ""; // Handle empty values
        return new Date(isoString).toISOString().split('T')[0]; // Extracts "YYYY-MM-DD"
    };

    let [edit, setEdit] = useState({

        vehicleNumber: '',
        name: '',
        manufacturer: '',
        yearOfManufacture: '',
        type: '',
        desc: '',
        lastServiceDate: formatDate(new Date()), // Convert to YYYY-MM-DD
        nextServiceDate: formatDate(new Date())

    })

    let { id } = useParams()

    useEffect(() => {
        if (id) {
            fetch(`${url}fetch-vehicle/${id}`,
                {
                    method: 'GET',
                    credentials: 'include',

                })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        // setEdit(data.vehicleInfo);
                        setEdit({
                            ...data.vehicleInfo,
                            lastServiceDate: formatDate(data.vehicleInfo.lastServiceDate),
                            nextServiceDate: formatDate(data.vehicleInfo.nextServiceDate),
                        });

                    }
                    else {
                        alert(data.message)
                    }
                })
                .catch(err => {
                    console.log("Error : ", err)
                    alert("Trouble in connecting to the Server !!!")
                })
        }
    }, [])

    let Update = (e) => {
        e.preventDefault()

        fetch(`${url}vehicle-maintance/${id}`,
            {
                method: 'PUT',
                headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },

                credentials: 'include',
                body: JSON.stringify({
                    name: edit.name, manufacturer: edit.manufacturer, yearofmanufacture: edit.yearOfManufacture,
                    type: edit.type, desc: edit.desc, lastServiceDate: edit.lastServiceDate, nextServiceDate: edit.nextServiceDate
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message)
                    use('/vehicle-details')
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })

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

    if (edit === null) {
        return (<Loading />)
    }

    return (
        <div className="d-flex vh-100 overflow-x-hidden ">
            {/* Sidebar */}

            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>

                {/* Header Component */}
                <Header sideBar={sideBar} setSidebar={setSidebar} />

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
                                                        <p className='form-control form-control-lg'>{edit.vehicleNumber}</p>

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
                                                        <input type="nutextmber" id="form4" className="form-control form-control-lg"
                                                            value={edit.yearOfManufacture || ''} onChange={(e) => setEdit({ ...edit, yearOfManufacture: Number(e.target.value) })} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form5">Type</label>
                                                        <select className='form-select' aria-label="select status " value={edit.type} onChange={(e) => setEdit({ ...edit, type: e.target.value })}>
                                                            <option value=""> Select Truck</option>
                                                            <option value="Tipper Truck">Tipper Truck</option>
                                                            <option value="Container Truck">Container Truck</option>
                                                            <option value="Tanker Truck">Tanker Truck</option>
                                                        </select>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form6">Description</label>
                                                        <input type="text" id="form6" className="form-control form-control-lg"
                                                            value={edit.desc || ''} onChange={(e) => setEdit({ ...edit, desc: e.target.value })} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form7">Last Service Date</label>
                                                        <input type="date" id="form7" className="form-control form-control-lg" value={edit.lastServiceDate}
                                                            onChange={(e) => setEdit({ ...edit, lastServiceDate: e.target.value })} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form8">Next Service Date</label>
                                                        <input type="date" id="form8" className="form-control form-control-lg" value={edit.nextServiceDate}
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
