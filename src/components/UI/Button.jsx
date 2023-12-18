export const Button = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      className="text-white flex items-center justify-center bg-violet-600 rounded-2xl py-3 px-5 outline-none hover:bg-violet-500 h-fit"
    >
      {children}
    </button>
  );
};
