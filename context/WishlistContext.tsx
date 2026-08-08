"use client"
import { WishlistType } from "@/types/wishlisttype";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface WishlistContextType {
  wishlist: WishlistType[];
  addtoWishlist: (item: WishlistType) => void;
  toggleWishlist: (item: WishlistType) => void;
  removeFromWishlist: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearWishlist: () => void;
  totalItems: number;
}
const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistType[]>([]);
  const cacheKey = "wishlist";
  useEffect(() => {
    const stored = localStorage.getItem(cacheKey);
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(cacheKey, JSON.stringify(wishlist));
  }, [wishlist]);

  const addtoWishlist = (item: WishlistType) => {
    setWishlist((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: p.quantity,
              }
            : p,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const removeFromWishlist = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };
  const toggleWishlist = (item: WishlistType) => {
  setWishlist((prev) => {
    const exists = prev.find((p) => p.id === item.id);

    if (exists) {
      return prev.filter((p) => p.id !== item.id); // remove
    }

    return [...prev, { ...item, quantity: 1 }]; // add
  });
};
  const increaseQuantity = (id: number) => {
    setWishlist((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };
  const decreaseQuantity = (id: number) => {
    setWishlist((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(item.quantity - 1, 0),
              }
            : item,
        )
        .filter((item) => item.id != id || item.quantity > 0),
    );
  };
  const clearWishlist = () => {
    setWishlist([]);
  };
  const totalItems = wishlist.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addtoWishlist,
        clearWishlist,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        removeFromWishlist,
        toggleWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("Please Wrap Wishlist");
  }
  return context;
};
