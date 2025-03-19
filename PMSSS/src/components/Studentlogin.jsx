import React, { useState } from "react";

const Studentlogin = () => {
    const [isActive, setIsActive] = useState(false);

    // Toggle active state for switching panels
    const handleSwitch = () => {
        setIsActive(!isActive);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p">
            <div className={`relative flex shadow-lg rounded-3xl overflow-hidden w-3/4 max-w-5xl min-h-[650px] transition-transform duration-500 ease-in-out ${isActive ? "translate-x-0" : "translate-x-0"}`}>
            {/* Sign-Up Form */}
            <div className="w-1/2 flex justify-center items-center p-10">
                <form className="w-full">
                    <div className="mb-4 text-center">
                        <h1 className="text-3xl font-bold">Create Account</h1>
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Name as per Marksheet" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                    </div>
                    <div className="mb-3">
                        <input type="email" placeholder="Email" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                    </div>
                    <div className="mb-3">
                        <input type="text" placeholder="Mobile Number" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                    </div>
                    <div className="mb-3 flex justify-center">
                        <button className="border border-white text-white bg-gray-700 w-1/2 py-3 rounded-lg text-lg font-semibold hover:text-xl hover:border-white hover:bg-purple-800 transition">Register</button>
                    </div>
                </form>
            </div>

            {/* Login Form */}
            <div className="w-1/2 flex justify-center items-center p-10">
                <form className="w-full">
                    <div className="mb-4 text-center">
                        <h1 className="text-3xl font-bold">Login</h1>
                    </div>
                    <div className="mb-3">
                        <input type="email" placeholder="Email" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
                    </div>
                    <div className="mb-3">
                        <input type="password" placeholder="Password" className="w-full p-4 bg-gray-100 rounded-lg text-lg" />
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
                        <button className="border border-white text-white bg-gray-700 w-1/2 py-3 rounded-lg text-lg font-semibold hover:text-xl hover:border-white hover:bg-gray-300 transition hover:text-gray-900">Login</button>
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
