import React, { useState, useEffect, useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function DayView({ month }) {
  const [timezone, setTimezone] = useState("");
  const [currentTotalMinutes, setCurrentTotalMinutes] = useState("");
  const { daySelected } = useContext(GlobalContext);

  useEffect(() => {
    const now = new Date();
    setCurrentTotalMinutes(now.getHours() * 60 + now.getMinutes());
    const getFormattedTimezone = () => {
      const offset = new Date().getTimezoneOffset();
      const absoluteOffset = Math.abs(offset);
      const hours = Math.floor(absoluteOffset / 60);
      const minutes = absoluteOffset % 60;
      const sign = offset <= 0 ? "+" : "-";
      return `GMT${sign}${String(hours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")}`;
    };

    setTimezone(getFormattedTimezone());
  }, []);

  const hours = [
    ...Array.from(
      { length: 24 },
      (_, i) => `${i % 12 === 0 ? 12 : i % 12} ${i < 12 ? "AM" : "PM"}`
    ),
  ].filter((hour) => hour !== "12 AM");

  hours.push("12 AM");

  setInterval(() => {
    const now = new Date();
    setCurrentTotalMinutes(now.getHours() * 60 + now.getMinutes());
  }, 1000)

  const renderDynamicminutes = {
    top: `${currentTotalMinutes}px`,
  };

  return (
    <div className="flex-1">
      <div className="flex items-end">
        <div className="flex flex-col items-end justify-end w-[7%] text-[11px] h-[40px] text-gray-500">
          {timezone}
        </div>
        <div className="flex flex-row items-end justify-start w-full min-h-[40px] border-b border-gray-200">
          <div className="border border-l-gray-200 h-[20px] ml-2"></div>
          <div className="flex-1">
            <div className="text-[11px] text-blue-600 font-[600] ml-[10px]">{daySelected.format('dddd')}</div>
            <div className="flex items-center justify-center text-[25px] bg-blue-500 rounded-full text-white h-[46px] w-[46px] ml-2 mb-2">
              {daySelected.format("DD")}
            </div>
          </div>
        </div>
      </div>
      <div className="block h-[calc(100vh-135.5px)] overflow-auto">
        <div
          className="relative left-0 w-full" style={renderDynamicminutes}
        >
          <div className="flex items-center">
            <div className="w-[6.9%]"></div>
            <div className="flex-1 h-px bg-red-500 relative">
              <div className="absolute left-0 top-1/2 w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>
        {hours.map((hour, index) => (
          <div className="flex flex-row" key={index}>
            <div className="flex flex-col items-end justify-end w-[7%] text-[11px] h-[59px] text-gray-500">
              {hour === "12 AM" ? "" : hour}
            </div>
            <div className="flex flex-row items-end justify-start w-[98%] min-h-[40px] border-b border-gray-200">
              <div className="border border-l-gray-200 h-[59px] ml-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
