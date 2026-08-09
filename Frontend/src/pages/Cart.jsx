import { useState,useEffect } from "react";
import api from "../api/axios.jsx";
import ProductDetails from "./ProductDetails.jsx";
import { useNavigate } from "react-router";

export default function Cart(){
    const userId = localStorage.getItem("userId");
    const [cart , setCart]= useState(null);
    const navigate = useNavigate();

    //Load cart data
    const loadCart = async ()=>{
        if(!userId){
            setCart({items :[]});
            return;
        } 
        try{
             const response = await api.get(`/cart/${userId}`);
             setCart(response.data || {items:[]});
        }catch(error){
            console.log(error);
            setCart({items:[]});
        };
            
    };

    useEffect(()=>{
        loadCart();
    },[userId]);

    //remove button
    const removeItem = async (productId)=>{
        try{
            await api.post("/cart/remove",{userId,productId});
            await loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        }catch(error){
            console.log(error);
            
        }
       
        
    };

    //Update item quantity(+,-)
    const updateQty = async (productId, quantity)=>{
        if(quantity<=0){
            await removeItem(productId);
            return;
        }

        try{
            await api.post(`/cart/update`,{userId,productId,quantity});
            await loadCart();
            window.dispatchEvent(new Event("cartUpdated"));
        }catch(error){
            console.log(error);
            
        }
        
    };

    //Loading (api not provide any response)
    if(!cart){
        return <div>Loading...</div>;
    }

    const items = cart.items || [];
    //Total price
    const total = items.reduce((sum,item)=> sum + Number(item.productId?.price || 0) *Number(item.quantity || 0),0);

    return(
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
            {
                items.length === 0 ?(
                    <div>Your cart is empty..</div>
                ): (
                    <div className="space-y-4">
                        {items.map((item)=>(
                            <div 
                            key={item.productId?._id} //unique id
                            className="grid grid-cols-[2fr_1fr_1fr_auto] items-center  gap-6  p-4 border rounded">
                            {/* {Product} */}
                            <div className="flex items-center gap-4">
                                <img 
                                src={item.productId?.image}
                                alt={item.productId?.title}
                                className="w-16 h-16 object-cover rounded"
                                ></img>
                                <div>
                                    <h2 className="text-lg font-semibold">{item.productId?.title}</h2>
                                    <p className="text-gray-600">₹{Number(item.productId?.price || 0).toFixed(2)}</p>
                                </div>
                            </div>
                            {/* {Quantity} */}
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={()=>updateQty(item.productId?._id,item.quantity -1)}
                                    className="px-3 py-1 bg-gray-200 rounded"
                                    >
                                        -
                                    </button>
                                    <span className="w-6 text-center">{item.quantity}</span>
                                    <button 
                                        onClick={()=> updateQty(item.productId?._id,item.quantity +1)}
                                        className="px-3 py-1 bg-gray-200 rounded">
                                            +
                                    </button>
                            </div>
                                {/* {Product Total} */}
                                <p className="font-semibold">
                                    ₹{(Number(item.productId?.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                                </p>
                                {/* {Remove} */}
                            
                            <button
                                onClick={()=> removeItem(item.productId?._id)}
                                className="text-red-500 hover:text-red-700"
                                >
                                    Remove
                            </button>
                            
                            </div>
                            
                        ))}

                        <div className="text-right mt-4">
                            <h2 className="text-xl font-bold">
                                Total :₹{total.toFixed(2)}
                            </h2>
                        </div>
                        <button onClick={()=>navigate("/checkoutaddress")} className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98]">
                            Proceed to Checkout
                        </button>
                    </div>
                )
                
            }
        </div>
    );
}