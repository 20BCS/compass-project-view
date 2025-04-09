
import React from 'react';
import { useApp } from '../context/AppContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function MembersPage() {
  const { currentWorkspace } = useApp();

  if (!currentWorkspace) {
    return <div>No workspace selected</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold">Workspace Members</h1>
        </div>
        <Button 
          size="lg" 
          className="bg-nexablue-800 hover:bg-nexablue-700"
        >
          Invite Member
        </Button>
      </div>

      <Card className="rounded-md border">
        <div className="grid grid-cols-3 py-3 px-4 border-b font-medium text-sm text-gray-500">
          <div>User</div>
          <div>Role</div>
          <div className="text-right">Actions</div>
        </div>
        {currentWorkspace.members.map((member) => (
          <div key={member.id} className="grid grid-cols-3 py-4 px-4 border-b last:border-0 items-center">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-nexablue-100 text-nexablue-800">
                  {member.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-xs text-gray-500">{member.email}</div>
              </div>
            </div>
            <div className="capitalize">{member.role}</div>
            <div className="text-right">
              <button className="text-gray-500 hover:text-nexablue-800 mr-4">Edit</button>
              {member.role !== 'owner' && (
                <button className="text-red-500 hover:text-red-700">Remove</button>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
