
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper } from '@/components/Stepper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const workspaceInfoSchema = z.object({
  workspaceName: z.string().min(3, 'Workspace name must be at least 3 characters'),
  workspaceDescription: z.string().optional(),
});

type PersonalInfoValues = z.infer<typeof personalInfoSchema>;
type WorkspaceInfoValues = z.infer<typeof workspaceInfoSchema>;

export function SignupForm() {
  const [step, setStep] = useState(0);
  const { setCurrentUser, addWorkspace, setCurrentWorkspace } = useApp();
  const navigate = useNavigate();

  const personalInfoForm = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const workspaceInfoForm = useForm<WorkspaceInfoValues>({
    resolver: zodResolver(workspaceInfoSchema),
    defaultValues: {
      workspaceName: '',
      workspaceDescription: '',
    },
  });

  const steps = ['Personal Information', 'Create Workspace'];

  const handleNextStep = () => {
    if (step === 0) {
      personalInfoForm.handleSubmit(() => {
        setStep(1);
      })();
    }
  };

  const handlePreviousStep = () => {
    setStep(Math.max(0, step - 1));
  };

  const handleComplete = () => {
    workspaceInfoForm.handleSubmit((workspaceData) => {
      const personalData = personalInfoForm.getValues();

      // Create a new user
      const userId = uuidv4();
      const user = {
        id: userId,
        name: `${personalData.firstName} ${personalData.lastName}`,
        email: personalData.email,
      };

      // Create a new workspace
      const workspaceId = uuidv4();
      const workspace = {
        id: workspaceId,
        name: workspaceData.workspaceName,
        description: workspaceData.workspaceDescription || '',
        createdAt: new Date().toISOString(),
        members: [
          {
            id: uuidv4(),
            userId,
            name: user.name,
            email: user.email,
            role: 'owner',
          },
        ],
        projects: [],
      };

      // Update the app context
      setCurrentUser(user);
      addWorkspace(workspace);
      setCurrentWorkspace(workspace);

      // Navigate to the dashboard and show success message
      toast.success('Account created successfully!');
      navigate('/projects');
    })();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Create an Account</h2>
      
      <div className="mb-8">
        <Stepper steps={steps} currentStep={step} />
      </div>

      {step === 0 && (
        <Form {...personalInfoForm}>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={personalInfoForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={personalInfoForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={personalInfoForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={personalInfoForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button type="button" className="w-full" onClick={handleNextStep}>
                Next
              </Button>
            </div>
          </form>
        </Form>
      )}

      {step === 1 && (
        <Form {...workspaceInfoForm}>
          <form className="space-y-4">
            <FormField
              control={workspaceInfoForm.control}
              name="workspaceName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Workspace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={workspaceInfoForm.control}
              name="workspaceDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="A workspace for my team" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between pt-4">
              <Button type="button" variant="outline" onClick={handlePreviousStep}>
                Back
              </Button>
              <Button type="button" onClick={handleComplete}>
                Complete Setup
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
