import { Plus, Code2, Trash2 } from 'lucide-react';
import { CodeSnippet, Project } from '../lib/supabase';

interface CodeSnippetListProps {
  project: Project;
  snippets: CodeSnippet[];
  onAddSnippet: () => void;
  onDeleteSnippet: (id: string) => void;
}

export function CodeSnippetList({ project, snippets, onAddSnippet, onDeleteSnippet }: CodeSnippetListProps) {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          <button
            onClick={onAddSnippet}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={20} />
            Add Code
          </button>
        </div>
        {project.description && (
          <p className="text-gray-600">{project.description}</p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {snippets.length === 0 ? (
          <div className="text-center py-12">
            <Code2 size={64} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 text-lg mb-2">No code snippets yet</p>
            <p className="text-gray-400">Add your first code snippet to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {snippets.map((snippet) => (
              <div
                key={snippet.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between p-4 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-start gap-3 flex-1">
                    <Code2 size={20} className="text-gray-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 break-words">{snippet.title}</h3>
                      <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded inline-block mt-2">
                        {snippet.language}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteSnippet(snippet.id)}
                    className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-50 rounded flex-shrink-0 ml-2"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <pre className="p-4 overflow-auto bg-gray-900 text-gray-100 text-sm flex-1 max-h-64">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
