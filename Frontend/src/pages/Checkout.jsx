import { useState, useEffect } from "react";
import api from "../api/axios.jsx";
import { useNavigate } from "react-router";

export default function Checkout() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [address, setAddress] = useState([]);
    const [selectAddress, setSelectAddress] = useState(null);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    // =========================
    // LOAD CART + ADDRESS
    // =========================
    useEffect(() => {
        const loadData = async () => {
            try {
                // Get cart
                const cartRes = await api.get(`/cart/${userId}`);
                setCart(cartRes.data);

                // Get saved addresses
                const addressRes = await api.get(`/address/${userId}`);
                setAddress(addressRes.data);

                // First address automatically selected
                if (addressRes.data.length > 0) {
                    setSelectAddress(addressRes.data[0]);
                }

            } catch (error) {
                console.log(error);
            }
        };

        if (userId) {
            loadData();
        } else {
            navigate("/login");
        }
    }, [userId]);


    // =========================
    // LOADING
    // =========================
    if (!cart) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-gray-500">
                    Loading...
                </p>
            </div>
        );
    }


    // =========================
    // CART EMPTY
    // =========================
    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">

                <h1 className="text-2xl font-bold mb-4">
                    Your cart is empty
                </h1>

                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded"
                >
                    Continue Shopping
                </button>

            </div>
        );
    }


    // =========================
    // TOTAL
    // =========================
    const total = cart.items.reduce(
        (sum, item) =>
            sum +
            Number(item.productId.price) *
            Number(item.quantity),
        0
    );


    // =========================
    // PLACE ORDER
    // =========================
    const placeOrder = async () => {

        if (!selectAddress) {
            alert("Please select an address");
            return;
        }

        try {
            setLoading(true);

            const res = await api.post("/order/place", {
                userId: userId,
                address: selectAddress
            });

            console.log("Order placed:", res.data);

            alert("Order placed successfully!");

            navigate(`/order-success/${res.data.orderId}`);

        } catch (error) {
            console.log("Place order error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to place order"
            );

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="max-w-4xl mx-auto p-6">

            {/* =========================
                PAGE TITLE
            ========================= */}

            <h1 className="text-3xl font-bold mb-8">
                Checkout
            </h1>


            {/* =========================
                SELECT ADDRESS
            ========================= */}

            <div className="mb-8">

                <h2 className="text-xl font-semibold mb-4">
                    Select Address
                </h2>


                {address.length === 0 ? (

                    <div className="border border-gray-300 rounded-lg p-5">

                        <p className="text-gray-500 mb-3">
                            No saved address found.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/checkout-address")
                            }
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add Address
                        </button>

                    </div>

                ) : (

                    address.map((add) => (

                        <label
                            key={add._id}
                            className={`block border rounded-lg p-4 mb-3 cursor-pointer transition ${
                                selectAddress?._id === add._id
                                    ? "border-blue-500 bg-blue-50"
                                    : "border-gray-300"
                            }`}
                        >

                            <div className="flex gap-3">

                                {/* Radio */}
                                <input
                                    type="radio"
                                    name="address"
                                    checked={
                                        selectAddress?._id === add._id
                                    }
                                    onChange={() =>
                                        setSelectAddress(add)
                                    }
                                    className="mt-1"
                                />


                                {/* Address details */}
                                <div>

                                    <p className="font-semibold">
                                        {add.fullName}
                                    </p>

                                    <p className="text-gray-700">
                                        {add.phone}
                                    </p>

                                    <p className="text-gray-600 mt-1">
                                        {add.addressLine},{" "}
                                        {add.city},{" "}
                                        {add.state} -{" "}
                                        {add.pincode}
                                    </p>

                                </div>

                            </div>

                        </label>

                    ))
                )}

            </div>


            {/* =========================
                ORDER SUMMARY
            ========================= */}

            <div className="border border-gray-300 rounded-lg p-5">

                <h2 className="text-xl font-semibold mb-4">
                    Order Summary
                </h2>


                {/* Products */}

                {cart.items.map((item) => {

                    const itemTotal =
                        Number(item.productId.price) *
                        Number(item.quantity);

                    return (
                        <div
                            key={item.productId._id}
                            className="flex justify-between items-center border-b py-4"
                        >

                            {/* Product information */}

                            <div>

                                <p className="font-semibold">
                                    {item.productId.title}
                                </p>

                                <p className="text-sm text-gray-600">
                                    Price: ₹
                                    {Number(
                                        item.productId.price
                                    ).toFixed(2)}
                                </p>

                                <p className="text-sm text-gray-600">
                                    Quantity: {item.quantity}
                                </p>

                            </div>


                            {/* Item total */}

                            <p className="font-semibold">
                                ₹{itemTotal.toFixed(2)}
                            </p>

                        </div>
                    );
                })}


                {/* =========================
                    TOTAL
                ========================= */}

                <div className="flex justify-between mt-5 text-lg font-bold">

                    <p>
                        Total Amount
                    </p>

                    <p>
                        ₹{total.toFixed(2)}
                    </p>

                </div>


                {/* =========================
                    PAYMENT METHOD
                ========================= */}

                <div className="mt-5 border rounded-lg p-4">

                    <p className="font-semibold">
                        Payment Method
                    </p>

                    <p className="text-gray-600 mt-1">
                        Cash on Delivery (COD)
                    </p>

                </div>


                {/* =========================
                    PLACE ORDER BUTTON
                ========================= */}

                <button
                    onClick={placeOrder}
                    disabled={loading || !selectAddress}
                    className="mt-5 w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white p-3 rounded-lg font-semibold"
                >
                    {loading
                        ? "Placing Order..."
                        : "Place Order (COD)"
                    }
                </button>

            </div>

        </div>
    );
}