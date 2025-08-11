import React from "react";
import { useState } from "react";



function CategoryDropdown({ setCategory, categories, placeHolder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(placeHolder);

  const handleSelect = (value) => {
    setSelected(value);
    setCategory(value);
    setIsOpen(false);
  };

  return (
    <div className="relative w-[80%]">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`border ${isOpen ? "rounded-t-xl" : "rounded-xl"} p-2 bg-white shadow cursor-pointer flex justify-between items-center`}
      >
        {selected}
        <span className="ml-2">{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded-b-xl shadow z-10">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleSelect(cat)}
              className="p-2 hover:bg-gray-200 cursor-pointer transform duration-300"
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;