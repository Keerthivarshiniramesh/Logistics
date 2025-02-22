import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function EmployeeDetails() {
    const [sideBar, setSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [change, setChange] = useState('Employee')
    const [view, setView] = useState(false)
    const use = useNavigate();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const employees = [{
        id: 1,
        name: "John Doe",
        joinedDate: "2023-05-10T00:00:00Z",
        workingStatus: false,
        releavedOn: "2024-02-05T10:00:00Z",
        address: "26 St, Coimbatore",
        identityType: "Aadhar",
        identityNumber: "1234-5678-9012",
        drivenTrips: 26,
        salaryPerMonth: 10000,
        sendTotalSalary: 15000,
        remainingSalary: 5000,
        salaryTransactions: [
            { id: 1, description: "jan salary", amount: 10000 },
            { id: 2, description: "feb salary advance", amount: 5000 }
        ]
    },
    {
        id: 2,
        name: "Edward",
        joinedDate: "2024-10-10T00:00:00Z",
        workingStatus: true,
        releavedOn: "",
        address: "35 St, Coimbatore",
        identityType: "Aadhar",
        identityNumber: "2134-7658-0921",
        drivenTrips: 12,
        salaryPerMonth: 20000,
        sendTotalSalary: 20000,
        remainingSalary: 10000,
        salaryTransactions: [
            { id: 1, description: "jan salary", amount: 20000 },
            { id: 2, description: "feb salary advance", amount: 10000 }
        ]
    }
    ];


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
    // Employee Salary codes

    let [salary, setSalary] = useState({ description: '', amount: '' })
    const [employeeName, setEmployeename] = useState('')

    let handleSalary = (empId, i) => {
        setView(!view)
        if (empId === employees[i].id)
            setEmployeename(employees[i].name)


    }

    let createSalary = (e, keys) => {
        let { value } = e.target
        setSalary(prev => ({
            ...prev,
            [keys]: value
        }))

    }

    let Save = (e) => {
        e.preventDefault()
        console.log("Salary:", salary)

    }

    return (
        <div className="d-flex vh-100 overflow-x-hidden">

            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || windowWidth >= 768 ? "250px" : "0" }}>

                {/* Header Component */}
                <Header sideBar={sideBar} setSidebar={setSidebar} />

                <main className="container-fluid py-4 flex-grow-1 dash_content">
                    <h3 className='text-center '>Employee Details</h3>

                    <div className={view ? "blur-table" : ""}>
                        <button className='btn btn-success m-5 float-end' onClick={() => use('/employee_register')}>Create</button>
                        <table className="table align-middle mb-0 bg-white table-striped">
                            <thead>
                                <tr>
                                    <th>S.No</th>
                                    <th>Name</th>
                                    <th className='d-none d-md-table-cell'>Joined Date</th>
                                    <th>Status</th>
                                    <th>Trips</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp, index) => (
                                    <tr key={index} className='tr-white'>
                                        <td className='fw-bold'>{index + 1}</td>
                                        <td><p className="fw-normal mb-1">{emp.name}</p></td>
                                        <td className='d-none d-md-table-cell'><p className="fw-normal mb-1">{emp.joinedDate}</p></td>
                                        <td> <span className={`badge  rounded-pill ${emp.workingStatus === true ? 'bg-success' : 'bg-danger'} `}>{`${emp.workingStatus === true ? 'Active' : 'In-active'}`}</span></td>
                                        <td><p className="fw-normal mb-1">{emp.drivenTrips}</p></td>
                                        <td>
                                            <i className="bi bi-trash-fill mx-2 px-1 text-danger" role='button'></i>
                                            <i className="bi bi-pencil-square mx-2 px-1 text-primary" onClick={() => use(`/employee_edit/${emp.id}`)} role='button'></i>
                                            <i className="bi bi-eye-fill mx-2 px-1 text-success " onClick={() => use(`/employee_view/${emp.id}`)} role='button'></i>
                                            <i className="bi bi-currency-rupee mx-2  text-success" onClick={() => handleSalary(emp.id, index)} role='button'></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>


                    <div className='position-relative  '>
                        {
                            view &&
                            <div className="position-absolute w-100 h-100  d-flex justify-content-center align-items-center">
                                <div className=' border border-white mt-4 p-4 bg-light'>
                                    <h3 className=" text-uppercase text-center">Salary</h3>
                                    <h6 className='  d-flex justify-content-end text-danger' >{employeeName}</h6>
                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form1"> Description </label>
                                        <input type="text" id="form1" className="form-control form-control-lg" value={salary.description} onChange={(e) => createSalary(e, 'description')} />

                                    </div>

                                    <div data-mdb-input-init className="form-outline mb-4">
                                        <label className="form-label" htmlFor="form2">Amount</label>
                                        <input type="text" id="form2" className="form-control form-control-lg" value={salary.amount} onChange={(e) => createSalary(e, 'amount')} />

                                    </div>
                                    <div className="d-flex justify-content-end pt-3">
                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => setView(false)}>Cancel</button>
                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg ms-2 " onClick={(e) => Save(e)}>Save </button>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </main>


            </div>
        </div>
    )
}
