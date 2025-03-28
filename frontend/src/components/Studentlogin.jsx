import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';  // Import Axios

const Studentlogin = () => {
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState({});
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);
  const [forget, setForget] = useState(false);
  const navigate = useNavigate();




  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/student"); // Redirect if already logged in
    }
  }, []);

  const handleSwitch = () => {
    setIsActive(!isActive);
  };

  const validateData = (data) => {
    const { name, email, dob } = data;
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    setLoading(true)
    e.preventDefault();
    const formData = { name, email, phone, dob };

    if (validateData(formData)) {
      try {
        const res = await axios.post("http://localhost:5000/api/auth/signup", {
          name,
          email,
          phone,
          dob,
        });

        if (res.status === 200) {
          alert("Signup successful! Please login.ID and Password sent to your email");
          handleSwitch(); // Switch to the login panel
        } else {
          alert(res.data.message || "Signup failed");
        }
      } catch (err) {
        console.error("Signup Error:", err);
        alert("Signup Error: " + err.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        studentId: studentId,
        password: password,
      });

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);  // Store JWT token
        localStorage.setItem("role", res.data.role);  // Store role
        localStorage.setItem("studentId", res.data.studentId);  // Store Id
        navigate("/student");  // Redirect to student dashboard
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login Error: " + err.response?.data?.message || err.message);
    }
  };
  const sendPassword = async () => {
    setForget(true)
    const studentId = localStorage.getItem('studentId')
    try {
      const response = await axios.post("http://localhost:5000/api/auth/sendpassword", {
        studentId,
      });

      // Handle success response
      if (response.status === 200) {
        console.log("Password Email sent successfully:", response.data.message);
        navigate('/forgetpass')
      }
    } catch (error) {
      // Handle error response
      if (error.response) {
        console.error("Error:", error.response.data.message);
      } else {
        console.error("Error in sending password:", error.message);
      }
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen p">
      <div className={`relative flex shadow-lg rounded-3xl overflow-hidden w-3/4 max-w-5xl min-h-[650px] transition-transform duration-500 ease-in-out ${isActive ? "translate-x-0" : "translate-x-0"}`}>
        {/* Sign-Up Form */}
        <div className="w-1/2 flex justify-center items-center p-10">
          <form className="w-full" onSubmit={handleSignup}>
            <div className="mb-4 text-center">
              <h1 className="text-3xl font-bold">Create Account</h1>
            </div>
            <div className="mb-3">
              <input
                name="name"
                type="text"
                placeholder="Name as per Marksheet"
                className="w-full p-4 bg-gray-100 rounded-lg text-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {errors.name && <p className="text-red-500 text-sm mb-2">{errors.name}</p>}

            <div className="mb-3">
              <input
                name="email"
                type="email"
                placeholder="Email must (@gmail.com)"
                className="w-full p-4 bg-gray-100 rounded-lg text-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email}</p>}

            <div className="mb-3">
              <input
                name="phone"
                type="tel"
                pattern="[6-9]\d{9}"
                title="Enter a valid 10-digit mobile number starting with 6-9"
                placeholder="Mobile Number"
                className="w-full p-4 bg-gray-100 rounded-lg text-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                name="dob"
                type="date"
                placeholder="Birth Date"
                className="w-full p-4 bg-gray-100 rounded-lg text-lg"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            {errors.dob && <p className="text-red-500 text-sm mb-2">{errors.dob}</p>}

            <div className="mb-3 flex justify-center">
              <button className={`border border-white text-white bg-gray-700 w-1/2 py-3 rounded-lg text-lg font-semibold hover:text-xl hover:border-white hover:bg-gray-400 hover:text-black transition ${loading ? 'hover:cursor-not-allowed' : ''}`} disabled={loading}>Register</button>
            </div>
          </form>
        </div>

        {/* Login Form */}
        <div className="w-1/2 flex justify-center items-center p-10">
          <form className="w-full" onSubmit={handleLogin}>
            <div className="mb-4 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <div className="mb-3">
              <input
                name="id"
                type="text"
                pattern="^PMSS@\d{6}$"
                title="Enter a valid ID"
                placeholder="ID"
                className="w-full p-4 bg-gray-100 rounded-lg text-lg"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                name="pass"
                type="password"
                placeholder="Password"
                className="w-full p-4 bg-gray-100 rounded-lg text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.login && <p className="text-red-500 text-sm mb-2">{errors.login}</p>}

            <div className="mb-5 flex justify-between text-gray-600 text-sm">
              <div>
                <p className={`hover:underline ${forget ?"hover:cursor-not-allowed":" "} `} disabled={forget} onClick={sendPassword}>
                  Forgot password?
                </p>
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
};

export default Studentlogin;