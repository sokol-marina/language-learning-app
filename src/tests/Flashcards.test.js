import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { supabase } from '../supabase';
import Flashcards from '../components/Translation/Flashcards';

// Mock Supabase
jest.mock('../supabase', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(),
    },
    from: jest.fn(),
  },
}));

describe('Flashcards Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('renders flashcards fetched from Supabase', async () => {
    supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
    });
    supabase.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: [
            { id: '1', word: 'Hello', translation: 'Hola' },
            { id: '2', word: 'World', translation: 'Mundo' },
          ],
          error: null,
        }),
      }),
    });

    render(<Flashcards />);

    const hello = await screen.findByText('Hello');
    const hola = await screen.findByText('Hola');

    expect(hello).toBeInTheDocument();
    expect(hola).toBeInTheDocument();
  });

  it('shows an error message if fetching flashcards fails', async () => {
    supabase.auth.getUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
    });
    supabase.from.mockReturnValue({
      select: jest.fn(() => ({
        eq: jest.fn().mockResolvedValue({
          data: null, // Simulate no data returned
          error: { message: 'Error fetching flashcards' }, // Simulate an error
        }),
      })),
    });

    render(<Flashcards />);

    await waitFor(() => {
      expect(
        screen.getByText('Failed to fetch flashcards.')
      ).toBeInTheDocument();
    });
  });
});
