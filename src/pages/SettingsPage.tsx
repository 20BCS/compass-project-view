
import React from 'react';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function SettingsPage() {
  const { currentWorkspace } = useApp();

  if (!currentWorkspace) {
    return <div>No workspace selected</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Workspace Settings</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Update your workspace details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm font-medium mb-1">Workspace Name</label>
                <Input defaultValue={currentWorkspace.name} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea defaultValue={currentWorkspace.description || ''} />
              </div>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authentication & Security</CardTitle>
            <CardDescription>Manage your workspace security settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-w-md">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">API Keys</h4>
                  <p className="text-sm text-gray-500">Generate API keys for programmatic access</p>
                </div>
                <Button variant="outline">Manage Keys</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions for this workspace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Deleting this workspace will remove all associated projects, environments, and access. This action cannot be undone.
              </p>
              <Button variant="destructive">Delete Workspace</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
