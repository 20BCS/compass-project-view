
import React from 'react';
import { useApp } from '../context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const { currentUser, currentWorkspace } = useApp();

  return (
    <header className="h-16 border-b flex items-center justify-between px-6">
      <div className="flex items-center">
        <div className="font-semibold">
          {currentWorkspace?.name || "Workspace"}
        </div>
        <span className="mx-2 text-gray-400">|</span>
        <div className="text-gray-500">{currentWorkspace?.description || ""}</div>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-600 font-medium flex items-center gap-1 hover:text-nexablue-800">
          <span className="sr-only">Integrations</span>
          <code className="rounded border border-gray-200 px-1">&lt;/&gt;</code>
          <span>Integrations</span>
        </button>
        <button className="text-gray-600 font-medium flex items-center gap-1 hover:text-nexablue-800">
          <span>Help center</span>
        </button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt={currentUser?.name || ""} />
          <AvatarFallback className="bg-nexablue-100 text-nexablue-800">
            {currentUser?.name?.split(' ').map(n => n[0]).join('') || "SC"}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
