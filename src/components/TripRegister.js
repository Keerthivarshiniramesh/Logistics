import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import trip_register from '../assest/trip_register.png'
import Header from './Header';
import Sidebar from './Sidebar';

export default function TripRegister() {
    const [sideBar, setSidebar] = useState(false);
    const use = useNavigate()
    const [change, setChange] = useState('Trip')
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const url = process.env.REACT_APP_URL

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
                if (data.success === true) {
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

    }, [])

    let [trips, setTrips] = useState({
        vehicleNumber: "",
        employeeId: '',
        startLocation: " ",
        endLocation: " ",
        startTime: " ",
        endTime: " ",
        status: '',
        expenses: []

    })

    const Create = (e, keys) => {
        let { value } = e.target

        setTrips(prev => (
            {
                ...prev,
                [keys]: value
            }
        ))
    }

    let typeRef = useRef(null)
    let amountRef = useRef(null)
    let descRef = useRef(null)

    const Add = (e) => {
        e.preventDefault()
        let type = typeRef.current.value
        let amount = Number(amountRef.current.value)
        let desc = descRef.current.value

        setTrips((prev) => ({
            ...prev,
            expenses: [
                ...prev.expenses,
                { type: type, amount: amount, description: desc },],
        }));
        typeRef.current.value = ""
        amountRef.current.value = ""
        descRef.current.value = ""

    }

    const handleExpenseRemoval = (i) => {
        console.log("func called")
        setTrips(prev => {
            let tempTrips = { ...prev }
            let tempExpenses = tempTrips.expenses.filter((item, index) => index !== i)
            tempTrips.expenses = tempExpenses
            return tempTrips
        })
    }

    const Save = (e) => {
        e.preventDefault()

        fetch(`${url}create-trip`,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({
                    vehicleNumber: trips.vehicleNumber, employeeId: Number(trips.employeeId), startLocation: trips.startLocation,
                    endLocation: trips.endLocation, startTime: trips.startTime, endTime: trips.endTime, expenses: trips.expenses
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message)
                    use('/trip_details')
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

    if (vehicles === null || employees === null) {
        return (<div>
            <div className="d-flex justify-content-center m-5 align-content-center">
                <div className="spinner-border" role="status">
                    <p></p><span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>)
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
                                                <img src={trip_register}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center">Trip Register</h3>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form1">Vehicle Number </label>
                                                        <select className='form-select' aria-label="select vehicle number" value={trips.vehicleNumber} onChange={(e) => Create(e, 'vehicleNumber')}>
                                                            <option value=""> Select Vehicle Number</option>

                                                            {
                                                                vehicles.map((vehi, index) =>
                                                                (
                                                                    <option key={index} value={vehi.vehicleNumber}>{vehi.vehicleNumber}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label me-3 fw-bold" >Employee Name  </label>
                                                        <select className='form-select' aria-label="select emp name" value={trips.employeeId} onChange={(e) => Create(e, 'employeeId')}>
                                                            <option value=""> Select Employee Name</option>
                                                            {
                                                                employees.map((emp, index) =>
                                                                (
                                                                    <option key={index} value={emp.id}>{emp.name}</option>
                                                                ))
                                                            }
                                                        </select>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form3">Start Location</label>
                                                        <input type="text" id="form3" className="form-control form-control-lg" value={trips.startLocation} onChange={(e) => Create(e, 'startLocation')} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form4">End Location</label>
                                                        <input type="text" id="form4" className="form-control form-control-lg" value={trips.endLocation} onChange={(e) => Create(e, 'endLocation')} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form5">Start Time</label>
                                                        <input type="datetime-local" id="form5" className="form-control form-control-lg" value={trips.startTime} onChange={(e) => Create(e, 'startTime')} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form6">End Time</label>
                                                        <input type="datetime-local" id="form6" className="form-control form-control-lg" value={trips.endTime} onChange={(e) => Create(e, 'endTime')} />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label me-3 fw-bold" >Status</label>
                                                        <select className='form-select' aria-label="select status" value="created" disabled>

                                                            <option value="created">created</option>
                                                            <option value="in-transit">in-transit</option>
                                                            <option value="cancelled">cancelled</option>
                                                            <option value="delivered">delivered</option>
                                                        </select>
                                                    </div>

                                                    <label className="form-label fs-5 text-primary fw-bold" >Expenses</label>
                                                    <div className="row">
                                                        <div className="col-md-6 mb-2">
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
                                                        <div className="col-md-6 mb-2">
                                                            <div data-mdb-input-init className="form-outline">
                                                                <label className="form-label fw-bold" htmlFor="form8">Amount</label>
                                                                <input type="text" id="form8" className="form-control form-control-lg" ref={amountRef} />

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form9">Description</label>
                                                        <input type="text" id="form9" className="form-control form-control-lg" ref={descRef} />
                                                        <button className="btn btn-primary m-2" onClick={(e) => Add(e)}>Add</button>
                                                    </div>

                                                    <div>
                                                        {(trips.expenses && trips.expenses.length > 0) &&
                                                            trips.expenses.map((item, index) => {
                                                                return (
                                                                    <div className='w-100 d-flex justify-content-between align-items-center border rounded m-1 px-1' key={index}>
                                                                        <p className='m-0'>{item.type}</p>
                                                                        <i className='bi bi-x fs-4' onClick={() => handleExpenseRemoval(index)} role='button'></i>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>

                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/trip_details')}>Cancel</button>
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
