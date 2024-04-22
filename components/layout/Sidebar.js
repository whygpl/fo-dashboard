import React, { useRef } from 'react';
import OutsideClick from '../../utils/outsideClick';
import Nav from './sidebar/Nav';
import SettingButton from './sidebar/SettingButton';
import Logo from './sidebar/logo';

const Sidebar = ({mobileNavsidebar}) => {
    const sidebarRef = useRef(null);
    const sidebarOutsideClick = OutsideClick(sidebarRef);

    //console.log("sidebar Ref", sidebarRef)
    //console.log("sidebar Ref sidebarOutsideClick", sidebarOutsideClick)
    return (
        <aside className={`sm:flex sm:flex-col z-50`} ref={sidebarRef}>
            {/*<Logo />*/}
            
            <div className="flex-grow flex flex-col justify-between">
                {/*<Nav sidebarOutsideClick={sidebarOutsideClick} />
                <SettingButton />*/}
                <select onChange={(e) => handleClick(e.target.value)} className="bg-gray-50 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="0">Tahun Aktif</option>
                    <option value="2021">Tahun 2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                </select> 
                
            </div>
        </aside>
    );
};

export default Sidebar;