import { useState, useEffect } from 'react';
import { supabase, Project, CodeSnippet } from './lib/supabase';
import { ProjectList } from './components/ProjectList';
import { CodeSnippetList } from './components/CodeSnippetList';
import { AddProjectModal } from './components/AddProjectModal';
import { AddCodeModal } from './components/AddCodeModal';
import { EditProjectModal } from './components/EditProjectModal';
import { DeleteProjectModal } from './components/DeleteProjectModal';
import { Code2 } from 'lucide-react';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [snippets, setSnippets] = useState<CodeSnippet[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddCode, setShowAddCode] = useState(false);
  const [showEditProject, setShowEditProject] = useState(false);
  const [showDeleteProject, setShowDeleteProject] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadSnippets(selectedProject.id);
    }
  }, [selectedProject]);

  const loadProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading projects:', error);
    } else if (data) {
      setProjects(data);
      if (data.length > 0 && !selectedProject) {
        setSelectedProject(data[0]);
      }
    }
    setLoading(false);
  };

  const loadSnippets = async (projectId: string) => {
    const { data, error } = await supabase
      .from('code_snippets')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading snippets:', error);
    } else if (data) {
      setSnippets(data);
    }
  };

  const handleAddProject = async (name: string, description: string) => {
    const { data, error } = await supabase
      .from('projects')
      .insert([{ name, description }])
      .select()
      .single();

    if (error) {
      console.error('Error adding project:', error);
    } else if (data) {
      setProjects([data, ...projects]);
      setSelectedProject(data);
    }
  };

  const handleAddSnippet = async (title: string, code: string, language: string) => {
    if (!selectedProject) return;

    const { data, error } = await supabase
      .from('code_snippets')
      .insert([
        {
          project_id: selectedProject.id,
          title,
          code,
          language,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding snippet:', error);
    } else if (data) {
      setSnippets([data, ...snippets]);
    }
  };

  const handleDeleteSnippet = async (id: string) => {
    const { error } = await supabase.from('code_snippets').delete().eq('id', id);

    if (error) {
      console.error('Error deleting snippet:', error);
    } else {
      setSnippets(snippets.filter((s) => s.id !== id));
    }
  };

  const handleEditProject = async (name: string, description: string) => {
    if (!selectedProject) return;

    const { error } = await supabase
      .from('projects')
      .update({ name, description })
      .eq('id', selectedProject.id);

    if (error) {
      console.error('Error updating project:', error);
    } else {
      const updatedProject = { ...selectedProject, name, description };
      setSelectedProject(updatedProject);
      setProjects(
        projects.map((p) => (p.id === selectedProject.id ? updatedProject : p))
      );
    }
  };

  const handleDeleteProject = async () => {
    if (!selectedProject) return;

    const { error } = await supabase.from('projects').delete().eq('id', selectedProject.id);

    if (error) {
      console.error('Error deleting project:', error);
    } else {
      const newProjects = projects.filter((p) => p.id !== selectedProject.id);
      setProjects(newProjects);
      setSelectedProject(newProjects.length > 0 ? newProjects[0] : null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <ProjectList
        projects={projects}
        selectedProject={selectedProject}
        onSelectProject={setSelectedProject}
        onAddProject={() => setShowAddProject(true)}
        onEditProject={() => setShowEditProject(true)}
        onDeleteProject={() => setShowDeleteProject(true)}
      />

      {selectedProject ? (
        <CodeSnippetList
          project={selectedProject}
          snippets={snippets}
          onAddSnippet={() => setShowAddCode(true)}
          onDeleteSnippet={handleDeleteSnippet}
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Code2 size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg">Select a project to view code snippets</p>
          </div>
        </div>
      )}

      {showAddProject && (
        <AddProjectModal onClose={() => setShowAddProject(false)} onAdd={handleAddProject} />
      )}

      {showAddCode && (
        <AddCodeModal onClose={() => setShowAddCode(false)} onAdd={handleAddSnippet} />
      )}

      {showEditProject && selectedProject && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setShowEditProject(false)}
          onSave={handleEditProject}
        />
      )}

      {showDeleteProject && selectedProject && (
        <DeleteProjectModal
          projectName={selectedProject.name}
          onClose={() => setShowDeleteProject(false)}
          onConfirm={handleDeleteProject}
        />
      )}
    </div>
  );
}

export default App;
