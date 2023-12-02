const Button = ({ text, onClick, size, outline, disabled }) => {
  return (
    <div>
      <button
        disabled={disabled}
        className={`rounded-lg p-3 uppercase font-bold
        ${size ? "lg:w-[450px] w-[170px]" : "w-full"}
        ${
          outline
            ? "border text-black"
            : "bg-orange-500 text-white transition-all ease-in duration-400 hover:bg-green-500"
        }`}
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
