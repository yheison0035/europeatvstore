import { useState } from "react";

export default function Counter({ count, setCount, quantity }) {
  const handleIncrease = () => {
    if (count < quantity) setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleDecrease}
        className="w-8 h-8 text-lg flex items-center justify-center border text-gray-800 rounded-full hover:bg-gray-100"
      >
        −
      </button>
      <span className="text-lg text-gray-800">{count}</span>
      <button
        onClick={handleIncrease}
        className="w-8 h-8 text-lg flex items-center justify-center border text-gray-800 rounded-full hover:bg-gray-100"
      >
        +
      </button>
      <span className="text-xs text-black">(Disponibles: {quantity})</span>
    </div>
  );
}
