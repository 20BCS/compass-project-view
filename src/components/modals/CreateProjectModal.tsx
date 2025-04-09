
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApp } from '@/context/AppContext';
import { Project, EnvironmentType, ProjectMember } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import { 
  Dialog, 
  DialogContent, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Stepper } from '@/components/Stepper';
import { toast } from 'sonner';

// Create project form schema
const projectInfoSchema = z.object({
  name: z.string().min(3, { message: 'Project name must be at least 3 characters' }),
  description: z.string().min(5, { message: 'Description must be at least 5 characters' }),
});

const environmentsSchema = z.object({
  development: z.boolean().default(true),
  staging: z.boolean().default(true),
  production: z.boolean().default(true),
});

type ProjectInfoValues = z.infer<typeof projectInfoSchema>;
type EnvironmentsValues = z.infer<typeof environmentsSchema>;

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectModal({ open, onOpenChange }: CreateProjectModalProps) {
  const { currentUser, currentWorkspace, addProject } = useApp();
  const [step, setStep] = useState(0);

  const projectInfoForm = useForm<ProjectInfoValues>({
    resolver: zodResolver(projectInfoSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const environmentsForm = useForm<EnvironmentsValues>({
    resolver: zodResolver(environmentsSchema),
    defaultValues: {
      development: true,
      staging: true,
      production: true,
    },
  });

  const steps = ['Project Info', 'Environments', 'Review'];

  const handleNextStep = () => {
    if (step === 0) {
      projectInfoForm.handleSubmit(() => {
        setStep(1);
      })();
    } else if (step === 1) {
      environmentsForm.handleSubmit(() => {
        setStep(2);
      })();
    }
  };

  const handlePreviousStep = () => {
    setStep(Math.max(0, step - 1));
  };

  const handleCreateProject = () => {
    if (!currentWorkspace || !currentUser) return;

    const projectInfo = projectInfoForm.getValues();
    const environmentsInfo = environmentsForm.getValues();

    // Create environment objects
    const environments: EnvironmentType[] = [];
    if (environmentsInfo.development) environments.push('development');
    if (environmentsInfo.staging) environments.push('staging');
    if (environmentsInfo.production) environments.push('production');

    // Create the project object
    const projectId = uuidv4();
    const environmentObjects = environments.map(envType => ({
      id: uuidv4(),
      name: envType,
      projectId: projectId,
      createdAt: new Date().toISOString(),
    }));

    // Create the project member with permissions
    const environmentPermissions = environmentObjects.map(env => ({
      id: uuidv4(),
      environmentId: env.id,
      permission: 'full-access' as const,
    }));

    const projectMember: ProjectMember = {
      id: uuidv4(),
      userId: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
      role: 'owner' as const,
      avatar: currentUser.avatar,
      environmentPermissions: environmentPermissions,
    };

    const newProject: Project = {
      id: projectId,
      name: projectInfo.name,
      description: projectInfo.description,
      createdAt: new Date().toISOString(),
      workspaceId: currentWorkspace.id,
      environments: environmentObjects,
      members: [projectMember],
    };

    // Add the project to the context
    addProject(newProject);

    // Reset the form and close the modal
    projectInfoForm.reset();
    environmentsForm.reset();
    setStep(0);
    onOpenChange(false);
    
    // Show success message
    toast.success('Project created successfully');
  };

  const handleClose = () => {
    projectInfoForm.reset();
    environmentsForm.reset();
    setStep(0);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl mb-4">Create New Project</DialogTitle>
          <div className="px-4">
            <Stepper steps={steps} currentStep={step} />
          </div>
        </DialogHeader>

        <div className="py-4 px-1">
          {step === 0 && (
            <Form {...projectInfoForm}>
              <form className="space-y-6">
                <FormField
                  control={projectInfoForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={projectInfoForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe what this project is about" 
                          className="resize-none h-24" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}

          {step === 1 && (
            <Form {...environmentsForm}>
              <form className="space-y-6">
                <div className="text-sm text-gray-500 mb-4">
                  Select which environments you want to set up for this project:
                </div>
                <div className="space-y-3">
                  <FormField
                    control={environmentsForm.control}
                    name="development"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 accent-nexablue-800"
                          />
                        </FormControl>
                        <FormLabel className="font-medium">
                          Development Environment
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={environmentsForm.control}
                    name="staging"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 accent-nexablue-800"
                          />
                        </FormControl>
                        <FormLabel className="font-medium">
                          Staging Environment
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={environmentsForm.control}
                    name="production"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={field.onChange}
                            className="w-4 h-4 accent-nexablue-800"
                          />
                        </FormControl>
                        <FormLabel className="font-medium">
                          Production Environment
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium mb-1">Project Information</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Name:</div>
                  <div>{projectInfoForm.getValues().name}</div>
                  <div className="text-gray-500">Description:</div>
                  <div>{projectInfoForm.getValues().description}</div>
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium mb-1">Selected Environments</div>
                <div className="space-y-1">
                  {environmentsForm.getValues().development && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="text-sm">Development</div>
                    </div>
                  )}
                  {environmentsForm.getValues().staging && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="text-sm">Staging</div>
                    </div>
                  )}
                  {environmentsForm.getValues().production && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <div className="text-sm">Production</div>
                    </div>
                  )}
                </div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium mb-1">Project Owner</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                    {currentUser?.name?.charAt(0) || "U"}
                  </div>
                  <div className="text-sm">{currentUser?.name} (You)</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between">
          {step > 0 ? (
            <Button variant="outline" onClick={handlePreviousStep}>
              Back
            </Button>
          ) : (
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
          )}
          
          {step < steps.length - 1 ? (
            <Button onClick={handleNextStep}>
              Next
            </Button>
          ) : (
            <Button onClick={handleCreateProject}>
              Create Project
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
