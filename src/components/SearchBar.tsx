import React from "react";

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

export default function SearchBar({ query, onQueryChange, onSearch }: Props) {
  return (
    <form onSubmit={onSearch} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Введите название фильма..."
        style={{ padding: "8px", width: "300px", marginRight: "10px" }}
      />
      <button type="submit">Найти</button>
    </form>
  );
}
