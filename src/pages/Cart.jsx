import React from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptyCart from "../assets/empty-cart.png";

const Cart = ({ location, getLocation }) => {
  const { cartItem, updateQuantity, deleteItem } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

          {/* Cart Items */}
          <div className="mt-10">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.thumbnail || item.images?.[0]}
                    alt={item.title}
                    className="w-20 h-20 rounded-md object-contain bg-white"
                  />
                  <div>
                    <h1 className="md:w-[300px] line-clamp-2">{item.title}</h1>
                    <p className="text-red-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="bg-red-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                  <button onClick={() => updateQuantity(item.id, "decrease")}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, "increase")}>
                    +
                  </button>
                </div>

                {/* Delete */}
                <FaRegTrashAlt
                  className="text-red-500 text-2xl cursor-pointer"
                  onClick={() => deleteItem(item.id)}
                />
              </div>
            ))}
          </div>

          {/* Checkout Section */}
          <div className="grid md:grid-cols-2 grid-cols-1 md:gap-20">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>

              <input
                className="p-2 rounded-md w-full"
                value={user?.fullName || ""}
                readOnly
              />

              <input
                className="p-2 rounded-md w-full"
                value={location?.neighbourhood || ""}
                readOnly
              />

              <div className="flex gap-5">
                <input
                  className="p-2 rounded-md w-full"
                  value={location?.city || ""}
                  readOnly
                />
                <input
                  className="p-2 rounded-md w-full"
                  value={location?.postcode || ""}
                  readOnly
                />
              </div>

              <div className="flex gap-5">
                <input
                  className="p-2 rounded-md w-full"
                  value={location?.country || ""}
                  readOnly
                />
                <input
                  className="p-2 rounded-md w-full"
                  placeholder="Phone number"
                />
              </div>

              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3">
                Submit
              </button>

              <div className="text-center text-gray-600">
                ---------- OR ----------
              </div>

              <button
                className="bg-red-500 text-white px-3 py-2 rounded-md w-full"
                onClick={getLocation}
              >
                Detect Location
              </button>
            </div>

            {/* Bill Details */}
            <div className="bg-white shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
              <h1 className="font-bold text-xl">Bill Details</h1>

              <div className="flex justify-between">
                <span className="flex gap-1 items-center">
                  <LuNotebookText /> Items Total
                </span>
                <span>${totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="flex gap-1 items-center">
                  <MdOutlineDeliveryDining /> Delivery
                </span>
                <span className="text-green-600">FREE</span>
              </div>

              <div className="flex justify-between">
                <span className="flex gap-1 items-center">
                  <GiShoppingBag /> Handling
                </span>
                <span>$5</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold text-lg">
                <span>Grand Total</span>
                <span>${totalPrice + 5}</span>
              </div>

              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full mt-3">
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500 font-bold text-5xl">
            Your Cart Is Empty
          </h1>
          <img src={emptyCart} className="w-[400px]" />
          <button
            onClick={() => navigate("/product")}
            className="bg-red-500 text-white px-3 py-2 rounded-md"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
