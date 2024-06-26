import React, { useState, useContext, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { mockUserData } from "../assets/dummyData";
import CustomDatepicker from "./CustomDatePicker";
import TimeDropdown from "./TimeDropdown";
const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent, selectedTime, setSelectedTime } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [allDay, setAllDay] = useState(selectedEvent ? selectedEvent.allDay : true);
  const [user, setUser] = useState(selectedEvent ? selectedEvent.user : "");
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  useEffect(() => {
    setSelectedTime(selectedEvent ? selectedEvent.time : "12:00AM")
  },[selectedEvent])

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      user,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
      createdBy: JSON.parse(localStorage.getItem("user"))?.id,
      time: selectedTime,
      allDay: allDay,
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-[40%]">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/12 items-end gap-y-5">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-sm font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <div className="flex-1 grid grid-cols-[75%_minmax(25%,_1fr)]"><CustomDatepicker /> {!allDay && <TimeDropdown />}</div>
            <div></div>
            <p className="flex items-center text-sm text-gray-600 font-semibold gap-x-[10px]"><input
              type="checkbox" checked={allDay} onChange={() => setAllDay(!allDay)}
              className={`flex form-checkbox text-blue rounded focus:ring-0 cursor-pointer`}
            />All day</p>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
              className="pt-3 border-0 text-gray-600 text-sm font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
            <span className="material-icons-outlined text-gray-400">
              account_circle
            </span>
            <select
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              id="underline_select"
              className="pt-3 border-0 text-gray-600 text-sm font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
            >
              <option value="">Select a user</option>
              {mockUserData.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
