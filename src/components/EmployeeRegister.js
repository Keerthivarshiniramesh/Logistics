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

    const url = process.env.REACT_APP_URL

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [active, setActive] = useState(false)

    let [employee, setEmployee] = useState({
        name: "",
        number: '',
        email: '',
        joinedDate: new Date().toISOString(),
        workingStatus: false,
        releavedOn: "",
        address: "",
        identityType: "",
        identityNumber: "",
        salaryPerMonth: "",

    })

    const Create = (e, keys) => {
        let value = e.target.value
        let types = e.target.type
        let check = e.target.checked

        if (types === "checkbox") {
            setEmployee(prev => (
                {
                    ...prev,
                    [keys]: check
                }))
            setActive(!active)
        }
        else {
            setEmployee(prev => (
                {
                    ...prev,
                    [keys]: value
                }))
        }
    }

    const Save = (e) => {

        e.preventDefault()
        
        fetch(`${url}create-employee`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: employee.name, email: employee.email, phonenumber: employee.number, joinedDate: employee.joinedDate,
                    salaryPermonth: Number(employee.salaryPerMonth), address: employee.address, identityType: employee.identityType, identityNumber: employee.identityNumber
                    , workingStatus: employee.workingStatus
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(employee)
                if (data.success === true) {
                    alert(data.message)
                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            }
            )

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
                                                <img src={emp_register} alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover " />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center">Employee Registration form</h3>


                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form1"> Name </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={employee.name} onChange={(e) => Create(e, 'name')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="forms"> Phone Number </label>
                                                        <input type="text" id="forms" className="form-control form-control-lg" value={employee.number} onChange={(e) => Create(e, 'number')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="forms1"> Email </label>
                                                        <input type="email" id="forms1" className="form-control form-control-lg" value={employee.email} onChange={(e) => Create(e, 'email')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form2">Joined Date</label>
                                                        <input type="date" id="form2" className="form-control form-control-lg" value={employee.joinedDate} onChange={(e) => Create(e, 'joinedDate')} />

                                                    </div>


                                                    <div data-mdb-input-init className="form-outline my-3">
                                                        <label className="form-label fw-bold" htmlFor="form3">Working Status : </label>
                                                        <input type="checkbox" id="form3" name="workingStatus" className="fs-6 ms-3 me-1" checked={employee.workingStatus} onChange={(e) => Create(e, 'workingStatus')} />Active

                                                    </div>

                                                    <div data-mdb-input-init className={`form-outline mb-2 ${active ? 'disabled-div' : ''}`}>
                                                        <label className="form-label fw-bold" htmlFor="form4">Releaved On</label>
                                                        <input type="date" id="form4" className="form-control form-control-lg" value={employee.releavedOn} onChange={(e) => Create(e, 'releavedOn')} disabled={active} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form5">Address</label>
                                                        <input type="text" id="form5" className="form-control form-control-lg" value={employee.address} onChange={(e) => Create(e, 'address')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form7">Identity Type</label>
                                                        <input type="text" id="form7" className="form-control form-control-lg" value={employee.identityType} onChange={(e) => Create(e, 'identityType')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form8">IdentityNumber</label>
                                                        <input type="text" id="form8" className="form-control form-control-lg" value={employee.identityNumber} onChange={(e) => Create(e, 'identityNumber')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form9">Per Month Salary</label>
                                                        <input type="text" id="form9" className="form-control form-control-lg" value={employee.salaryPerMonth} onChange={(e) => Create(e, 'salaryPerMonth')} />

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
