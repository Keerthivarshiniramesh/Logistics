import React, { useEffect, useState } from 'react'
import edit_employee from '../assest/edit_employee.png'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Loading from './Loading';

export default function EditEmployee() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Employee')
    const use = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const url = process.env.REACT_APP_URL



    let { id } = useParams()
    console.log(typeof (id))

    let [edit, setEdit] = useState({

        name: "",
        Email: '',
        phoneNumber: '',
        joinedDate: "",
        workingStatus: false,
        releavedOn: "",
        address: "",
        identityType: "",
        identityNumber: "",
        salaryPerMonth: "",
    })

    useEffect(() => {
        if (id) {
            fetch(`${url}fetch-employee/${id}`,
                {
                    method: 'GET',
                    credentials: 'include',

                })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        setEdit(data.EmployeeData);
                        if (data.EmployeeData.workingStatus === true) {
                            setActive(true)
                        }
                        else {
                            setActive(false)
                        }

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


    const [active, setActive] = useState(false)

    console.log(active)


    let Update = (e) => {
        // name, phonenumber, joinedDate, address, identityType, identityNumber, workingStatus

        e.preventDefault()

        fetch(`${url}Update-employee/${id}`,
            {
                method: 'PUT',
                headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"

                },
                credentials: 'include',
                body: JSON.stringify({
                    name: edit.name, phonenumber: edit.phoneNumber, joinedDate: edit.joinedDate, address: edit.address,
                    identityType: edit.identityType, identityNumber: edit.identityNumber, workingStatus: edit.workingStatus,
                    releavedOn: edit.releavedOn
                })


            })
            .then(res => res.json())
            .then(data => {

                if (data.success === true) {
                    alert(data.message)
                    console.log(edit)
                    use('/employee_details')
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
                                                <img src={edit_employee} alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center"> Update Employee Detials</h3>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form1">Name </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={edit.name || ''}
                                                            onChange={(e) => setEdit({ ...edit, name: e.target.value })} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form1">Email </label>
                                                        <input type="email" id="form1" className="form-control form-control-lg" value={edit.Email || ''}
                                                            onChange={(e) => setEdit({ ...edit, Email: e.target.value })} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form1">Phone Number </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={edit.phoneNumber || ''}
                                                            onChange={(e) => { setEdit({ ...edit, phoneNumber: e.target.value }) }} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form2">Joined Date</label>
                                                        <input type="date" id="form2" className="form-control form-control-lg" value={edit.joinedDate ? edit.joinedDate.split('T')[0] : ''}
                                                            onChange={(e) => setEdit({ ...edit, joinedDate: e.target.value })} />
                                                    </div>

                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form3">Working Status</label>

                                                        <input type="checkbox" id="form3" name="status" className="fs-6 ms-3 me-1" checked={edit.workingStatus}
                                                            onChange={(e) => {
                                                                setEdit({ ...edit, workingStatus: e.target.checked })
                                                                setActive(!active)
                                                            }} />Active

                                                    </div>

                                                    <div className={`form-outline mb-2 ${active ? 'disabled-div' : ''}`}>
                                                        <label className="form-label fw-bold" htmlFor="form4"> Releaved On</label>
                                                        <input type="date" id="form4" className="form-control form-control-lg"
                                                            value={edit.releavedOn ? edit.releavedOn.split('T')[0] : ''}
                                                            onChange={(e) => setEdit({ ...edit, releavedOn: e.target.value })} disabled={active} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form5">Address</label>
                                                        <input type="text" id="form5" className="form-control form-control-lg" value={edit.address || ''}
                                                            onChange={(e) => setEdit({ ...edit, address: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form6">Identity Type</label>
                                                        <input type="text" id="form6" className="form-control form-control-lg"
                                                            value={edit.identityType || ''} onChange={(e) => setEdit({ ...edit, identityType: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form7">Identity Number</label>
                                                        <input type="text" id="form7" className="form-control form-control-lg"
                                                            value={edit.identityNumber || ''} onChange={(e) => setEdit({ ...edit, identityNumber: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form8">Per Month Salary</label>
                                                        <p type="text" id="form8"
                                                            className="form-control form-control-lg" >{edit.salaryPerMonth} </p>

                                                    </div>

                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/employee_details')}>Cancel</button>
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