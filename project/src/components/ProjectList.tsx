import { Plus, FolderOpen, Edit2, Trash2 } from 'lucide-react';
import { Project } from '../lib/supabase';

interface ProjectListProps {
  projects: Project[];
  selectedProject: Project | null;
  onSelectProject: (project: Project) => void;
  onAddProject: () => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
}

export function ProjectList({ projects, selectedProject, onSelectProject, onAddProject, onEditProject, onDeleteProject }: ProjectListProps) {
  return (
    <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Projects</h2>
        <button
          onClick={onAddProject}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          New Project
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {projects.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <FolderOpen size={48} className="mx-auto mb-2 text-gray-300" />
            <p>No projects yet</p>
            <p className="text-sm">Create one to get started</p>
          </div>
        ) : (
          <div className="p-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className={`rounded-lg mb-2 transition-colors ${
                  selectedProject?.id === project.id
                    ? 'bg-blue-50 border-2 border-blue-500'
                    : 'bg-gray-50 border-2 border-transparent'
                }`}
              >
                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full text-left p-3 hover:bg-gray-100 rounded-t-lg transition-colors"
                >
                  <div className="font-medium text-gray-800">{project.name}</div>
                  {project.description && (
                    <div className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</div>
                  )}
                </button>
                {selectedProject?.id === project.id && (
                  <div className="flex gap-2 p-2 border-t border-blue-200 bg-blue-50">
                    <button
                      onClick={onEditProject}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={onDeleteProject}
                      className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
