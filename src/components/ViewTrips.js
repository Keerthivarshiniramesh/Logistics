import React, { useEffect, useState } from 'react'
import logo from '../assest/logistics_logo.png'
import cargo from '../assest/cargo.png'
import view_trip from '../assest/trip_view.png'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ViewTrips() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Trip')
    const use = useNavigate()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


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
        ],
        earnedIncome: 15000,
        totalExpenses: 10000,
        profit: 5000,

    },

    {
        id: 2,
        vehicleNumber: "TN10AB1256",
        employeeId: 1,
        startLocation: "Covai",
        endLocation: "Chennai",
        startTime: "2024-02-01T08:00:00Z",
        endTime: "2024-02-02T22:00:00Z",
        status: "transit",
        expenses: [
            { expenseID: "EXP001", type: "vehicle", amount: 5000, desc: "Fuel" },
            { expenseID: "EXP002", type: "toll", amount: 2000, descr: "Toll Charges" },
            { expenseID: "EXP003", type: "other", amount: 2000, desc: "Other Charges" },
            { expenseID: "EXP004", type: "salary", amount: 3000, desc: "Driver salary" }
        ],
        earnedIncome: 20000,
        totalExpenses: 8000,
        profit: 12000,

    }
    ]

    let [view, setView] = useState({

        vehicleNumber: "",
        employeeId: '',
        startLocation: " ",
        endLocation: " ",
        startTime: " ",
        endTime: " ",
        status: '',
        expenses: [],
        earnedIncome: '',
        totalExpenses: '',
        profit: ''
    })

    let { id } = useParams()

    useEffect(() => {
        if (id) {
            const current = trips.find((trip) => trip.id === Number(id))
            setView(current);
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
                                                <img src={view_trip}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 " />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center">  Trip Details</h3>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Vehicle Number : </label>
                                                        <p className='ps-3 d-inline-block'>{view.vehicleNumber}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Employee Id : </label>
                                                        <p className='ps-3 d-inline-block'>{view.employeeId}</p>

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" > Start Location: </label>
                                                        <p className='ps-3 d-inline-block'>{view.startLocation}</p>

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" > End Location : </label>
                                                        <p className='ps-3 d-inline-block'>{view.endLocation}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Start Date : </label>
                                                        <p className='ps-3 d-inline-block'>{view.startTime}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6 " >End Date: </label>
                                                        <p className='ps-3 d-inline-block'>{view.endTime}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Status : </label>
                                                        <p className={`badge ps-3 d-inline-block ${view.status === 'in-transit' ? 'bg-success' : 'bg-danger'}`}>{view.status}</p>


                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6">Expenses : </label>
                                                        <div className=" d-flex flex-xxl-nowrap flex-sm-wrap flex-md-wrap flex-lg-nowrap">
                                                            {
                                                                view.expenses.map((expense, index) =>
                                                                (
                                                                    <div key={index} className=" border border-primary m-1 rounded  ">

                                                                        <p className='d-inline-block flex-fill  p-1 '>{`Type :  ${expense.type}`}</p>
                                                                        <p className='d-inline-block flex-fill p-1'>{`Amount :  ${expense.amount}`}</p>
                                                                        <p className='d-inline-block flex-fill p-1'>{`Desc :  ${expense.desc === undefined ? "Null" : expense.desc}`}</p>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Earned Income  : </label>
                                                        <p className={`ps-3 d-inline-block `}>{view.earnedIncome}</p>


                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Total Expenses : </label>
                                                        <p className={` ps-3 d-inline-block `}>{view.totalExpenses}</p>


                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label fw-bold fs-6" >Profit : </label>
                                                        <p className={` ps-3 d-inline-block `}>{view.profit}</p>


                                                    </div>

                                                    <div className="d-flex justify-content-end pt-3">

                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg ms-2 " onClick={() => use('/trip_details')}>Cancel</button>
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
