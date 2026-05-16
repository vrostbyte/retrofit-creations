/*
  Input — form field component (light-body theme, PRD v1.2.0).

  White background, dark text (#000), gray border (#E8E8E8), blue focus ring.
  Error state: red border + error message below.
*/
"use client";

interface BaseProps {
  label?: string;
  name: string;
  error?: string;
  className?: string;
  required?: boolean;
  placeholder?: string;
}

interface TextInputProps extends BaseProps {
  type?: "text" | "email" | "tel" | "number" | "date" | "file" | "password";
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  multiple?: boolean;
  min?: string | number;
  max?: string | number;
}

interface TextareaProps extends BaseProps {
  type: "textarea";
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

interface SelectProps extends BaseProps {
  type: "select";
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

type InputProps = TextInputProps | TextareaProps | SelectProps;

/* Shared base — white bg, dark text, gray border, blue focus ring */
const fieldBase =
  "w-full bg-white text-black border border-[#E8E8E8] rounded-md px-4 py-3 " +
  "placeholder-gray-400 " +
  "focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue " +
  "transition-colors duration-200";

const fieldError = "border-red-400 focus:border-red-500 focus:ring-red-500";

export default function Input(props: InputProps) {
  const { label, name, error, className = "", required } = props;

  const fieldClasses = `${fieldBase} ${error ? fieldError : ""} ${className}`;

  const renderField = () => {
    if (props.type === "textarea") {
      return (
        <textarea
          id={name}
          name={name}
          rows={props.rows ?? 4}
          value={props.value}
          onChange={props.onChange}
          placeholder={props.placeholder}
          required={required}
          className={fieldClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      );
    }

    if (props.type === "select") {
      return (
        <select
          id={name}
          name={name}
          value={props.value}
          onChange={props.onChange}
          required={required}
          className={`${fieldClasses} appearance-none cursor-pointer`}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        >
          <option value="">Select an option</option>
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }

    if (props.type === "file") {
      return (
        <input
          id={name}
          name={name}
          type="file"
          onChange={props.onChange as React.ChangeEventHandler<HTMLInputElement>}
          required={required}
          accept={props.accept}
          multiple={props.multiple}
          className={
            "w-full text-sm text-gray-600 " +
            "file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 " +
            "file:text-sm file:font-heading file:font-semibold file:uppercase file:tracking-wider " +
            "file:bg-brand-blue/10 file:text-brand-blue file:cursor-pointer " +
            "hover:file:bg-brand-blue/20 " +
            "border border-dashed border-[#E8E8E8] rounded-md p-4 cursor-pointer bg-white " +
            `${error ? "border-red-400" : ""} ${className}`
          }
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      );
    }

    return (
      <input
        id={name}
        name={name}
        type={props.type ?? "text"}
        value={props.value}
        onChange={props.onChange as React.ChangeEventHandler<HTMLInputElement>}
        placeholder={props.placeholder}
        required={required}
        min={props.min}
        max={props.max}
        className={fieldClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    );
  };

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-heading font-medium uppercase tracking-wider text-gray-700"
        >
          {label}
          {required && <span className="text-brand-blue ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {error && (
        <p id={`${name}-error`} role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
