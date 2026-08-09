import { useParams, useNavigate } from "react-router";

export default function OrderSuccess() {
    const { id } = useParams();
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 py-10">

            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 text-center">

                {/* Success Icon */}
                <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <svg
                        className="w-10 h-10 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-gray-800">
                    Order Placed Successfully!
                </h1>

                <p className="text-gray-500 mt-3">
                    Thank you for your purchase. Your order has been placed successfully.
                </p>

                {/* Order ID */}
                <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                        Your Order ID
                    </p>

                    <p className="mt-1 text-lg font-semibold text-gray-800 break-all">
                        {id}
                    </p>
                </div>

                {/* Button */}
                <button
                    onClick={goHome}
                    className="mt-7 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md"
                >
                    Continue Shopping
                </button>

            </div>
        </div>
    );
}