import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type: string;
  kind?: "text" | "email" | "password";
  required: boolean;
  register: UseFormRegisterReturn;
}

export default function Input({
  label,
  name,
  type,
  kind = "text",
  register,
  required,
}: InputProps) {
  return (
    <div className="mb-4">
      <label className="mt-4 text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      {kind === "email" ? (
        <input
          id={name}
          //   autoComplete="off"
          type={type}
          required={required}
          {...register}
          className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
        />
      ) : null}
      {kind === "text" ? (
        <input
          id={name}
          // autoComplete="off"
          type={type}
          required={required}
          {...register}
          className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
        />
      ) : null}
      {kind === "password" ? (
        <input
          id={name}
          // autoComplete="off"
          type={type}
          required={required}
          {...register}
          className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
        />
      ) : null}
    </div>
  );
}
