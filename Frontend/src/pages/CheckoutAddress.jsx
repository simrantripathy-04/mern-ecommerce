import {useState  } from "react";
import api from "../api/axios.jsx";
import {useNavigate} from "react-router";

export default function CheckoutAddress(){
    const userId= localStorage.getItem("userId");
    const navigate = useNavigate();

    const[form, setForm]= useState({
        fullName:"",
        phone:"",
        addressLine:"",
        city:"",
        state:"",
        pincode:""
    });

    const handleChange=(e)=>{
        setForm({
            ...form,[e.target.name]:e.target.value
        });
    };

    const saveAddress = async(e)=>{
        e.preventDefault();
        if(!userId){
            navigate("/login");
            return;
        }
        try{
            await api.post(`/address/add`,{
            ...form,
            userId,
        });
        navigate("/checkout");
        }catch(error){
            console.log(error);
            
        }
       
    }

    
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">

            <div className="max-w-xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow">

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Delivery Address
                </h1>

                <p className="text-gray-500 mb-6">
                    Enter your delivery details
                </p>

                <form
                    onSubmit={saveAddress}
                    className="space-y-4"
                >

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>

                        <input
                            name="fullName"
                            type="text"
                            placeholder="Enter your full name"
                            value={form.fullName}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                        </label>

                        <input
                            name="phone"
                            type="tel"
                            placeholder="Enter phone number"
                            value={form.phone}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            maxLength="10"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                        </label>

                        <textarea
                            name="addressLine"
                            placeholder="House no, street, area"
                            value={form.addressLine}
                            onChange={handleChange}
                            rows="3"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            required
                        />
                    </div>


                    {/* City + State */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>

                            <input
                                name="city"
                                type="text"
                                placeholder="Enter city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>


                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                State
                            </label>

                            <input
                                name="state"
                                type="text"
                                placeholder="Enter state"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                    </div>


                    {/* Pincode */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Pincode
                        </label>

                        <input
                            name="pincode"
                            type="text"
                            placeholder="Enter pincode"
                            value={form.pincode}
                            onChange={handleChange}
                            pattern="[0-9]{6}"
                            maxLength="6"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Save Address
                    </button>

                </form>

            </div>

        </div>
    );
}
        