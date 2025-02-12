import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assest/logistics_logo.png';
import cargo from '../assest/cargo.png';
import emp_register from '../assest/employee_register.jpg'

export default function EmployeeRegister() {
    const [sideBar, setSidebar] = useState(false);
    const use = useNavigate()
    const [change, setChange] = useState('')
    let [employee, setEmployee] = useState({
        name: "",
        joinedDate: "",
        workingStatus: "",
        releavedOn: "",
        address: "",
        identityType: "",
        identityNumber: "",
        drivenTrips: '',
    })

    useEffect(() => {

        // Initialize MDB components
        if (window.mdb) {
            window.mdb.Input.init(); // Assuming you want to initialize the input components
        }

    }, [])

    const Create = (e, keys) => {
        let value = e.target.value

        setEmployee(prev => (
            {
                ...prev,
                [keys]: value
            }
        ))
    }


    const Save = (e) => {
        e.preventDefault()
        console.log(employee)
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
                                                <img src={emp_register}
                                                    alt="Sample photo" className="img-fluid w-100 h-100 "
                                                />
                                            </div>
                                            <div className="col-xl-6">
                                                <div className="card-body p-md-5 text-black">
                                                    <h3 className="mb-5 text-uppercase text-center">Employee Registration form</h3>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form1"> Name </label>
                                                        <input type="text" id="form1" className="form-control form-control-lg" value={employee.name} onChange={(e) => Create(e, 'name')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form2">Joined Date</label>
                                                        <input type="date" id="form2" className="form-control form-control-lg" value={employee.joinedDate} onChange={(e) => Create(e, 'joinedDate')} />

                                                    </div>


                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form3">Working Status</label>
                                                        <input type="text" id="form3" className="form-control form-control-lg" value={employee.workingStatus} onChange={(e) => Create(e, 'workingStatus')} />

                                                    </div>




                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form4">Releaved On</label>
                                                        <input type="date" id="form4" className="form-control form-control-lg" value={employee.releavedOn} onChange={(e) => Create(e, 'releavedOn')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form5">Address</label>
                                                        <input type="text" id="form5" className="form-control form-control-lg" value={employee.address} onChange={(e) => Create(e, 'address')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form7">Identity Type</label>
                                                        <input type="text" id="form7" className="form-control form-control-lg" value={employee.identityType} onChange={(e) => Create(e, 'identityType')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form8">IdentityNumber</label>
                                                        <input type="text" id="form8" className="form-control form-control-lg" value={employee.identityNumber} onChange={(e) => Create(e, 'identityNumber')} />

                                                    </div>

                                                    <div data-mdb-input-init className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="form9">Driven Trips</label>
                                                        <input type="text" id="form9" className="form-control form-control-lg" value={employee.drivenTrips} onChange={(e) => Create(e, 'drivenTrips')} />

                                                    </div>




                                                    <div className="d-flex justify-content-end pt-3">
                                                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/employee_details')}>Cancel</button>
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
