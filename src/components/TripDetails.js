import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cargo from '../assest/cargo.png';
import Sidebar from './Sidebar';
import Header from './Header';


export default function TripDetails() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Trip')
    const use = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const trips = [{
        id: 1,
        vehicleNumber: "TN10AB1234",
        employeeName: "John",
        startLocation: "Erode",
        endLocation: "Chennai",
        startTime: "2024-02-01T08:00:00Z",
        endTime: "2024-02-02T22:00:00Z",
        status: "in-transit",
        expenses: [
            { "expenseID": "EXP001", "type": "vehicle", "amount": 5000, "description": "Fuel" },
            { "expenseID": "EXP002", "type": "toll", "amount": 2000, "description": "Toll Charges" },
            { "expenseID": "EXP003", "type": "other", "amount": 2000, "description": "Other Charges" },
            { "expenseID": "EXP004", "type": "salary", "employeeID": 2, "amount": 3000, "description": "Driver salary" }
        ]
    },
    {
        id: 2,
        vehicleNumber: "TN10AB1256",
        employeeName: "Edward",
        startLocation: "Covai",
        endLocation: "Chennai",
        startTime: "2024-02-01T08:00:00Z",
        endTime: "2024-02-02T22:00:00Z",
        status: "Delivered",
        expenses: [
            { expenseID: "EXP001", type: "vehicle", amount: 5000, desc: "Fuel" },
            { expenseID: "EXP002", type: "toll", amount: 2000, desc: "Toll Charges" },
            { expenseID: "EXP003", type: "other", amount: 2000, desc: "Other Charges" },
            { expenseID: "EXP004", type: "salary", amount: 3000, desc: "Driver salary" }
        ]
    }
    ]

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
        <div className="d-flex vh-100 overflow-x-hidden">
            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>
                {/* Header Component */}
                <Header sideBar={sideBar} setSidebar={setSidebar} />

                <main className="container-fluid py-4 flex-grow-1 dash_content">
                    <h3 className='text-center '>Trip Details</h3>
                    <button className='btn btn-success m-5 float-end' onClick={() => use('/trip_register')}>Create</button>
                    <table className="table align-middle mb-0 bg-white table-striped">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Vehicle No</th>
                                <th>Employee Name</th>
                                <th>Status</th>
                                <th className='d-none d-md-table-cell'>No.of.Expenses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {trips.map((trip, index) => (
                                <tr key={index} className='tr-white'>
                                    <td className='fw-bold'>{index + 1}</td>
                                    <td><p className="fw-normal mb-1">{trip.vehicleNumber}</p></td>
                                    <td><p className="fw-normal mb-1">{trip.employeeName}</p></td>
                                    <td><span className={`badge  rounded-pill ${trip.status === 'in-transit' ? 'bg-success' : 'bg-danger'}`}>{trip.status}</span></td>
                                    <td className='d-none d-md-table-cell'><p className="fw-normal mb-1">{trip.expenses.length}</p></td>
                                    <td>
                                        <i className="bi bi-trash-fill mx-2 px-1 text-danger" role='button'></i>
                                        <i className="bi bi-pencil-square mx-2 px-1 text-primary" role='button' onClick={() => use(`/edit_trip/${trip.id}`)}></i>
                                        <i className="bi bi-eye-fill mx-2 px-1 text-success " role='button' onClick={() => use(`/view_trips/${trip.id}`)}></i>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </div>
    )
}
