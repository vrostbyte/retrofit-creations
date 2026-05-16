/*
  Input — form field component supporting text inputs, textareas, selects, and file uploads.

  All fields share: dark background, white text, blue focus ring.
  Error state renders a red border and error message below.

  Usage:
    <Input label="Your Name" name="name" required />
    <Input label="Message" name="message" type="textarea" rows={4} />
    <Input label="Service" name="service" type="select" options={[...]} />
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

/* Shared classes for all field types */
const fieldBase =
  "w-full bg-zinc-900 text-brand-white border border-brand-blue/20 rounded-md px-4 py-3 " +
  "placeholder-zinc-500 " +
  "focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue " +
  "transition-colors duration-200";

const fieldError = "border-red-500 focus:border-red-500 focus:ring-red-500";

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

    /* File upload gets special styling — dark dashed dropzone feel */
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
            "w-full text-sm text-zinc-400 " +
            "file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 " +
            "file:text-sm file:font-heading file:font-semibold file:uppercase file:tracking-wider " +
            "file:bg-brand-blue/20 file:text-brand-blue file:cursor-pointer " +
            "hover:file:bg-brand-blue/30 " +
            "border border-dashed border-brand-blue/30 rounded-md p-4 cursor-pointer " +
            `${error ? "border-red-500" : ""} ${className}`
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
          className="text-sm font-heading font-medium uppercase tracking-wider text-zinc-300"
        >
          {label}
          {required && <span className="text-brand-blue ml-1">*</span>}
        </label>
      )}
      {renderField()}
      {error && (
        <p id={`${name}-error`} role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
