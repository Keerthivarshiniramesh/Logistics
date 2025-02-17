import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

export default function EmployeeDetails() {
    const [sideBar, setSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [change, setChange] = useState('Employee')
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
            {/* Sidebar */}
            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || windowWidth >= 768 ? "250px" : "0" }}>
                {/* Header */}
                {/* Header Component */}
                <Header sideBar={sideBar} setSidebar={setSidebar} />


                <main className="container-fluid py-4 flex-grow-1 dash_content">
                    <h3 className='text-center '>Employee Details</h3>
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
                                    <td> <span className="badge bg-success rounded-pill">{emp.workingStatus}</span></td>
                                    <td><p className="fw-normal mb-1">{emp.drivenTrips}</p></td>
                                    <td>
                                        <i className="bi bi-trash-fill mx-2 px-1 text-danger"></i>
                                        <i className="bi bi-pencil-square mx-2 px-1 text-primary" onClick={() => use(`/employee_edit/${emp.id}`)}></i>
                                        <i className="bi bi-eye-fill mx-2 px-1 text-success " onClick={() => use(`/employee_view/${emp.id}`)}></i>
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
