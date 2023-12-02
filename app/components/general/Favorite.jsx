"use client"
import { useState, useEffect } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const FavoriteButton = ({ productId, onFavoriteChange }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    setIsFavorite(!!favorites[productId]);
  }, [productId]);

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);

    const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    if (newFavoriteStatus) {
      favorites[productId] = true;
    } else {
      delete favorites[productId];
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));

    // Favori durumu değiştiğinde tetikle
    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  return (
    <div
      className={`cursor-pointer flex items-center justify-center border bg-white shadow-lg border-gray-200 rounded-full w-10 h-10 transition-all duration-200 ease-in-out hover:border-[#f55645] group-hover:bg-[#f55645]/90`}
      onClick={toggleFavorite}
    >
      {isFavorite ? (
        <AiFillHeart size={18} className="text-red-500" />
      ) : (
        <AiOutlineHeart
          size={18}
          className="text-gray-500 group-hover:text-white"
        />
      )}
    </div>
  );
};

export default FavoriteButton;
