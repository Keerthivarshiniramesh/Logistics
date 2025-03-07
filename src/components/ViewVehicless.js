import React, { useEffect, useState } from 'react'
import view_vehi from '../assest/view_vehicle.jpg'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Loading from './Loading';

export default function ViewVehicless() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Vehicle')
    const use = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const url = process.env.REACT_APP_URL

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    let [view, setView] = useState({
        vehicleNumber: "",
        name: "",
        manufacturer: "",
        yearOfManufacture: '',
        type: "",
        desc: "",
        lastServiceDate: new Date().toISOString(),
        nextServiceDate: new Date().toISOString()

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
                        setView(data.vehicleInfo);
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
    if (view === null) {
        return (<Loading />)
    }
    return (
        <div className="d-flex vh-100 overflow-x-hidden ">

            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>

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
                                                <img src={view_vehi}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover" />
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

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Last Service Date :</label>
                                                        <p className='ps-3 d-inline-block'>{view.nextServiceDate}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Next Service Date :</label>
                                                        <p className='ps-3 d-inline-block'>{view.lastServiceDate}</p>
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
