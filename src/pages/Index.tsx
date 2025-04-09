
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-nexablue-800 rounded flex items-center justify-center mr-3">
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
                className="text-white"
              >
                <path d="M12 5L4 15l8-2 8 2-8-10z"></path>
                <path d="M12 13v8"></path>
              </svg>
            </div>
            <h1 className="text-xl font-bold">NexaStack</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
            >
              Log In
            </Button>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <div className="container mx-auto px-6 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 sm:text-5xl">
              Project Management for Modern Teams
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              Organize projects, manage environments, and collaborate with your team seamlessly.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="px-8 bg-nexablue-800 hover:bg-nexablue-700"
                onClick={() => navigate('/signup')}
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8"
                onClick={() => navigate('/login')}
              >
                Log In
              </Button>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-12 h-12 bg-nexablue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nexablue-800">
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                  <path d="M13 5v2"></path>
                  <path d="M13 17v2"></path>
                  <path d="M13 11v2"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Multi-Environment Management</h3>
              <p className="text-gray-600">
                Manage development, staging, and production environments with granular access controls.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-nexablue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nexablue-800">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Team Collaboration</h3>
              <p className="text-gray-600">
                Work together effectively with role-based permissions and secure sharing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-nexablue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-nexablue-800">
                  <path d="M18 6 7 17l-5-5"></path>
                  <path d="m22 10-7.5 7.5L13 16"></path>
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">Streamlined Workflows</h3>
              <p className="text-gray-600">
                Automate processes and track project progress with intuitive interfaces.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 border-t py-12">
        <div className="container mx-auto px-6 text-center text-gray-500">
          <p>© 2025 NexaStack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
