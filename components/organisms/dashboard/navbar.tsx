import React from 'react';
import classNames from 'classnames';

function Navbar({ className, navIcon, navMenu, dropdownMenu }: any) {
  return (
    <nav
      className={classNames([
        className,
        'bg-green-900 border border-gray-500 flex justify-between px-2 items-center h-16 min-w-full',
      ])}
    >
      <div className='float-left flex justify-evenly divide-x-2'>{navIcon}</div>
      <div className='float-right flex justify-between'>
        {navMenu}
        <div className='pl-4'>{dropdownMenu}</div> 
      </div> 
    </nav>
  );
}

export default Navbar;
