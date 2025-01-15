import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import Flashcard from './Flashcard';
import ProgressBar from '../ProgressBar';
import '../../styles/Flashcards.css';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [error, setError] = useState('');

  // Fetch flashcards from the database
  useEffect(() => {
    const fetchFlashcards = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError('User not authenticated.');
        return;
      }

      const { data, error } = await supabase
        .from('flashcards')
        .select('id, word, translation, memorized')
        .eq('user_id', user.id);

      if (error) {
        setError('Failed to fetch flashcards.');
        console.error('Error fetching flashcards:', error.message);
      } else {
        console.log('Fetched flashcards:', data); // Debug fetched data
        setFlashcards(data);
      }
    };

    fetchFlashcards();
  }, []);

// Filter and limit flashcards to the first 9 that are not memorized
const visibleFlashcards = flashcards.filter((flashcard) => !flashcard.memorized).slice(0, 9);

// Calculate the total number of flashcards by determining the length of the flashcards array.
const totalFlashcards = flashcards.length;

// Filter the flashcards array to include only those marked as "memorized" (where memorized is true),
const memorizedFlashcards = flashcards.filter((flashcard) => flashcard.memorized).length;

const handleUpdateFlashcard = (updatedFlashcard) => {
  setFlashcards((prev) =>
    prev.map((flashcard) =>
      flashcard.id === updatedFlashcard.id ? updatedFlashcard : flashcard
    )
  );
};

  const handleDelete = (id) => {
    setFlashcards((prev) => prev.filter((flashcard) => flashcard.id !== id));
  };

  return (
    <div className="flashcards-container">
    <h2>Flashcards</h2>
    {error && <p className="error">{error}</p>}
    <ProgressBar total={totalFlashcards} memorized={memorizedFlashcards} />
    <div className="flashcards-grid">
      {visibleFlashcards.map((flashcard) => (
        <Flashcard
          key={flashcard.id}
          id={flashcard.id}
          word={flashcard.word}
          translation={flashcard.translation}
          initialMemorized={flashcard.memorized}
          onDelete={handleDelete}
          onUpdate={handleUpdateFlashcard}
        />
      ))}
    </div>
    {visibleFlashcards.length === 0 && (
      <p>No more flashcards to display. All flashcards are memorized!</p>
    )}
  </div>
  );
};

export default Flashcards;
