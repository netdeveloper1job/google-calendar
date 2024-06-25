import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext';


const generateTimeArray12Hour = () => {
    const times = [];
    let hour = 12;
    let minute = 0;
    let period = 'AM';

    for (let i = 0; i < 96; i++) {
        let hour12 = hour % 12 || 12;
        let time = `${hour12.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}${period}`;
        times.push(time);

        minute += 15;
        if (minute === 60) {
            minute = 0;
            hour++;
        }
        if (hour === 24) {
            hour = 0;
            period = period === 'AM' ? 'PM' : 'AM';
        }
    }

    return times;
};

export default function TimeDropdown() {
    const { selectedTime, setSelectedTime } = useContext(GlobalContext);
    const timesArray12Hour = generateTimeArray12Hour();

    const handleSelect = (val) => {
        setSelectedTime(val);
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300">
                    {selectedTime}
                    <span className="material-icons-outlined cursor-pointer -mr-1 h-5 w-5 text-gray-400">
                        expand_more
                    </span>
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-full h-[152px] overflow-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
                <div className="py-1">
                    {timesArray12Hour.map((time, i) => (
                        <MenuItem key={i}>
                            {({ active }) => (
                                <div
                                    onClick={() => handleSelect(time)}
                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                        } block px-4 py-2 text-sm cursor-pointer`}
                                >
                                    {time}
                                </div>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}
