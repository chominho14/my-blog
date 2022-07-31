interface InputProps {
  label: string;
  name: string;
  type: string;
  required: boolean;
  kind?: "text" | "email" | "password";
  [key: string]: any;
}

export default function Input({
  label,
  name,
  type,
  kind = "text",
  required,
  ...rest
}: InputProps) {
  return (
    <div>
      <label className="mt-4 text-sm font-medium text-gray-700" htmlFor={name}>
        {label}
      </label>
      {kind === "email" ? (
        <input
          id={name}
          //   autoComplete="off"
          {...rest}
          className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
        />
      ) : null}
      {kind === "text" ? (
        <input
          id={name}
          autoComplete="off"
          {...rest}
          className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
        />
      ) : null}
      {kind === "password" ? (
        <input
          id={name}
          autoComplete="off"
          {...rest}
          className="hover:border-red-400 mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-300 focus:border-red-300"
        />
      ) : null}
    </div>
  );
}
