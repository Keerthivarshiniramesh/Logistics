import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import emp_register from '../assest/employee_register.jpg'
import Header from './Header';
import Sidebar from './Sidebar';

export default function EmployeeRegister() {
    const [sideBar, setSidebar] = useState(false);
    const use = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [change, setChange] = useState('Employee')
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



    let [employee, setEmployee] = useState({
        name: "",
        joinedDate: "",
        workingStatus: "",
        releavedOn: "",
        address: "",
        identityType: "",
        identityNumber: "",
        drivenTrips: '',
    })

    useEffect(() => {

        // Initialize MDB components
        if (window.mdb) {
            window.mdb.Input.init(); // Assuming you want to initialize the input components
        }

    }, [])

    const Create = (e, keys) => {
        let value = e.target.value

        setEmployee(prev => (
            {
                ...prev,
                [keys]: value
            }
        ))
    }


    const Save = (e) => {
        e.preventDefault()
        console.log(employee)
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
                                                <img src={emp_register}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 "
                                                />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center">Employee Registration form</h3>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form1"> Name </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={employee.name} onChange={(e) => Create(e, 'name')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form2">Joined Date</label>
                                                        <input type="date" id="form2" className="form-control form-control-lg" value={employee.joinedDate} onChange={(e) => Create(e, 'joinedDate')} />

                                                    </div>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form3">Working Status</label>
                                                        <input type="text" id="form3" className="form-control form-control-lg" value={employee.workingStatus} onChange={(e) => Create(e, 'workingStatus')} />

                                                    </div>




                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form4">Releaved On</label>
                                                        <input type="date" id="form4" className="form-control form-control-lg" value={employee.releavedOn} onChange={(e) => Create(e, 'releavedOn')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form5">Address</label>
                                                        <input type="text" id="form5" className="form-control form-control-lg" value={employee.address} onChange={(e) => Create(e, 'address')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form7">Identity Type</label>
                                                        <input type="text" id="form7" className="form-control form-control-lg" value={employee.identityType} onChange={(e) => Create(e, 'identityType')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form8">IdentityNumber</label>
                                                        <input type="text" id="form8" className="form-control form-control-lg" value={employee.identityNumber} onChange={(e) => Create(e, 'identityNumber')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form9">Driven Trips</label>
                                                        <input type="text" id="form9" className="form-control form-control-lg" value={employee.drivenTrips} onChange={(e) => Create(e, 'drivenTrips')} />

                                                    </div>




                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/employee_details')}>Cancel</button>
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg ms-2 " onClick={(e) => Save(e)}>Submit form</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* end of registration */}
                </main>
            </div>
        </div>

    )
}
