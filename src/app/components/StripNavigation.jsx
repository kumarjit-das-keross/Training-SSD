'use client';

import {useState} from 'react';
import {IKONIcon} from '../components/SVGIcons';


export default function StripNavigation({menuItems, onMenuItemClick, onChildMenuItemClick}) {
  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);
  const [selectedChildMenuItem, setSelectedChildMenuItem] = useState(menuItems[0].children[0]);
  const childMenuItems = selectedMenuItem.children || [];

  onMenuItemClick = typeof onMenuItemClick === 'function' ? onMenuItemClick : () => {};
  onChildMenuItemClick = typeof onChildMenuItemClick === 'function' ? onChildMenuItemClick : () => {};

  return (
    <div className='grow flex min-w-72 max-w-72'>
      <nav className="bg-blue-500 min-w-12 max-w-12">
        <ul>
          <li className="flex items-center justify-center px-1 py-2 h-12">{IKONIcon}</li>
          {menuItems.map((item, index) => (
            <li key={index} className={
              `flex items-center justify-center w-full h-12 ${selectedMenuItem.title === item.title ? 'bg-blue-800' : 'hover:bg-blue-700'}`
            } title={item.title}>
              <a
                href="#"
                className="px-1 py-2 inline-block w-8 h-8 text-white"
                onClick={() => {
                  setSelectedMenuItem(item);
                  setSelectedChildMenuItem(item.children[0]);
                  onMenuItemClick(item);
                }}
              >
                <span className="flex items-center justify-center w-full h-full">{item.icon}</span>
                <span className="sr-only">{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {childMenuItems.length > 0 && (
        <div className='min-w-60 max-w-60 border-e'>
          <ul className='divide-y'>
            {childMenuItems.map((item, index) => (
              <li key={index} className={
                `flex items-center justify-start h-12 ${selectedChildMenuItem.title === item.title ? 'bg-gray-200' : 'hover:bg-gray-100'}`
              } title={item.title}>
                <a
                  href="#"
                  className="flex items-center gap-1 px-1 py-2 w-full"
                  onClick={() => {
                    setSelectedChildMenuItem(item);
                    onChildMenuItemClick(item);
                  }}
                >
                  <span className="w-8 h-8 flex items-center justify-center">{item.icon}</span>
                  <span className="inline-block">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
