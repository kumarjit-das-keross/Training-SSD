'use client';

import './globals.css';

import StripNavigation from '@/app/components/StripNavigation';
import {CardTextIcon, DashboardIcon, HomeIcon, ReportsIcon} from '@/app/components/SVGIcons';
import DashboardPage from '@/app/pages/DashboardPage';
import ReportsPage from '@/app/pages/ReportsPage';
import DoesNotExistPage from '@/app/pages/DoesNotExistPage';
import {useState} from 'react';

function getPage(pageName) {
  if (pageName === 'Home - Dashboard') {
    return DashboardPage;
  } else if (pageName === 'Home - Reports') {
    return ReportsPage;
  }

  return DoesNotExistPage;
}

export default function Home() {
  const mainMenuItems = [
    {
      title:    'Home',
      icon:     {
        type:    'svg',
        element: HomeIcon
      },
      children: [
        {
          isMain: true,
          title:  'Dashboard',
          icon:   {
            type:    'svg',
            element: DashboardIcon
          }
        },
        {
          title: 'Reports',
          icon:  {
            type:    'svg',
            element: ReportsIcon
          }
        }
      ],
      selected: true
    },
    {
      title:    'Extra',
      icon:     {
        type:    'svg',
        element: CardTextIcon
      },
      children: [
        {
          isMain: true,
          title:  'Child 1',
          icon:   {
            type:    'svg',
            element: DashboardIcon
          }
        },
        {
          title: 'Child 2',
          icon:  {
            type:    'svg',
            element: ReportsIcon
          }
        }
      ]
    }
  ];

  const [menu, setMenu] = useState(mainMenuItems[0].title);
  const [page, setPage] = useState(DashboardPage);

  const onMenuItemClick = (item) => {
    setMenu(item.title);
    const pageName = `${item.title} - ${item.children[0].title}`;
    setPage(getPage(pageName));
  };

  const onChildMenuItemClick = (item) => {
    const pageName = `${menu} - ${item.title}`;
    setPage(getPage(pageName));
  };

  return (
    <div className="h-full flex">
      <StripNavigation
        menuItems={mainMenuItems}
        onChildMenuItemClick={onChildMenuItemClick}
        onMenuItemClick={onMenuItemClick}
      />
      <main className="grow">
        {page}
      </main>
    </div>
  );
}
