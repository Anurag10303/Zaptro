import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItem));
  }, [cartItem]);

  // Add to cart
  const addToCart = (product) => {
    setCartItem((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);

      if (existingItem) {
        toast.success("Product quantity increased!");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      toast.success("Product added to cart!");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // Update quantity
  const updateQuantity = (productId, action) => {
    setCartItem((prev) => {
      const updated = prev
        .map((item) => {
          if (item.id !== productId) return item;

          const newQty =
            action === "increase" ? item.quantity + 1 : item.quantity - 1;

          return newQty > 0 ? { ...item, quantity: newQty } : null;
        })
        .filter(Boolean);

      toast.success(
        action === "increase"
          ? "Product quantity increased!"
          : "Product quantity decreased!",
      );

      return updated;
    });
  };

  // Delete item
  const deleteItem = (productId) => {
    setCartItem((prev) => prev.filter((item) => item.id !== productId));
    toast.success("Product removed from cart!");
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        addToCart,
        updateQuantity,
        deleteItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
