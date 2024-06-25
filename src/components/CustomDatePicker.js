import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useContext } from 'react'
import GlobalContext from '../context/GlobalContext';
import SmallCalendar from './SmallCalendar';


export default function CustomDatepicker() {
    const { daySelected } = useContext(GlobalContext);

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-300">
                    {/* <input
                        type="text"
                        name="datepicker"
                        placeholder="select date"
                        value={daySelected.format("MMMM DD, YYYY")}
                        className="pt-3 border-0 text-gray-600 text-sm font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                    /> */}
                    {daySelected.format("MMMM DD, YYYY")}
                </MenuButton>
            </div>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in w-full p-[10px]"
            >
                <div className="py-1">
                    <MenuItem>
                        <SmallCalendar />
                    </MenuItem>
                </div>
            </MenuItems>
        </Menu>
    )
}
