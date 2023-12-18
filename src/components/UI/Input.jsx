export const Input = ({ label, type, placeholder, value, onChange, required }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-white text-sm" htmlFor="inputId">
        {label}
      </label>
      <input
        required={required}
        autoCapitalize="on"
        autoComplete="on"
        className="bg-slate-900 px-5 py-3 rounded-2xl text-white text-sm outline-none border-2 border-transparent border-solid focus:border-white"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
