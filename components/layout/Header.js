import { MoonIcon } from '@heroicons/react/24/solid';
import React from "react";
import LogOutButton from './header/LogOutButton';
import Notifications from './header/Notifications';
import SearchBox from './header/SearchBox';
import UserMenu from './header/UserMenu';

const Header = () => {
  
  return (
    <header className="flex float-right items-center">
        <UserMenu />
        <Notifications />
        <LogOutButton />        
    </header>
  );
};

export default Header;