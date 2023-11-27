const Counter = ({ cardProduct, increaseFunc, decreaseFunc }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={decreaseFunc}
      >
        -
      </button>
      <div className="text-xl font-semibold">{cardProduct.quantity}</div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg"
        onClick={increaseFunc}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
