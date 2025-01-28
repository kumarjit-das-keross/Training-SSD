'use client';

import './globals.css';

import StripNavigation from './components/StripNavigation';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import DoesNotExistPage from './pages/DoesNotExistPage';
import {useState} from 'react';
import {FileChartColumn, Heading1, Heading2, House, LayoutDashboard, RectangleEllipsis} from 'lucide-react';

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
      icon:     <House size={16} strokeWidth={1}/>,
      children: [
        {
          isMain: true,
          title:  'Dashboard',
          icon:   <LayoutDashboard size={16} strokeWidth={1}/>
        },
        {
          title: 'Reports',
          icon:  <FileChartColumn size={16} strokeWidth={1}/>
        }
      ],
      selected: true
    },
    {
      title:    'Extra',
      icon:     <RectangleEllipsis size={16} strokeWidth={1}/>,
      children: [
        {
          isMain: true,
          title:  'Child 1',
          icon:   <Heading1 size={16} strokeWidth={1}/>
        },
        {
          title: 'Child 2',
          icon:  <Heading2 size={16} strokeWidth={1}/>
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
      <main className="flex flex-row flex-grow gap-4 h-full w-full overflow-x-hidden overflow-y-hidden relative">
        <div className="w-full h-full p-4">
          {page}
        </div>
      </main>
    </div>
  );
}
