import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import trip_register from '../assest/trip_register.png'
import Header from './Header';
import Sidebar from './Sidebar';

export default function TripRegister() {
    const [sideBar, setSidebar] = useState(false);
    const use = useNavigate()
    const [change, setChange] = useState('Trip')
    const [employeeId, setemployeeId] = useState("Employee Id");

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const employees = [{
        id: 1,
        name: "John Doe",
        joinedDate: "2023-05-10T00:00:00Z",
        workingStatus: "Active",
        releavedOn: "2024-02-05T10:00:00Z",
        address: "26 St, Coimbatore",
        identityType: "Aadhar",
        identityNumber: "1234-5678-9012",
        drivenTrips: 26,
    },
    {
        id: 2,
        name: "Edward",
        joinedDate: "2024-10-10T00:00:00Z",
        workingStatus: "Active",
        releavedOn: "2026-02-05T10:00:00Z",
        address: "35 St, Coimbatore",
        identityType: "Aadhar",
        identityNumber: "2134-7658-0921",
        drivenTrips: 12,
    }
    ];

    const vehicles = [
        {
            vehicleNumber: "TN10AB1234",
            name: "Truck-001",
            manufacturer: "Tata",
            yearOfManufacture: 2020,
            type: "Heavy Truck",
            desc: "Regular maintenance required",
            lastServiceDate: '2025-02-05',
            nextServiceDate: '2025-05-15'
        },
        {
            vehicleNumber: "TN10AB1256",
            name: "Truck-002",
            manufacturer: "AL",
            yearOfManufacture: 2021,
            type: "Truck",
            desc: "Regular maintenance required",
            lastServiceDate: '2025-01-05',
            nextServiceDate: '2025-04-21'
        }
    ];


    let [trips, setTrips] = useState({
        vehicleNumber: "",
        employeeName: '',
        startLocation: " ",
        endLocation: " ",
        startTime: " ",
        endTime: " ",
        status: '',
        expenses: []
        // { expenseID: "", type: "", amount: "''", description: "" }
        // { "expenseID": "EXP002", "type": "toll", "amount": 2000, "description": "Toll Charges" },
        // { "expenseID": "EXP003", "type": "other", "amount": 2000, "description": "Other Charges" },
        // { "expenseID": "EXP004", "type": "salary", "employeeID": 1, "amount": 3000, "description": "Driver salary" }

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

        // console.log("h w:", typeof heights, widths)

        setTrips((prev) => ({
            ...prev,
            expenses: [
                ...prev.expenses,
                { type: type, amount: amount, description: desc },],
        }));

    }

    const handleExpenseRemoval = (i) => {
        console.log("func called")
        setTrips(prev => {
            let tempTrips = { ...prev }
            let tempExpenses = tempTrips.expenses.filter((item, index) => index !== i)
            tempTrips.expenses = tempExpenses
            return tempTrips
        })
        // console.log("Create after updation:", create)
    }

    const formData = new FormData()

    const Save = (e) => {
        e.preventDefault()
        console.log(trips)
        // formData.append()
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
                                                <img src={trip_register}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover"
                                                />
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
                                                        <select className='form-select' aria-label="select emp name" value={trips.employeeName} onChange={(e) => Create(e, 'employeeName')}>
                                                            <option value=""> Select Employee Name</option>
                                                            {
                                                                employees.map((emp, index) =>
                                                                (
                                                                    <option key={index} value={emp.name}>{emp.name}</option>
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
                                                        <label className="form-label fw-bold" htmlFor="form5">Start Date</label>
                                                        <input type="date" id="form5" className="form-control form-control-lg" value={trips.startTime} onChange={(e) => Create(e, 'startTime')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold" htmlFor="form6">End Date</label>
                                                        <input type="date" id="form6" className="form-control form-control-lg" value={trips.endTime} onChange={(e) => Create(e, 'endTime')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label me-3 fw-bold" >Status</label>
                                                        <select className='form-select' aria-label="select status" value={trips.status} onChange={(e) => Create(e, 'status')}>
                                                            <option value=""> Select Status</option>
                                                            <option value="Processed">Processed</option>
                                                            <option value="in-transit">in-transit</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>

                                                    </div>

                                                    <label className="form-label fs-5 text-primary fw-bold" >Expenses</label>
                                                    <div class="row">
                                                        <div class="col-md-6 mb-2">
                                                            <div data-mdb-input-init class="form-outline">
                                                                <label class="form-label fw-bold" for="form7">Type</label>
                                                                <select className='form-select' aria-label="select status" ref={typeRef}>
                                                                    <option value=""> Select Types</option>
                                                                    <option value="Fuel">Fuel</option>
                                                                    <option value="Toll">Toll</option>
                                                                    <option value="Other">Other</option>

                                                                </select>

                                                            </div>
                                                        </div>
                                                        <div class="col-md-6 mb-2">
                                                            <div data-mdb-input-init class="form-outline">
                                                                <label class="form-label fw-bold" for="form8">Amount</label>
                                                                <input type="text" id="form8" class="form-control form-control-lg" ref={amountRef} />

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
