import { useState } from "react";

export default function DateInput({ form, setForm, value, htmlFor }) {
  const formatDate = (input) => {
    const cleaned = input.replace(/\D/g, "").slice(0, 8); // 숫자만, 최대 8자리

    if (cleaned.length < 5) return cleaned;
    if (cleaned.length < 7) return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4, 6)}-${cleaned.slice(6)}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [htmlFor]: formatDate(e.target.value) });
  };

  return (
    <input
      id={htmlFor}
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="YYYY-MM-DD"
    />
  );
}
