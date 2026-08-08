import { useWishlist } from "@/context/WishlistContext";
import { Heart } from "lucide-react";

export default function WishlistButton({ product }: any) {
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.some((p) => p.id === product.id);
  return (
    <>
      <button
        className="wishlist-btn"
        onClick={() =>
          toggleWishlist({
            id: product.id,
            title: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
          })
        }
      >
        <Heart
          size={18}
          fill={isWishlisted ? "red" : "none"}
          color={isWishlisted ? "red" : "currentColor"}
        />
      </button>
    </>
  );
}
