
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Workspace, Project, WorkspaceMember, ProjectMember, Environment } from '../types';

interface AppContextType {
  currentUser: User | null;
  currentWorkspace: Workspace | null;
  workspaces: Workspace[];
  projects: Project[];
  setCurrentUser: (user: User | null) => void;
  setCurrentWorkspace: (workspace: Workspace | null) => void;
  addWorkspace: (workspace: Workspace) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  addWorkspaceMember: (workspaceId: string, member: WorkspaceMember) => void;
  addProjectMember: (projectId: string, member: ProjectMember) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  // Mock data for initial testing
  React.useEffect(() => {
    const mockUser: User = {
      id: '1',
      name: 'Sarah Chen',
      email: 'sc@example.com',
    };
    setCurrentUser(mockUser);

    const mockWorkspace: Workspace = {
      id: '1',
      name: 'NexaStack',
      description: 'Main workspace for NexaStack team',
      createdAt: new Date().toISOString(),
      members: [
        {
          id: '1',
          userId: '1',
          name: 'Sarah Chen',
          email: 'sc@example.com',
          role: 'owner',
        }
      ],
      projects: [],
    };
    
    const mockProjects: Project[] = [
      {
        id: '1',
        name: 'NexaStack AI',
        description: 'AI model excelling in math, coding, and reasoning, achieving strong performance with efficient training and fewer resources.',
        createdAt: new Date().toISOString(),
        workspaceId: '1',
        environments: [
          { id: '1', name: 'development', projectId: '1', createdAt: new Date().toISOString() },
          { id: '2', name: 'staging', projectId: '1', createdAt: new Date().toISOString() },
          { id: '3', name: 'production', projectId: '1', createdAt: new Date().toISOString() },
        ],
        members: [
          {
            id: '1',
            userId: '1',
            name: 'Sarah Chen',
            email: 'sc@example.com',
            role: 'owner',
            environmentPermissions: [
              { id: '1', environmentId: '1', permission: 'full-access' },
              { id: '2', environmentId: '2', permission: 'full-access' },
              { id: '3', environmentId: '3', permission: 'full-access' },
            ],
          },
        ],
      },
      {
        id: '2',
        name: 'Automation Workflow',
        description: 'AI model excelling in math, coding, and reasoning, achieving strong performance with efficient training and fewer resources.',
        createdAt: new Date().toISOString(),
        workspaceId: '1',
        environments: [
          { id: '4', name: 'development', projectId: '2', createdAt: new Date().toISOString() },
          { id: '5', name: 'staging', projectId: '2', createdAt: new Date().toISOString() },
          { id: '6', name: 'production', projectId: '2', createdAt: new Date().toISOString() },
        ],
        members: [
          {
            id: '2',
            userId: '1',
            name: 'Sarah Chen',
            email: 'sc@example.com',
            role: 'owner',
            environmentPermissions: [
              { id: '4', environmentId: '4', permission: 'full-access' },
              { id: '5', environmentId: '5', permission: 'full-access' },
              { id: '6', environmentId: '6', permission: 'full-access' },
            ],
          },
        ],
      }
    ];

    mockWorkspace.projects = mockProjects;
    setWorkspaces([mockWorkspace]);
    setCurrentWorkspace(mockWorkspace);
    setProjects(mockProjects);
  }, []);

  const addWorkspace = (workspace: Workspace) => {
    setWorkspaces((prev) => [...prev, workspace]);
  };

  const addProject = (project: Project) => {
    setProjects((prev) => [...prev, project]);
    if (currentWorkspace) {
      setCurrentWorkspace({
        ...currentWorkspace,
        projects: [...currentWorkspace.projects, project],
      });
      setWorkspaces((prev) =>
        prev.map((w) =>
          w.id === currentWorkspace.id
            ? { ...w, projects: [...w.projects, project] }
            : w
        )
      );
    }
  };

  const updateProject = (project: Project) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === project.id ? project : p))
    );
    if (currentWorkspace) {
      setCurrentWorkspace({
        ...currentWorkspace,
        projects: currentWorkspace.projects.map((p) =>
          p.id === project.id ? project : p
        ),
      });
      setWorkspaces((prev) =>
        prev.map((w) =>
          w.id === currentWorkspace.id
            ? {
                ...w,
                projects: w.projects.map((p) =>
                  p.id === project.id ? project : p
                ),
              }
            : w
        )
      );
    }
  };

  const addWorkspaceMember = (workspaceId: string, member: WorkspaceMember) => {
    setWorkspaces((prev) =>
      prev.map((w) =>
        w.id === workspaceId
          ? { ...w, members: [...w.members, member] }
          : w
      )
    );
    if (currentWorkspace?.id === workspaceId) {
      setCurrentWorkspace({
        ...currentWorkspace,
        members: [...currentWorkspace.members, member],
      });
    }
  };

  const addProjectMember = (projectId: string, member: ProjectMember) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, members: [...p.members, member] }
          : p
      )
    );
    if (currentWorkspace) {
      setCurrentWorkspace({
        ...currentWorkspace,
        projects: currentWorkspace.projects.map((p) =>
          p.id === projectId
            ? { ...p, members: [...p.members, member] }
            : p
        ),
      });
      setWorkspaces((prev) =>
        prev.map((w) =>
          w.id === currentWorkspace.id
            ? {
                ...w,
                projects: w.projects.map((p) =>
                  p.id === projectId
                    ? { ...p, members: [...p.members, member] }
                    : p
                ),
              }
            : w
        )
      );
    }
  };

  const value = {
    currentUser,
    currentWorkspace,
    workspaces,
    projects,
    setCurrentUser,
    setCurrentWorkspace,
    addWorkspace,
    addProject,
    updateProject,
    addWorkspaceMember,
    addProjectMember,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
