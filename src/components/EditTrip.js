import React, { useEffect, useRef, useState } from 'react'
import edit_trip from '../assest/trip_edit.png'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Loading from './Loading';

export default function EditTrip() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Trip')
    const use = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [idPass, setIdpass] = useState('')

    const url = process.env.REACT_APP_URL


    let [edit, setEdit] = useState({
        vehicleNumber: "",
        employeeId: '',
        startLocation: "",
        endLocation: "",
        startTime: "",
        endTime: "",
        status: '',
        expenses: []

    })
    let [exp, setExpenses] = useState([])


    const [employees, setEmployee] = useState(null);
    useEffect(() => {
        fetch(`${url}fetch-employee`,
            {
                method: 'GET',
                credentials: 'include',

            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setEmployee(data.EmployeeData);

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })

    }, [])

    let [vehicles, setVehicle] = useState(null)

    useEffect(() => {
        fetch(`${url}fetch-vehicle`,
            {
                method: 'GET',
                credentials: 'include',

            })
            .then(res => res.json())
            .then(data => {
                console.log("fetched success")
                if (data.success === true && data.vehicleInfo) {
                    setVehicle(data.vehicleInfo);

                }
                else {
                    alert(data.message)
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })

    }, [url])

    let { id } = useParams()


    useEffect(() => {
        if (id) {
            fetch(`${url}fetch-trip/${id}`,
                {
                    method: 'GET',
                    credentials: 'include',

                })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true && data.trip) {
                        setEdit(data.trip);
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
    }, [id])


    // vehicleNumber, employeeId, startLocation, endLocation, startTime, endTime, status, expenses, earnedIncome
    let Update = (e) => {
        e.preventDefault()
        // console.log("Update", {
        //             vehicleNumber: edit.vehicleNumber.toLowerCase(), employeeId: edit.employeeId, startLocation: edit.startLocation, endLocation: edit.endLocation,
        //             startTime: edit.startTime, endTime: edit.endTime, status: edit.status, expenses: edit.expenses

        //         })

        fetch(`${url}update-trip/${id}`,
            {
                method: 'POST',
                headers:
                {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    vehicleNumber: edit.vehicleNumber, employeeId: edit.employeeId, startLocation: edit.startLocation, endLocation: edit.endLocation,
                    startTime: edit.startTime, endTime: edit.endTime, status: edit.status, expenses: exp

                })

            })
            .then(res => res.json())
            .then(data => {
                alert(data.message)
                if (data.success === true) {
                    window.location.href = "/trip_details"
                }
            })
            .catch(err => {
                console.log("Error : ", err)
                alert("Trouble in connecting to the Server !!!")
            })


    }
    // Expeneses functions
    const [view, setView] = useState(false)
    let typeRef = useRef(null)
    let amountRef = useRef(null)
    let descRef = useRef(null)

    const Add = (e) => {
        e.preventDefault()
        let type = typeRef.current.value
        let amount = Number(amountRef.current.value)
        let description = descRef.current.value

        let newExpense = { type, amount, description };

        setExpenses((prevState) => ([
            ...prevState,
            newExpense, // Append instead of replacing
        ]));
        typeRef.current.value = "";
        amountRef.current.value = "";
        descRef.current.value = "";
        setView(!view)
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

    console.log("edit vehicleNumber:", vehicles, employees, edit)



    if (vehicles === null || employees === null || edit.vehicleNumber === "" || edit.employeeId === '' || edit.startLocation === "" || edit.endLocation === "" || edit.startTime === "" || edit.endTime === "" || edit.status === '' || edit.expenses.length === 0) {
        return (<Loading />)
    }

    return (
        <div className="d-flex vh-100 overflow-x-hidden ">
            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>

                {/* Header */}
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
                                                <img src={edit_trip}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center"> Update  Trip</h3>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form1">Vehicle Number </label>
                                                        <select className='form-select' aria-label="select vehicle number" value={edit.vehicleNumber.toLowerCase()} onChange={(e) => setEdit({ ...edit, vehicleNumber: e.target.value || '' })}>
                                                            <option value=""> Select Vehicle Number</option>

                                                            {
                                                                vehicles && vehicles.map((vehi, index) =>
                                                                (
                                                                    <option key={index} value={vehi.vehicleNumber.toLowerCase() || ""}>{vehi.vehicleNumber}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label me-3 fw-bold" htmlFor="form2">Employee Name</label>
                                                        <select className='form-select' aria-label="select emp name" value={edit.employeeId} onChange={(e) => setEdit({ ...edit, employeeId: e.target.value })}>
                                                            <option value=""> Select Employee Name</option>

                                                            {
                                                                employees.map((emp, index) =>
                                                                (
                                                                    <option key={index} value={emp.id}>{emp.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form3">Start Location</label>
                                                        <input type="text" id="form3" className="form-control form-control-lg" value={edit.startLocation || ''}
                                                            onChange={(e) => setEdit({ ...edit, startLocation: e.target.value })} />

                                                    </div>

                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="forms">End Location</label>
                                                        <input type="tel" id="forms" className="form-control form-control-lg" value={edit.endLocation || ''}
                                                            onChange={(e) => setEdit({ ...edit, endLocation: e.target.value })} />
                                                    </div>

                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form4"> Start Time</label>
                                                        <input type="date" id="form4" className="form-control form-control-lg"
                                                            value={edit.startTime ? edit.startTime.split('T')[0] : ''}
                                                            onChange={(e) => setEdit({ ...edit, startTime: e.target.value })} />
                                                    </div>

                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form5"> End Time</label>
                                                        <input type="date" id="form5" className="form-control form-control-lg"
                                                            value={edit.endTime ? edit.endTime.split('T')[0] : ''}
                                                            onChange={(e) => setEdit({ ...edit, endTime: e.target.value })} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label me-3 fw-bold" >Status</label>
                                                        <select className='form-select' aria-label="select status " value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value })}>
                                                            <option value=""> Select Status</option>
                                                            <option value="created">created</option>
                                                            <option value="in-transit">in-transit</option>
                                                            <option value="cancelled">cancelled</option>
                                                            <option value="delivered">delivered</option>
                                                        </select>
                                                    </div>

                                                    <div className='d-flex justify-content-between p-1'>
                                                        <label className="form-label fs-5 text-primary fw-bold" >Expenses</label>
                                                        <button className='btn btn-primary ' onClick={() => setView(!view)}>Add</button>
                                                    </div>

                                                    <div className='position-relative'>
                                                        {
                                                            edit.expenses.map((expense, expIndex) => (
                                                                <div key={expIndex} className={`  ${view ? "blur-table" : ""}`}>
                                                                    <div className='w-100 d-flex justify-content-between align-items-center border rounded m-1 px-1'>
                                                                        <p className='m-0 m-1'>{expense.type}</p>
                                                                    </div>
                                                                    {exp.map((ex, subIndex) => (
                                                                        <div key={subIndex} className='w-100 d-flex justify-content-between align-items-center border rounded m-1 px-1'>
                                                                            <p className='m-0 m-1'>{ex.type}</p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            ))

                                                        }
                                                        <div className=''>
                                                            {
                                                                view &&
                                                                <div className='position-absolute bg-light border border-primaty rounded  position'>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div data-mdb-input-init className="form-outline">
                                                                                <label className="form-label fw-bold" htmlFor="form7">Type</label>
                                                                                <select className='form-select' aria-label="select status" ref={typeRef}>
                                                                                    <option value=""> Select Types</option>
                                                                                    <option value="vehicle">Vehicle</option>
                                                                                    <option value="toll">Toll</option>
                                                                                    <option value="other">Other</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 ">
                                                                            <div data-mdb-input-init className="form-outline">
                                                                                <label className="form-label fw-bold" htmlFor="form8">Amount</label>
                                                                                <input type="text" id="form8" className="form-control form-control-lg" ref={amountRef} />

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div data-mdb-input-init className="form-outline">
                                                                                <label className="form-label fw-bold" htmlFor="form9">Description</label>
                                                                                <input type="text" id="form9" className="form-control " ref={descRef} />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6 ">
                                                                            <button className="btn btn-light mt-4 mx-1" onClick={() => setView(false)}>Cancel</button>
                                                                            <button className="btn btn-primary mt-4" onClick={(e) => Add(e)}>Save</button>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/trip_details')}>Cancel</button>
                                                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg ms-2 " onClick={(e) => Update(e)}>Update</button>
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