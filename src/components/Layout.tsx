
import React from 'react';
import { AppSidebar } from './AppSidebar';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="min-h-screen flex w-full">
      <AppSidebar />
      <div className="flex-1 pl-[71px]">
        <Header />
        <main className="px-6 py-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
