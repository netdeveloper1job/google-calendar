import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import ViewDropdown from "./ViewDropdown";

export default function CalendarHeader() {
  const {
    monthIndex,
    setMonthIndex,
    selectedView,
    setDaySelected,
    daySelected,
  } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handlePrevDate() {
    setDaySelected(daySelected.subtract(1, "day"));
    setMonthIndex(daySelected.$M);
  }
  function handleNextDate() {
    setDaySelected(daySelected.add(1, "day"));
    setMonthIndex(daySelected.$M);
  }
  function handleReset() {
    let currentDate = dayjs();
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
    setDaySelected(
      daySelected
        .year(currentDate.year())
        .month(currentDate.month())
        .date(currentDate.date())
    );
  }
  return (
    <header className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">Calendar</h1>
        <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
          Today
        </button>
        <button
          onClick={selectedView === "Month" ? handlePrevMonth : handlePrevDate}
        >
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button
          onClick={selectedView === "Month" ? handleNextMonth : handleNextDate}
        >
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>
        <h2 className="ml-4 text-xl text-gray-500 font-bold">
          {selectedView === "Month"
            ? dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")
            : daySelected.format("MMMM DD, YYYY")}
        </h2>
      </div>
      <ViewDropdown />
    </header>
  );
}
