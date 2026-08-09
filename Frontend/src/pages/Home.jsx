import { useEffect, useState } from "react";
import api from "../api/axios.jsx";
import {Link} from "react-router";

export default function Home(){
    const [products, setProducts]= useState([]);
    const [search , setSearch]=useState("");
    const [category, setCategory]=useState("");

    const loadProducts = async()=>{
        try{
            const res = await api.get(`/products/?search=${search}&category=${category}`);
            setProducts(res.data);
        }catch(error){
            console.log(error);
            
        }
        
    }

    useEffect(()=>{
        loadProducts();
    },[search, category]);

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
                window.dispatchEvent(new Event("cartUpdated"));
                alert("Product added to cart")
             }catch(error){
                console.log(error);
                
             }
             
            }
       
        
        
    

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* {Search} */}
            <div className ="bg-white p-4 rounded-xl shadow-md flex flex-col md:flex-row gap-4 mb-6">
                <input
                type="text"
                placeholder="🔍Search Products.."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"></input>

                {/* {Category Filter} */}
                <select
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">All Categories</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Tablets">Tablets</option>
                </select>
            </div>
            {/* {Products grid} */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols gap-6">
                {
                    products.map((product)=>(
                        <div key={product._id} className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                            <Link to = {`/product/${product._id}`}>
                            <div className="bg-gray-50 p-4">
                                <img src={product.image} 
                                    alt={product.title} className="w-full h-48 object-contain"></img>
                                </div>
                                <div className="p-4">
                                <h2 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h2>
                                <p className="text-green-600 text-xl font-bold mt-2">₹{product.price}</p>
                                </div>
                            </Link>
                            <div className="px-4 pb-4 flex justify-center">
                            <button 
                            onClick={()=> addToCart(product._id)}
                            className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
                                Add to cart
                            </button>
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )
}