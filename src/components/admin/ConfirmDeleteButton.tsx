/*
  ConfirmDeleteButton — client component for delete actions that need confirmation.
  Wraps a form with a server action and shows a browser confirm dialog.
*/
"use client";

interface ConfirmDeleteButtonProps {
  action: () => Promise<void>;
  confirmMessage: string;
  label?: string;
}

export default function ConfirmDeleteButton({
  action,
  confirmMessage,
  label = "Delete",
}: ConfirmDeleteButtonProps) {
  const handleClick = async () => {
    if (!confirm(confirmMessage)) return;
    await action();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="px-3 py-1 text-xs font-heading font-semibold uppercase tracking-wide border border-red-200 rounded text-red-600 hover:bg-red-50 transition-colors"
    >
      {label}
    </button>
  );
}
