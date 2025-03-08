import React, { useEffect, useState } from 'react'
import view_trip from '../assest/trip_view.png'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Loading from './Loading';

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

    const url = process.env.REACT_APP_URL

    let [view, setView] = useState({

        vehicleNumber: "",
        employeeName: '',
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

    console.log(typeof view.profit)
    useEffect(() => {
        if (id) {
            fetch(`${url}fetch-trip/${id}`,
                {
                    method: 'GET',
                    credentials: 'include',

                })
                .then(res => res.json())
                .then(data => {
                    if (data.success === true) {
                        setView(data.trip);


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
    const [empName, setEmpName] = useState('')
    useEffect(() => {
        if (employees) {
            let emp_name = employees.find((emp, index) => emp.id === view.employeeId)
            if (emp_name) {
                setEmpName(emp_name)
            }
        }

    }, [employees])

    if (view === null || employees === null) {
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
                                                <img src={view_trip}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 object-fit-cover" />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center">  Trip Details</h3>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Vehicle Number : </label>
                                                        <p className='ps-3 d-inline-block'>{view.vehicleNumber.toUpperCase()}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Employee Name : </label>
                                                        <p className='ps-3 d-inline-block'>{empName.name}</p>
                                                    </div>


                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" > Start Location: </label>
                                                        <p className='ps-3 d-inline-block'>{view.startLocation}</p>
                                                    </div>


                                                    <div className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" > End Location : </label>
                                                        <p className='ps-3 d-inline-block'>{view.endLocation}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Start Date : </label>
                                                        <p className='ps-3 d-inline-block'>{view.startTime}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6 " >End Date: </label>
                                                        <p className='ps-3 d-inline-block'>{view.endTime}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Status : </label>
                                                        <p className={`badge ps-3 d-inline-block ${view.status === 'cancelled' ? 'bg-danger' : 'bg-success'}`}>{view.status}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6">Expenses : </label>
                                                        <table className="table align-middle mb-0 bg-white table-striped border">
                                                            <thead>
                                                                <tr>
                                                                    <th>S.No</th>
                                                                    <th >Type</th>
                                                                    <th >Amount</th>
                                                                    <th>Description</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {view.expenses.map((expense, index) => (
                                                                    <tr key={index} className='tr-white'>
                                                                        <td className='fw-bold'>{index + 1}</td>
                                                                        <td>{expense.type}</td>
                                                                        <td className=''>{expense.amount}</td>
                                                                        <td className=''>{expense.description}</td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Earned Income  : </label>
                                                        <p className={`ps-3 d-inline-block `}>{view.earnedIncome}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >Total Expenses : </label>
                                                        <p className={` ps-3 d-inline-block `}>{view.totalExpenses}</p>
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-2">
                                                        <label className="form-label fw-bold fs-6" >{view.profit < 0 ? "Loss : " : "Profit : "} </label>
                                                        <p className={` ps-3 d-inline-block `}>{view.profit.toString().replace("-", "")}</p>
                                                    </div>

                                                    <div className="d-flex justify-content-end pt-1">

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
