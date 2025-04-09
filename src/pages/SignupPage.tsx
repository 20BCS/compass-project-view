
import React from 'react';
import { SignupForm } from '../components/auth/SignupForm';

export function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 bg-nexablue-800 rounded-lg flex items-center justify-center mb-4">
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
          <h2 className="text-3xl font-bold text-gray-900">NexaStack</h2>
          <p className="mt-2 text-gray-600">Project Management Platform</p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
