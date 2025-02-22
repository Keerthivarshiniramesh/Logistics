import React, { useEffect, useState } from 'react'
import view_emp from '../assest/employee_view.png'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function ViewEmployee() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Employee')
    const use = useNavigate()
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
    let [view, setView] = useState({

        name: "",
        joinedDate: "",
        workingStatus: "",
        releavedOn: "",
        address: "",
        identityType: "",
        identityNumber: "",
        drivenTrips: "",
        salaryPerMonth: "",
        sendTotalSalary: "",
        remainingSalary: "",
        salaryTransactions: []


    })

    let { id } = useParams()

    useEffect(() => {
        if (id) {
            const current = employees.find((emp) => emp.id === Number(id))
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
                                                <img src={view_emp}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-3 text-uppercase text-center">  Employee Details</h3>


                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Name : </label>
                                                        <p className='ps-3 d-inline-block'>{view.name}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Joined Date : </label>
                                                        <p className='ps-3 d-inline-block'>{view.joinedDate}</p>

                                                    </div>


                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Working Status : </label>
                                                        <p className='ps-3 d-inline-block'>{`${view.workingStatus ? 'Active' : 'In-active'}`}</p>

                                                    </div>


                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" > Releaved On : </label>
                                                        <p className='ps-3 d-inline-block'>{`${view.releavedOn ? view.releavedOn : "-"}`}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Address : </label>
                                                        <p className='ps-3 d-inline-block'>{view.address}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6 " >Identity Type : </label>
                                                        <p className='ps-3 d-inline-block'>{view.identityType}</p>

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Identity Number : </label>
                                                        <p className='ps-3 d-inline-block'>{view.identityNumber}</p>


                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Per Month Salary : </label>
                                                        <p className='ps-3 d-inline-block'>{view.salaryPerMonth}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Driven Trips : </label>
                                                        <p className='ps-3 d-inline-block'>{view.drivenTrips}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Total Salary Send : </label>
                                                        <p className='ps-3 d-inline-block'>{view.sendTotalSalary}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Remaining Salary : </label>
                                                        <p className='ps-3 d-inline-block'>{view.remainingSalary}</p>
                                                    </div>

                                                    <table className="table align-middle mb-0 bg-white table-striped border">
                                                        <thead>
                                                            <tr>
                                                                <th>S.No</th>
                                                                <th >Description</th>
                                                                <th >Amount</th>

                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {view.salaryTransactions.map((salary, index) => (
                                                                <tr key={index} className='tr-white'>
                                                                    <td className='fw-bold'>{index + 1}</td>
                                                                    <td>{salary.description}</td>
                                                                    <td >{salary.amount}</td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>

                                                    <div className="d-flex justify-content-end pt-3">

                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-success btn-lg ms-2 " onClick={() => use('/employee_details')}>Cancel</button>
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
