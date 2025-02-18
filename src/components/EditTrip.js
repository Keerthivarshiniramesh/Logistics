import React, { useEffect, useState } from 'react'
import logo from '../assest/logistics_logo.png'
import cargo from '../assest/cargo.png'
import edit_trip from '../assest/trip_edit.png'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

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

    const [hide, setHide] = useState(false)
    const [idPass, setIdpass] = useState('')

    const trips = [{
        id: 1,
        vehicleNumber: "TN10AB1234",
        employeeId: 2,
        startLocation: "Erode",
        endLocation: "Chennai",
        startTime: "2024-02-01T08:00:00Z",
        endTime: "2024-02-02T22:00:00Z",
        status: "in-transit",
        expenses: [
            { expenseID: "EXP001", type: "vehicle", amount: 5000, desc: "Fuel" },
            { expenseID: "EXP002", type: "toll", amount: 2000, descr: "Toll Charges" },
            { expenseID: "EXP003", type: "other", amount: 2000, desc: "Other Charges" },
            { expenseID: "EXP004", type: "salary", amount: 3000, desc: "Driver salary" }
        ]
    },
    {
        id: 2,
        vehicleNumber: "TN10AB1256",
        employeeId: 1,
        startLocation: "Covai",
        endLocation: "Chennai",
        startTime: "2024-02-01T08:00:00Z",
        endTime: "2024-02-02T22:00:00Z",
        status: "Delivered",
        expenses: [
            { expenseID: "EXP001", type: "vehicle", amount: 5000, desc: "Fuel" },
            { expenseID: "EXP002", type: "toll", amount: 2000, descr: "Toll Charges" },
            { expenseID: "EXP003", type: "other", amount: 2000, desc: "Other Charges" },
            { expenseID: "EXP004", type: "salary", amount: 3000, desc: "Driver salary" }
        ]
    }
    ]


    let { id } = useParams()
    console.log(typeof (id))

    let [edit, setEdit] = useState({
        vehicleNumber: "",
        employeeId: '',
        startLocation: " ",
        endLocation: " ",
        startTime: " ",
        endTime: " ",
        status: '',
        expenses: []


    })
    useEffect(() => {
        if (id) {
            const current = trips.find((trip) => trip.id === Number(id))
            console.log("Current value", current)
            setEdit(current);
        }
    }, [])
    console.log(edit)

    let Update = (e) => {
        e.preventDefault()
        console.log("Views", edit)
    }

    function ExpenseEdit(e, i, key) {
        let { value } = e.target;
        let values
        if (key === "amount") {
            values = Number(value)
        }
        else {
            values = value
        }

        const temp = [...edit.expenses];
        temp[i] = { ...temp[i], [key]: values };
        // console.log(typeof values)
        setEdit((prevState) => ({
            ...prevState,
            expenses: temp,
        }));
    }



    let ExpenseChange = (id, i) => {
        if (id && edit.expenses && edit.expenses[i]) {
            if (edit.expenses[i].expenseID === id)
                setIdpass(id)

        }


    }


    const handleExpenseRemoval = (i) => {
        console.log("func called")
        setEdit(prev => {
            let tempTrips = { ...prev }
            let tempExpenses = tempTrips.expenses.filter((item, index) => index !== i)
            tempTrips.expenses = tempExpenses
            return tempTrips
        })
        // console.log("Create after updation:", create)
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
                                                    alt="Sample photo" className="img-fluid w-100 h-100 "
                                                />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center"> Update  Trip</h3>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold" htmlFor="form1">Vehicle Number </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={edit.vehicleNumber || ''}
                                                            onChange={(e) => setEdit({ ...edit, vehicleNumber: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label me-3 fw-bold" htmlFor="form2">Employee Id</label>
                                                        <select data-mdb-select-init value={edit.employeeId} onChange={(e) => setEdit({ ...edit, employeeId: e.target.value })}>
                                                            <option value=""> Select Employee Id</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                        </select>

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label fw-bold" htmlFor="form3">Start Location</label>
                                                        <input type="text" id="form3" className="form-control form-control-lg" value={edit.startLocation || ''}
                                                            onChange={(e) => setEdit({ ...edit, startLocation: e.target.value })} />

                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label fw-bold" htmlFor="forms">End Location</label>
                                                        <input type="tel" id="forms" className="form-control form-control-lg" value={edit.endLocation || ''}
                                                            onChange={(e) => setEdit({ ...edit, endLocation: e.target.value })} />

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label fw-bold" htmlFor="form4"> Start Date</label>
                                                        <input type="date" id="form4" className="form-control form-control-lg"
                                                            value={edit.startTime ? edit.startTime.split('T')[0] : ''} // Ensure it's binding correctly
                                                            onChange={(e) => setEdit({
                                                                ...edit, startTime: e.target.value
                                                            })}
                                                        />
                                                    </div>

                                                    <div className="form-outline mb-4">
                                                        <label className="form-label fw-bold" htmlFor="form5"> End Date</label>
                                                        <input type="date" id="form5" className="form-control form-control-lg"
                                                            value={edit.endTime ? edit.endTime.split('T')[0] : ''} // Ensure it's binding correctly
                                                            onChange={(e) => setEdit({
                                                                ...edit, endTime: e.target.value
                                                            })}
                                                        />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label me-3 fw-bold" >Status</label>
                                                        <select data-mdb-select-init value={edit.status} onChange={(e) => setEdit({ ...edit, status: e.target.value })}>
                                                            <option value=""> Select Status</option>
                                                            <option value="Processed">Processed</option>
                                                            <option value="in-transit">in-transit</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                            <option value="Delivered">Delivered</option>
                                                        </select>

                                                    </div>

                                                    <label className="form-label fs-5 text-primary fw-bold" >Expenses</label>
                                                    {
                                                        edit.expenses.map((expense, index) =>
                                                        (
                                                            <div key={index}>

                                                                <div className='w-100 d-flex justify-content-between align-items-center border rounded m-1 px-1 ' key={index}>
                                                                    <p className='m-0'>{expense.expenseID}</p>
                                                                    <div className=' d-flex justify-content-end align-items-center px-1 '>
                                                                        <i className="bi bi-pencil-square fs-6 " role='button' onClick={() => ExpenseChange(expense.expenseID, index)} />
                                                                        <i className='bi bi-x fs-4' onClick={() => handleExpenseRemoval(index)} role='button'></i>
                                                                    </div>
                                                                </div>
                                                                {idPass === expense.expenseID &&


                                                                    <div className=''>
                                                                        <div className="row">
                                                                            <div className="col-md-6 mb-4">
                                                                                <div data-mdb-input-init class="form-outline">
                                                                                    <label className="form-label fw-bold" for="form6">Type</label>
                                                                                    <input type="text" id="form6" className="form-control form-control-lg" value={expense.type} onChange={(e) => ExpenseEdit(e, index, 'type')} />

                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6 mb-4">
                                                                                <div data-mdb-input-init className="form-outline">
                                                                                    <label className="form-label fw-bold" for="form7">Amount</label>
                                                                                    <input type="text" id="form7" className="form-control form-control-lg" value={expense.amount} onChange={(e) => ExpenseEdit(e, index, 'amount')} />

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div data-mdb-input-init className="form-outline mb-4">
                                                                            <label className="form-label fw-bold" for="form8">Desc</label>
                                                                            <input type="text" id="form8" className="form-control form-control-lg" value={expense.desc} onChange={(e) => ExpenseEdit(e, index, 'desc')} />

                                                                        </div>
                                                                    </div>
                                                                }
                                                            </div>
                                                        ))
                                                    }





                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/trip_details')}>Cancel</button>
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