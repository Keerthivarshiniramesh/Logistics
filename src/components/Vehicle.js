import React, { useEffect, useState } from 'react'
import logo from '../assest/logistics_logo.png'
import register from '../assest/vehicle_register.jpg'
import cargo from '../assest/cargo.png'
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Vehicle() {

  const [sideBar, setSidebar] = useState(false);
  const use = useNavigate()
  const [change, setChange] = useState('Vehicle')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let [vehicle, setVehicle] = useState({
    vehicleNumber: '',
    name: '',
    manufacturer: '',
    year: '',
    type: '',
    description: ''
  })

  useEffect(() => {

    // Initialize MDB components
    if (window.mdb) {
      window.mdb.Input.init(); // Assuming you want to initialize the input components
    }

  }, [])

  const Create = (e, keys) => {
    let value = e.target.value

    setVehicle(prev => (
      {
        ...prev,
        [keys]: value
      }
    ))
  }


  const Save = (e) => {
    e.preventDefault()
    console.log(vehicle)
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
      {/* Sidebar */}
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
                        <img src={register}
                          alt="Sample photo" className="img-fluid w-100 h-100 "
                        />
                      </div>
                      <div className="col-xl-6">
                        <div className="card-body p-md-5 text-black">
                          <h3 className="mb-5 text-uppercase text-center">Vehicle registration form</h3>


                          <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example8">Vehicle Number </label>
                            <input type="text" id="form3Example8" className="form-control form-control-lg" value={vehicle.vehicleNumber} onChange={(e) => Create(e, 'vehicleNumber')} />

                          </div>

                          <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example8">Name</label>
                            <input type="text" id="form3Example8" className="form-control form-control-lg" value={vehicle.name} onChange={(e) => Create(e, 'name')} />

                          </div>


                          <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example8">Manufacturer</label>
                            <input type="text" id="form3Example8" className="form-control form-control-lg" value={vehicle.manufacturer} onChange={(e) => Create(e, 'manufacturer')} />

                          </div>




                          <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example9">YearofManufacturer</label>
                            <input type="text" id="form3Example9" className="form-control form-control-lg" value={vehicle.year} onChange={(e) => Create(e, 'year')} />

                          </div>

                          <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example90">Type</label>
                            <input type="text" id="form3Example90" className="form-control form-control-lg" value={vehicle.type} onChange={(e) => Create(e, 'type')} />

                          </div>

                          <div data-mdb-input-init className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example99">Description</label>
                            <input type="text" id="form3Example99" className="form-control form-control-lg" value={vehicle.description} onChange={(e) => Create(e, 'description')} />
                          </div>

                          <div className="d-flex justify-content-end pt-3">
                            <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-light btn-lg" onClick={() => use('/vehicle-details')}>Cancel</button>
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
