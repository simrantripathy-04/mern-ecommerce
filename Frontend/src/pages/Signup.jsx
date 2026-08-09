import { useState } from "react";
import api from "../api/axios.jsx";
import {useNavigate} from 'react-router';

export default  function Signup(){
    const [form,setForm]= useState({
        name:"",
        email:"",
        password:""
    })

    const[msg,setMsg]=useState("")
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setForm({
            ...form,[e.target.name]:e.target.value
        })
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await api.post("/auth/signup",form);
            setMsg(response.data.message)
        }catch(error){
            setMsg(error.response?.data?.message || "An error occurred")
        }
    }

    
        

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">

            <div className="w-full max-w-md">

                {/* Signup Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl">👤</span>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            Create Account
                        </h2>

                        <p className="text-gray-500 mt-2 text-sm">
                            Sign up to get started with your account
                        </p>
                    </div>

                    {/* Message */}
                    {msg && (
                        <div className="mb-5 text-center text-sm font-medium bg-blue-50 text-blue-600 px-4 py-3 rounded-lg">
                            {msg}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>

                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>

                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>

                            <input
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white font-semibold
                            py-3 rounded-xl hover:bg-blue-700
                            active:scale-[0.98] transition-all duration-200
                            shadow-md hover:shadow-lg"
                        >
                            Create Account
                        </button>

                    </form>

                    {/* Login Link */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{" "}
                        <span onClick={()=>navigate("/login")} className="text-blue-600 font-semibold cursor-pointer hover:underline">
                            Login
                        </span>
                    </p>

                </div>
            </div>
        </div>
    );
}