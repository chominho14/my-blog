interface TextAreaProps {
  label?: string;
  name?: string;
  [key: string]: any;
}

export default function TextArea({ label, name, ...rest }: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        className="placeholder-gray-400 mt-1 shadow-sm w-full focus:ring-red-500 rounded-md border-gray-300 focus:border-red-500 hover:border-red-300"
        rows={10}
        {...rest}
      />
    </div>
  );
}
