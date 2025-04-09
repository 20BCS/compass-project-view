
export type Role = 'owner' | 'admin' | 'member' | 'viewer';
export type EnvironmentType = 'development' | 'staging' | 'production';
export type PermissionLevel = 'read-only' | 'read-write' | 'full-access';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  members: WorkspaceMember[];
  projects: Project[];
}

export interface WorkspaceMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  workspaceId: string;
  environments: Environment[];
  members: ProjectMember[];
}

export interface ProjectMember {
  id: string;
  userId: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  environmentPermissions: EnvironmentPermission[];
}

export interface Environment {
  id: string;
  name: EnvironmentType;
  projectId: string;
  createdAt: string;
}

export interface EnvironmentPermission {
  id: string;
  environmentId: string;
  permission: PermissionLevel;
}
