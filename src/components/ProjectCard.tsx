
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <div className="border border-gray-200 rounded-md p-6 h-full hover:shadow-md transition-shadow">
        <div className="mb-4">
          <div className="inline-block bg-blue-100 p-2 rounded">
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
              className="text-nexablue-800"
            >
              <path d="M12 5L4 15l8-2 8 2-8-10z"></path>
              <path d="M12 13v8"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">{project.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{project.description}</p>
        <div className="text-xs text-gray-400">created Just Now</div>
      </div>
    </Link>
  );
}
