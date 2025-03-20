
    import React, { useState } from "react";
    import { useNavigate } from "react-router-dom";

    const Studentlogin = () => {
        const [isActive, setIsActive] = useState(false);
        const [errors, setErrors] = useState({});

        const navi=useNavigate();

        // Toggle active state for switching panels
        const handleSwitch = () => {
            setIsActive(!isActive);
        };

        const validatedata = (e) => {
            const { name, email,dob } = e;
            let newErrors = {};
        
            if (!name || !/^[A-Za-z\s]+$/.test(name)) {
            newErrors.name = "Enter a valid name";
            }
        
            if (!email || !/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)) {
            newErrors.email = "Enter a valid email";
            }
        
            if (!dob) {
                newErrors.dob = "Date of birth is required";
              } else {
                const birthDate = new Date(dob);
                const minDate = new Date();
                minDate.setFullYear(minDate.getFullYear() - 15);
                if (birthDate > minDate) {
                  newErrors.dob = "You must be at least 15 years old";
                }
              }
            //   if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
            //     newErrors.mobile = "Enter a valid mobile number";
            //   }
              setErrors(newErrors);

            if (Object.keys(newErrors).length === 0) {
            confirm("successfully Sign up");
            }
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            validatedata(data)
        };
        
        function checkIdInDatabase(e){
            e.preventDefault()
            const login =new FormData(e.target);
            const data=Object.fromEntries(login.entries())
                if(data){
                    navi('/student')
                }
        }

        return (
            <div className="flex justify-center items-center min-h-screen p">
                <div className={`relative flex shadow-lg rounded-3xl overflow-hidden w-3/4 max-w-5xl min-h-[650px] transition-transform duration-500 ease-in-out ${isActive ? "translate-x-0" : "translate-x-0"}`}>
                {/* Sign-Up Form */}
                <div className="w-1/2 flex justify-center items-center p-10">
                    <form className="w-full " onSubmit={handleSubmit}>
                        <div className="mb-4 text-center">
                            <h1 className="text-3xl font-bold">Create Account</h1>
                        </div>
                        <div className="mb-3">
                            <input name="name" type="text" placeholder="Name as per Marksheet" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                        </div>
                        {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}
                        <div className="mb-3">
                            <input  name="email" type="email" placeholder="Email" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                        </div>
                        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}
                        <div className="mb-3">
                            <input type="tel"
                            pattern="[6-9]\d{9}" 
                            title="Enter a valid 10-digit mobile number starting with 6-9"  placeholder="Mobile Number" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                        </div>
                        {/* {errors.mobile && <p className="text-red-500 text-sm mb-2">{errors.mobile}</p>} */}
                        <div className="mb-3">
                            <input name='dob' type="date" placeholder="Birth Date" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                        </div>
                        {errors.dob && <p className="text-red-500 text-sm mb-2">{errors.dob}</p>}
                        <div className="mb-3 flex justify-center">
                            <button className="border border-white text-white bg-gray-700 w-1/2 py-3 rounded-lg text-lg font-semibold hover:text-xl hover:border-white hover:bg-gray-400 hover:text-black transition">Register</button>
                        </div>
                    </form>
                </div>

                {/* Login Form */}
                <div className="w-1/2 flex justify-center items-center p-10">
                    <form className="w-full" onSubmit={checkIdInDatabase}>
                        <div className="mb-4 text-center">
                            <h1 className="text-3xl font-bold">Login</h1>
                        </div>
                        <div className="mb-3">
                            <input name='id' type="text" pattern="^PMSS@\d{6}#$" title="Enter a valid ID" placeholder="ID" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                        </div>
                        <div className="mb-3">
                            <input name="pass" type="password" pattern="^(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$" title="Enter a valid Password" placeholder="Password" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                        </div>
                        <div className="mb-5 flex justify-between text-gray-600 text-sm">
                            <div>
                                <input type="checkbox" id="remember" className="mr-2" />
                                <label htmlFor="remember">Remember me</label>
                            </div>
                            <div>
                                <a href="#" className="hover:underline">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mb-3 flex justify-center">
                            <button className="border border-white text-white bg-gray-700 w-1/2 py-3 rounded-lg text-lg font-semibold hover:text-xl hover:border-white hover:bg-gray-400 transition hover:text-black">Login</button>
                        </div>
                    </form>
                </div>

                {/* Switch Panel */}
                <div className={`absolute top-0 right-1/2 w-1/2 h-full bg-gray-700 text-white flex flex-col items-center justify-center text-center p-10 rounded-r-3xl transition-all duration-500 ${isActive ? "translate-x-full" : "translate-x-0"}`}>
                    {isActive ? (
                        <div>
                            <h1 className="text-3xl font-bold">Hello, Student</h1>
                            <p className="mt-4">If you are already registered, click on login</p>
                            <button className="mt-6 bg-white text-gray-700 w-1/2 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition" onClick={handleSwitch}>Login</button>
                        </div>
                    ) : (
                        <div>
                            <h1 className="text-3xl font-bold">Welcome</h1>
                            <p className="mt-4">If you are new, join our Unique Platform and explore a new experience</p>
                            <button className="mt-6 bg-white text-gray-700 w-1/2 py-3 rounded-lg text-lg font-semibold hover:bg-gray-200 transition" onClick={handleSwitch}>Register</button>
                        </div>
                    )}
                </div>
                </div>
            </div>
        );
    }

    export default Studentlogin

