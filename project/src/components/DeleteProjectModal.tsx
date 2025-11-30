import { useState } from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface DeleteProjectModalProps {
  projectName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DELETE_PASSWORD = 'delete';

export function DeleteProjectModal({ projectName, onClose, onConfirm }: DeleteProjectModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === DELETE_PASSWORD) {
      onConfirm();
      onClose();
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <AlertTriangle size={24} className="text-red-600" />
            <h3 className="text-xl font-semibold text-gray-800">Delete Project</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800 mb-2">
            <strong>Warning:</strong> This action cannot be undone.
          </p>
          <p className="text-sm text-red-700">
            All code snippets in "{projectName}" will be permanently deleted.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter password to confirm deletion
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-colors ${
                error
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-red-500'
              }`}
              placeholder="Type password"
              autoFocus
            />
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>

          <p className="text-xs text-gray-500 mb-4">
            Password hint: It's a common word related to removal
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
