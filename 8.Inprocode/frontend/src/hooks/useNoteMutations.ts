// src/hooks/useNoteMutations.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notes } from '../types/Notes';

export const useNoteMutations = () => {
  const queryClient = useQueryClient();

  const deleteNote = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete note');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });

  const updateNote = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Notes> }) => {
      const response = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (!response.ok) throw new Error('Failed to update note');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });

  return { deleteNote, updateNote };
};