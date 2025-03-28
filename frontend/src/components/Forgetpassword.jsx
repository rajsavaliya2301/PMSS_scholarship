import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        phone: "",
        name: "",
        password: "",
        newPassword: ""
    });
    const neviget = useNavigate();
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", formData);
            alert(response.data.message);
            neviget('/signinup')
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    placeholder="Name Entered in signup"
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 mb-2 border rounded" 
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 mb-2 border rounded" 
                />
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 mb-2 border rounded" 
                />
                <input 
                    type="text" 
                    name="password" 
                    placeholder="password send to mail" 
                    value={formData.password} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-2 mb-2 border rounded" 
                />
               <input 
                    type="password" 
                    name="newPassword" 
                    placeholder="New Password" 
                    value={formData.newPassword} 
                    onChange={handleChange} 
                    required 
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                    className="w-full p-2 mb-2 border rounded" 
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
