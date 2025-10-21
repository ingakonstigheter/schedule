import React from "react";

export default function ValidationError({
  errors,
  field,
}: {
  errors?: Record<string, String[]>;
  field: string;
}) {
  if (!errors || !errors[field]) return null;
  return (
    <ul className="text-sm bold text-red-600 mt-1">
      {errors[field].map((message, index) => (
        <li key={index}>{message}</li>
      ))}
    </ul>
  );
}
