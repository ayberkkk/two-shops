const Counter = ({ cardProduct, increaseFunc, decreaseFunc }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        className="lg:border lg:border-red-500 lg:bg-transparent bg-red-500 font-bold py-2 px-4 rounded-lg transition-all ease-in duration-300 text-white lg:text-black hover:bg-red-600 hover:text-white"
        onClick={decreaseFunc}
      >
        -
      </button>
      <div className="text-xl font-semibold">{cardProduct.quantity}</div>
      <button
        className="lg:border lg:border-green-500 lg:bg-transparent bg-green-500 font-bold py-2 px-4 rounded-lg transition-all ease-in duration-300 text-white lg:text-black hover:bg-green-600 hover:text-white"
        onClick={increaseFunc}
      >
        +
      </button>
    </div>
  );
};

export default Counter;
