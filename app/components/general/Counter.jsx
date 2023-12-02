const Counter = ({ cardProduct, increaseFunc, decreaseFunc }) => {
  return (
    <div className="flex items-center lg:space-x-4 space-x-2">
      <button
        className="lg:border lg:border-red-500 lg:bg-transparent bg-red-500 font-bold py-2 lg:px-4 px-3 rounded-lg transition-all ease-in duration-300 text-white lg:text-black hover:bg-red-600 hover:text-white"
        onClick={decreaseFunc}
      >
        -
      </button>
      <div className="text-xl font-semibold">{cardProduct.quantity}</div>
      <button
        className="lg:border lg:border-green-500 lg:bg-transparent bg-green-500 font-bold py-2 lg:px-4 px-3 rounded-lg transition-all ease-in duration-300 text-white lg:text-black hover:bg-green-600 hover:text-white"
        onClick={increaseFunc}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
