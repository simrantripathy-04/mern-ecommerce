import { Link, useNavigate } from "react-router";
import { useState,useEffect } from "react";
import api from "../api/axios.jsx";

export default function Navbar(){
    const navigate = useNavigate();
    const [cartCount,setCartCount]=useState(0);//total quantity of cart
    const userId  = localStorage.getItem("userId");

    useEffect(()=>{
        const loadCart = async()=>{
            if(!userId){
               setCartCount(0); 
             localStorage.setItem("cartCount",0);
               return;
            } 

            try{
                const res= await api.get(`/cart/${userId}`);
                const total = (res.data?.items || []).reduce(
                (sum,item)=> sum+ Number(item.quantity || 0),0
                 );//sum-> current total, item->current cart item, item.quantity-> product quantity
                setCartCount(total);
                localStorage.setItem("cartCount",total);

             }catch(error){
                console.log(error);
                setCartCount(0);
                localStorage.setItem("cartCount",0);
                
             }
            
            }
        loadCart();
        window.addEventListener("cartUpdated",loadCart);

        return ()=>{
            window.removeEventListener("cartUpdated",loadCart);
        };
    },[userId]);

    const logout =()=>{
        localStorage.clear();
        setCartCount(0);
        navigate("/login");
    };

    return(
        <nav className="bg-black text-white flex justify-between items-center px-8 py-4 shadow-lg">
            <Link to="/" className="text-2xl font-bold tracking-wide hover:text-blue-400 transition">🛍️ Simran Store</Link>

            <div className="flex items-center gap-6">
                {
                    !userId ? (
                        <>
                             <Link to="/login" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300">Login</Link>
                             <Link to="/signup" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300">Signup</Link> 
                        </>
                    ) : (
                        <>
                        <Link to="/cart" className="relative text-3xl hover:scale-110 transition">
                              🛒
                        {
                        cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                            {cartCount}
                        </span>
                          )
                      }
                        </Link>
                       <button onClick={logout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition">Logout</button>
                        </>
                    )}
                </div>
            </nav>
               
    )
}