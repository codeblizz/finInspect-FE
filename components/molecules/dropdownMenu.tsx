import { Fragment, SVGProps, useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { HiChevronDown, HiUserCircle } from 'react-icons/hi2';
import {
  DuplicateActiveIcon,
  DuplicateInactiveIcon,
  EditActiveIcon,
  EditInactiveIcon,
  MoveActiveIcon,
  MoveInactiveIcon,
} from 'components/assets/icons/headlessui';
import { signOut } from 'next-auth/react';

export default function DropdownMenu() {

  const logout = async () => {
    localStorage.removeItem('accessToken');
    await signOut({ redirect: false });
  };
  
  return (
    <Menu as='div' className='relative inline-block text-left'>
      <Menu.Button className='inline-flex w-full justify-center rounded-md bg-opacity-20 px-4 py-1 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>
        <HiUserCircle className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100' />
        <HiChevronDown
          className='ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100'
          aria-hidden='true'
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='px-1 py-1 '>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-green-800 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <EditActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <EditInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  Edit Profile
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-green-800 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  {active ? (
                    <DuplicateActiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  ) : (
                    <DuplicateInactiveIcon
                      className='mr-2 h-5 w-5'
                      aria-hidden='true'
                    />
                  )}
                  View Profile
                </button>
              )}
            </Menu.Item>
          </div>
          <div className='px-1 py-1'>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-green-800 text-white' : 'text-gray-900'
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={logout}
                >
                  {active ? (
                    <MoveActiveIcon
                      className='mr-2 h-5 w-5 text-green-800'
                      aria-hidden='true'
                    />
                  ) : (
                    <MoveInactiveIcon
                      className='mr-2 h-5 w-5 text-green-800'
                      aria-hidden='true'
                    />
                  )}
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
