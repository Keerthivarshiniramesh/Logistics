import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Loading from './Loading';

export default function VehicleDetails() {

    const [sideBar, setSidebar] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [change, setChange] = useState('Vehicle')
    const use = useNavigate();

    const url = process.env.REACT_APP_URL

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    let [vehicles, setVehicle] = useState(null)

    useEffect(() => {
        fetch(`${url}fetch-vehicle`,
            {
                method: 'GET',
                credentials: 'include',

            })
            .then(res => res.json())
            .then(data => {
                if (data.success === true) {
                    setVehicle(data.vehicleInfo);
                    console.log(vehicles)
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

    // Delete the vehicle details

    let Delete = (id) => {
        fetch(`${url}fetch-vehicle/${id}`,
            {
                method: "DELETE",
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


    if (vehicles === null) {
        return (<Loading />)
    }
    return (
        <div className="d-flex vh-100 overflow-x-hidden">
            {/* Sidebar Component */}
            <Sidebar sideBar={sideBar} setSidebar={setSidebar} change={change} Change={Change} />

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ marginLeft: sideBar || windowWidth >= 768 ? "250px" : "0" }}>
                {/* Header */}

                <Header sideBar={sideBar} setSidebar={setSidebar} />

                <main className="container-fluid py-4 flex-grow-1 dash_content">
                    <h3 className='text-center '>Vehicle Details</h3>
                    <button className='btn btn-success m-5 float-end' onClick={() => use('/vehicle')}>Create</button>
                    <table className="table align-middle mb-0 bg-white table-striped">
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Vehicle No</th>
                                <th>Name</th>
                                <th className='d-none d-md-table-cell'>Year</th>
                                <th className='d-none d-md-table-cell'>Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((vehi, index) => (
                                <tr key={index} className='tr-white'>
                                    <td className='fw-bold'>{index + 1}</td>
                                    <td><p className="fw-normal mb-1">{vehi.vehicleNumber}</p></td>
                                    <td><p className="fw-normal mb-1">{vehi.name}</p></td>
                                    <td className='d-none d-md-table-cell'><p className="fw-normal mb-1">{vehi.yearOfManufacture}</p></td>
                                    <td className='d-none d-md-table-cell'><p className="fw-normal mb-1">{vehi.type}</p></td>
                                    <td>
                                        <i className="bi bi-trash-fill mx-2 px-1 text-danger" role='button' onClick={() => Delete(vehi.vehicleNumber)}></i>
                                        <i className="bi bi-pencil-square mx-2 px-1 text-primary" role='button' onClick={() => use(`/edit_vehicle/${vehi.vehicleNumber}`)}></i>
                                        <i className="bi bi-eye-fill mx-2 px-1 text-success " role='button' onClick={() => use(`/view_vehicle/${vehi.vehicleNumber}`)}></i>
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
