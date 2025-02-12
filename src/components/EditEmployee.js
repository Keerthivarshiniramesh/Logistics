import React, { useEffect, useState } from 'react'
import logo from '../assest/logistics_logo.png'
import cargo from '../assest/cargo.png'
import edit_employee from '../assest/edit_employee.png'
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEmployee() {

    const [sideBar, setSidebar] = useState(false);
    const [change, setChange] = useState('')
    const use = useNavigate()

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


    let { id } = useParams()
    console.log(typeof (id))

    let [edit, setEdit] = useState({

        name: "",
        joinedDate: "",
        workingStatus: "",
        releavedOn: "",
        address: "",
        identityType: "",
        identityNumber: "",
        drivenTrips: "",
    })
    useEffect(() => {
        if (id) {
            const current = employees.find((emp) => emp.id === Number(id))
            console.log("Current value", current)
            setEdit(current);
        }
    }, [])
    console.log(edit)

    let Update = (e) => {
        e.preventDefault()
        console.log("Views", edit)
    }


    function Change(e, values) {
        e.preventDefault()
        setChange(values)
        if (values === 'Home') {
            setTimeout(() => {
                use('/dashboard')
            }, 200);
        }
        else if (values === 'Vehicle') {
            setTimeout(() => {
                use('/vehicle-details')
            }, 200);
        }
        else if (values === 'Employee') {
            setTimeout(() => {
                use('/employee_details')
            }, 200);
        }
        else {
            setTimeout(() => {
                use('/employee_edit')
            }, 200);
        }

    }
    return (
        <div className="d-flex vh-100 overflow-x-hidden ">
            {/* Sidebar */}
            <aside className={`bg-light text-black p-3 position-fixed h-100 ${sideBar ? "" : "d-none d-md-block"}`} style={{ width: "250px" }}>
                <h2 className="h4">Admin Panel</h2>
                <nav>
                    <ul className="list-unstyled">
                        <li className={`p-2  m-5 ${change === 'Home' ? 'format' : ''}`} ><div className=''><i className="bi bi-house-fill text-success mx-1 fs-3 " onClick={(e) => Change(e, 'Home')}></i>Home</div></li>
                        <li className={` p-2  m-5 ${change === 'Vehicle' ? 'format' : ''}`}><div className=''><i className="bi bi-truck text-success mx-1 fs-3 " onClick={(e) => Change(e, 'Vehicle')}></i>Vehicle</div></li>
                        <li className={` p-2  m-5 ${change === 'Employee' ? 'format' : ''}`}><div className=''><i className="bi bi-people-fill text-success mx-1 fs-3 " onClick={(e) => Change(e, 'Employee')}></i>Employee</div></li>
                        <li className={`p-2  m-5 ${change === 'Trip' ? 'format' : ''}`}><div className=''><img src={cargo} style={{ width: '40px', height: '40px' }} className='mx-2 ' onClick={(e) => Change(e, 'Trip')}></img>Trip</div></li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || window.innerWidth >= 768 ? "250px" : "0" }}>

                {/* Header */}
                <header className="d-flex justify-content-between align-items-center bg-white p-3 shadow">
                    <button className="btn btn-outline-secondary d-md-none" onClick={() => setSidebar(!sideBar)}>
                        <i className="bi bi-list"></i>
                    </button>
                    <img src={logo} alt="Logo" className="" style={{ height: "70px" }} />
                    <div className="d-flex align-items-center gap-3">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-person-circle text-primary fs-4"></i>
                            <span>Admin1</span>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-box-arrow-right text-danger fs-4"></i>
                            <span>Logout</span>
                        </div>
                    </div>
                </header>

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
                                                <img src={edit_employee}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 "
                                                />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center"> Update Employee Detials</h3>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form1">Name </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={edit.name || ''}
                                                            onChange={(e) => setEdit({ ...edit, name: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form2">Joined Date</label>
                                                        <input type="date" id="form2" className="form-control form-control-lg" value={edit.joinedDate ? edit.joinedDate.split('T')[0] : ''}
                                                            onChange={(e) => setEdit({ ...edit, joinedDate: e.target.value })} />

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form3">Working Status</label>
                                                        <input type="text" id="form3" className="form-control form-control-lg" value={edit.workingStatus || ''}
                                                            onChange={(e) => setEdit({ ...edit, workingStatus: e.target.value })} />

                                                    </div>


                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form4"> Releaved On</label>
                                                        <input type="date" id="form4" className="form-control form-control-lg"
                                                            value={edit.releavedOn ? edit.releavedOn.split('T')[0] : ''} // Ensure it's binding correctly
                                                            onChange={(e) => setEdit({
                                                                ...edit, releavedOn: e.target.value
                                                            })}
                                                        />
                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form5">Address</label>
                                                        <input type="text" id="form5" className="form-control form-control-lg" value={edit.address || ''}
                                                            onChange={(e) => setEdit({ ...edit, address: e.target.value })} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form6">Identity Type</label>
                                                        <input
                                                            type="text"
                                                            id="form6"
                                                            className="form-control form-control-lg"
                                                            value={edit.identityType || ''} // Ensure it's binding correctly
                                                            onChange={(e) => setEdit({ ...edit, identityType: e.target.value })}
                                                        />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form6">Identity Number</label>
                                                        <input
                                                            type="text"
                                                            id="form6"
                                                            className="form-control form-control-lg"
                                                            value={edit.identityNumber || ''} // Ensure it's binding correctly
                                                            onChange={(e) => setEdit({ ...edit, identityNumber: e.target.value })}
                                                        />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form6">Driven Trips</label>
                                                        <input
                                                            type="text"
                                                            id="form6"
                                                            className="form-control form-control-lg"
                                                            value={edit.drivenTrips || ''} // Ensure it's binding correctly
                                                            onChange={(e) => setEdit({ ...edit, drivenTrips: e.target.value })}
                                                        />

                                                    </div>



                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/employee_details')}>Cancel</button>
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