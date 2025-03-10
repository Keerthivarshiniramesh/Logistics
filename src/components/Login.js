import React, { useState } from 'react'
import image from '../assest/login_image.jpg'
import { useNavigate } from 'react-router-dom'


export default function Login() {

    const url = process.env.REACT_APP_URL

    let [valid, setValid] = useState({ email: '', pwd: '' })
    let [check, setCheck] = useState(false)

    let navigate = useNavigate()

    let Validation = (event, keys) => {

        let values = event.target.value
        setValid(prev => ({
            ...prev,
            [keys]: values

        }))
    }

    let Submits = (e) => {
        e.preventDefault()

        if (valid.email === '' || valid.pwd === '') {
            setCheck(true)
        }
        else {
            setCheck(false)

            fetch(`${url}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({ email: valid.email, password: valid.pwd })
            })
                .then(res => res.json())
                .then(data => {

                    if (data.success === true) {
                        alert(data.message)
                        localStorage.setItem("userName", JSON.stringify(data.user.fullname))
                        navigate('/dashboard')

                    }
                    else {

                        setCheck(true)
                    }
                })
                .catch(err => {
                    console.log("Error in Login", err)
                    alert("Trouble in Conecting to Server !!")
                })
        }
    }

    return (
        <div className='login_bg d-flex flex-column justify-content-center align-items-center w-100'>

            <main className='login_design d-flex flex-row justify-content-center container w-100 h-100 p-0 m-0 '>
                <section className=" d-none d-md-block d-lg-block container-fluid p-0 m-0 w-100 flex-grow-1">
                    <img src={image} className='w-100 h-100  d-inline-block ' />
                </section>
                <section className="container-fluid p-2 m-0">
                    <div className="  form1 w-100 mx-auto h-75" style={{ maxWidth: '400px' }}>
                        <h3 className="p-3 text-primary m-4">Login</h3>
                        <form className='m-3'>
                            <input type="email" placeholder="Email" className="form-control p-3 mb-3" value={valid.email} onChange={(e) => Validation(e, "email")} />
                            <input type="text" placeholder="Password" className="form-control p-3 mb-3" value={valid.pwd} onChange={(e) => Validation(e, "pwd")} />

                            <i className="bi bi-google text-primary m-0 p-2 fs-4  m-md-3 p-md-2  m-lg-3 p-lg-4" role='button'></i>
                            <i className="bi bi-facebook text-primary m-0 fs-4 p-2 m-md-3 p-md-2  m-lg-3 p-lg-4" role='button'></i>
                            <i className="bi bi-apple text-primary m-0 fs-4 p-1 m-md-3 p-md-1  m-lg-3 p-lg-2" role='button'></i>
                            {check && (
                                <p className="text-danger">*Invalid  email or Password</p>
                            )}
                            <button className="btn btn-primary mt-4 w-100" onClick={(e) => Submits(e)} > Login</button>

                        </form>
                    </div >
                </section>
            </main>
        </div>
    )
}
