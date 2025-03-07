import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Loading from './Loading';

export default function TripDetails() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('Trip')
    const use = useNavigate();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [empName, setEmpname] = useState('')

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const url = process.env.REACT_APP_URL

    let [trips, setTrips] = useState(null)

    useEffect(() => {
        fetch(`${url}fetch-trips`,
            {
                method: 'GET',
                credentials: 'include',

            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setTrips(data.trips);


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

    // useEffect(() => {
    //     if (trips.employeeId === employees.id) {
    //         setEmpname(employees.name)
    //     }

    // }, [])

    //Delete the trip
    let Delete = (id) => {
        fetch(`${url}delete-trip/${id}`,
            {
                method: "GET",
                credentials: 'include'
            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    alert(data.message)
                    window.location.reload()
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

    if (trips === null || employees === null) {
        return (<Loading />)
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
                                <th className='d-none d-md-table-cell'>Status</th>
                                <th className='d-none d-md-table-cell'>No.of.Expenses</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {trips.map((trip, index) => {

                                const employee = employees.find(emp => emp.id === trip.employeeId);
                                return (<tr key={index} className='tr-white'>
                                    <td className='fw-bold'>{index + 1}</td>
                                    <td><p className="fw-normal mb-1">{trip.vehicleNumber.toString().toUpperCase()}</p></td>
                                    <td><p className="fw-normal mb-1">{employee ? employee.name : "Unknown"}</p></td>
                                    <td className='d-none d-md-table-cell'><span className={`badge  rounded-pill ${trip.status === 'cancelled' ? 'bg-danger' : 'bg-success'}`}>{trip.status}</span></td>
                                    <td className='d-none d-md-table-cell'><p className="fw-normal mb-1">{trip.expenses.length}</p></td>
                                    <td>
                                        <i className="bi bi-trash-fill mx-2 px-1 text-danger" role='button' onClick={() => Delete(trip.id)}></i>
                                        <i className="bi bi-pencil-square mx-2 px-1 text-primary" role='button' onClick={() => use(`/edit_trip/${trip.id}`)}></i>
                                        <i className="bi bi-eye-fill mx-2 px-1 text-success " role='button' onClick={() => use(`/view_trips/${trip.id}`)}></i>
                                    </td>
                                </tr>)
                            })}
                        </tbody>
                    </table>
                    
                </main>
            </div>
        </div>
    )
}
