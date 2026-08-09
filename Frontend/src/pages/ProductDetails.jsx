import { useEffect, useState } from "react";
import api from "../api/axios.jsx";
import {useParams} from "react-router";

export default function ProductDetails(){
    const {id} = useParams();
    const [product, setProduct]=useState(null);

    const loadProduct = async ()=>{
        try{
            const res = await api.get("/products/");
            const p = res.data.find((item)=>item._id === id);
            setProduct(p);
        }catch(error){
            console.log(error);
            
        }
        
    };

    useEffect(()=>{
        loadProduct();
    },[id]);

    //Add to product cart
    const addToCart = async(productId) =>{
        const userId = localStorage.getItem("userId");
        if(!userId){
            alert("Please log in to add items to your cart.");
            return;
        }
        try{
              await api.post(`/cart/add`,{userId,productId});
            //  const total =( res.data?.cart?.items || []).reduce(
            //     (sum,item)=>sum+ Number(item.quantity || 0),0);
            //     localStorage.setItem("cartCount",total);
            //Update Navbar Cart count
                window.dispatchEvent(new Event("cartUpdated"));
                alert("Product added to cart")
             }catch(error){
                console.log(error);
                
             }
             
        }
        //Loading
        
         if(!product){
        return ( <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <p className="text-xl font-semibold text-gray-600">
                Loading...
            </p>
        </div>
        )
         }

    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
            {/* {Main product card} */}
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-5xl w-full flex flex-col md:flex-row gap-10">
            {/* {Product Image} */}
            <div className="flex-1 flex justify-center items-center bg-gray-50 rounded-xl p-8">
            <img src={product.image} alt={product.title} className="w-80 h-80 object-contain hover:scale-105 transition duration-300"></img></div>
            {/* {Product Details} */}
            <div className="flex-1 flex flex-col justify-center">
            {/* {Product Title} */}
            <h1 className="text-4xl font-bold text-gray-800">{product.title}</h1>
            {/* {Product Description} */}
            <p className="text-gray-500 mt-4 text-lg leading-relaxed">{product.description}</p>
            {/* {Price} */}
            <h2 className="text-3xl font-bold text-green-600 mt-6">₹{Number(product.price).toLocaleString("en-IN")}</h2>
            {/* {Add to Cart} */}
            <button onClick={()=> addToCart(product._id)} className="mt-8 bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl  hover:scale-105 transition-all duration-300 w-fit">
                Add to Cart
            </button>
        </div>
        </div>

        </div>
    )
}