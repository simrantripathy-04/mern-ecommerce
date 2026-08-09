import {createBrowserRouter, Outlet, RouterProvider} from "react-router";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx"
import Signup from "./pages/Signup.jsx"
import ProductDetails from "./pages/ProductDetails.jsx"
import AddProduct from "./admin/AddProduct.jsx";
import ProductList from "./admin/ProductList.jsx";
import EditProduct from "./admin/EditProduct.jsx";
import Navbar from "./components/Navbar.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import CheckoutAddress from "./pages/CheckoutAddress.jsx";
import OrderSucess from "./pages/OrderSucess.jsx";

function Layout(){//Layout common wrapper
  return(
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    </>
  )
}

const router = createBrowserRouter([
 {
  element:<Layout></Layout>,
  children:[
  {path:"/", element:<Home/>},
  {path:"/login",element:<Login/>},
  {path:"/signup",element:<Signup/>},
  {path:"/product/:id",element:<ProductDetails/>},
  {path:"/cart", element:<Cart></Cart>},

  {path:"/admin/products/add", element:<AddProduct></AddProduct>},
  {path:"/admin/products", element:<ProductList></ProductList>},
  {path:"/admin/products/update/:id", element:<EditProduct></EditProduct>},
  {path:"/checkoutaddress",element:<CheckoutAddress></CheckoutAddress>},
  {path:"/checkout", element:<Checkout></Checkout>},
  {path:"/order-success/:id",element:<OrderSucess></OrderSucess>}
  ]
 }
]);

export default function App(){
  return <RouterProvider router={router}/>
}