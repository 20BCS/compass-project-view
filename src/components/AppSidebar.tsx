
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Plus, Users, Folder, Settings, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppSidebar() {
  const location = useLocation();
  const { currentWorkspace } = useApp();

  const navItems = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      name: 'Dashboard',
      path: '/',
    },
    {
      icon: <Folder className="w-5 h-5" />,
      name: 'Projects',
      path: '/projects',
    },
    {
      icon: <Users className="w-5 h-5" />,
      name: 'Members',
      path: '/members',
    },
    {
      icon: <Settings className="w-5 h-5" />,
      name: 'Settings',
      path: '/settings',
    }
  ];

  return (
    <div className="h-screen bg-sidebar fixed left-0 top-0 w-[71px] flex flex-col items-center py-4 text-sidebar-foreground">
      <div className="mb-8">
        <Link to="/" className="block">
          <div className="w-10 h-10 bg-white rounded flex items-center justify-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-nexablue-800"
            >
              <path d="M12 5L4 15l8-2 8 2-8-10z"></path>
              <path d="M12 13v8"></path>
            </svg>
          </div>
        </Link>
      </div>
      <div className="mb-6">
        <button className="w-10 h-10 bg-sidebar-accent rounded-md flex items-center justify-center hover:bg-sidebar-accent/80 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <nav className="flex flex-col items-center gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "w-10 h-10 rounded-md flex items-center justify-center",
              location.pathname === item.path || 
              (item.path === '/projects' && location.pathname.startsWith('/projects'))
                ? "bg-sidebar-accent text-sidebar-foreground"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 transition-colors"
            )}
            title={item.name}
          >
            {item.icon}
          </Link>
        ))}
      </nav>
      <div className="mt-auto">
        <div className="w-10 h-10 bg-sidebar-accent rounded-full flex items-center justify-center uppercase text-sm font-medium" title={currentWorkspace?.name || "Workspace"}>
          {currentWorkspace?.name?.charAt(0) || "W"}
        </div>
      </div>
    </div>
  );
}
