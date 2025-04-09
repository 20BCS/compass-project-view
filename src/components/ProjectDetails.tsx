
import React from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function ProjectDetails() {
  const { projectId } = useParams();
  const { projects } = useApp();
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return <div className="p-8 text-center">Project not found</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-[400px] grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="environments">Environments</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Information</CardTitle>
                <CardDescription>Key details about this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Created</span>
                    <span>
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Members</span>
                    <span>{project.members.length}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-gray-500">Environments</span>
                    <span>{project.environments.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
                <CardDescription>People with access to this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {project.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
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
                      <div className="text-sm font-medium capitalize">{member.role}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="environments">
          <div className="mt-6 grid grid-cols-1 gap-6">
            {project.environments.map((env) => (
              <Card key={env.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${
                        env.name === 'development' ? 'bg-green-500' : 
                        env.name === 'staging' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <CardTitle className="capitalize">{env.name}</CardTitle>
                    </div>
                    <div className="text-xs text-gray-500">Created {new Date(env.createdAt).toLocaleDateString()}</div>
                  </div>
                  <CardDescription>
                    {env.name === 'development' ? 'For development and testing purposes' : 
                     env.name === 'staging' ? 'Pre-production environment for final testing' : 
                     'Live production environment'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-3">Member Permissions</h4>
                  <div className="space-y-3">
                    {project.members.map((member) => {
                      const permission = member.environmentPermissions.find(
                        (p) => p.environmentId === env.id
                      );
                      return (
                        <div key={member.id} className="flex items-center justify-between">
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
                          <div className={`text-sm font-medium px-3 py-1 rounded-full 
                            ${permission?.permission === 'read-only' ? 'bg-gray-100' : 
                              permission?.permission === 'read-write' ? 'bg-blue-100 text-blue-800' : 
                              'bg-green-100 text-green-800'}`}>
                            {permission?.permission || 'No access'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="members">
          <div className="mt-6 space-y-5">
            <div className="flex justify-between">
              <h3 className="text-lg font-medium">Project Members</h3>
              <button className="text-sm font-medium text-nexablue-800 hover:text-nexablue-700">
                Add Member
              </button>
            </div>

            <div className="rounded-md border">
              <div className="grid grid-cols-4 py-3 px-4 border-b font-medium text-sm text-gray-500">
                <div>Name</div>
                <div>Role</div>
                <div>Permissions</div>
                <div className="text-right">Actions</div>
              </div>
              {project.members.map((member) => (
                <div key={member.id} className="grid grid-cols-4 py-3 px-4 border-b last:border-0 items-center">
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
                  <div>
                    <div className="flex flex-wrap gap-1">
                      {project.environments.map((env) => {
                        const permission = member.environmentPermissions.find(
                          (p) => p.environmentId === env.id
                        );
                        return (
                          <div
                            key={env.id}
                            className={`text-xs px-2 py-1 rounded-full 
                              ${permission?.permission === 'read-only' ? 'bg-gray-100' : 
                                permission?.permission === 'read-write' ? 'bg-blue-100 text-blue-800' : 
                                'bg-green-100 text-green-800'}`}
                          >
                            {env.name.slice(0, 3)}: {permission?.permission}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-right">
                    <button className="text-gray-500 hover:text-nexablue-800">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Settings</CardTitle>
                <CardDescription>Manage your project configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <Input value={project.name} className="max-w-md" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea value={project.description} className="max-w-md" />
                  </div>
                  <div>
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for this project</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    Deleting this project will remove all associated environments, settings, and access. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Project</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Import Input and Textarea at the top
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
