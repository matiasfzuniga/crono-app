import React, { ChangeEvent, useEffect, useState } from "react";

interface ColorPickerProps {
  value?: string;
}

const ColorPicker = ({ value = "#FFA14F" }: ColorPickerProps) => {
  const [color, setColor] = useState(value);
  const pickerID = `color-picker_${1}`;

  const handleColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  useEffect(() => {
    setColor(value);
  }, [value]);

  return (
    <div className="flex">
      <p className="bg-gray-700 px-3 py-1 m-1 rounded-lg w-[85px]">{color}</p>
      <input onChange={handleColorChange} type="color" id={pickerID} className="h-0 w-0 opacity-0" />
      <section className="relative">
        <label htmlFor={pickerID}>
            <div style={{backgroundColor:color}} className="absolute top-1 h-8 w-8 rounded-lg border border-gray-900"/>       
        </label>
      </section>
    </div>
  );
};

export default ColorPicker;

