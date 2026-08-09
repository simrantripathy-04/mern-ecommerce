import { useState } from "react";
import {useNavigate} from "react-router";
import api from "../api/axios.jsx";

export default function Login(){
    const [form,setForm]=useState({
        email:"",
        password:""
    })

const [msg,setMsg] =useState("");
const[isSuccess,setIsSuccess]=useState(false);
const navigate= useNavigate();

const handleChange=(e)=>{
    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
}

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
        const res = await api.post("/auth/login",form);
        console.log(res);
        
        //Save Token to localStorage
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("userId",res.data.user.id);
        setIsSuccess(true);
        setMsg("Login Successful");
        //Redirect to Home Page after 1 second

        setTimeout(()=>{
            navigate("/")
        },1000);
      }catch(error){
        setIsSuccess(false);
        setMsg(error.response?.data?.message || "An error occurred");
    }
}



    return(
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4">

            <div className="w-full max-w-md">

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">

                    {/* Heading */}
                    <div className="text-center mb-8">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl">🔐</span>
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800">
                            Welcome Back
                        </h2>

                        <p className="text-gray-500 mt-2 text-sm">
                            Login to continue to your account
                        </p>
                    </div>

                    {/* Message */}
                    {msg && (
                        <div
                            className={`mb-5 text-center text-sm font-medium p-3 rounded-lg ${
                                isSuccess
                                    ? "bg-green-50 text-green-600"
                                    : "bg-red-50 text-red-600"
                            }`}
                        >
                            {msg}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

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
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl
                                focus:outline-none focus:ring-2 focus:ring-blue-500
                                focus:border-blue-500 transition"
                                required
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-xl
                            font-semibold hover:bg-blue-700 active:scale-[0.98]
                            transition-all duration-200 shadow-md"
                        >
                            Login
                        </button>

                    </form>

                    {/* Bottom Text */}
                    <p className="text-center text-sm text-gray-500 mt-6">
                        Don't have an account?
                        <button type="button" onClick={()=>navigate("/signup")}
                        className="text-blue-600 font-semibold ml-1 hover:underline">
                            Signup
                        </button>
                    </p>

                </div>
            </div>
        </div>
    )
}