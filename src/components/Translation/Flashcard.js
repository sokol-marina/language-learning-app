import React, { useState } from 'react';
import { supabase } from '../../supabase';
import '../../styles/Flashcard.css'; // Import CSS for styling

const Flashcard = ({ id, word, translation, initialMemorized, onDelete, onUpdate }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMemorized, setIsMemorized] = useState(initialMemorized);

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };
  const handleToggleMemorized = async () => {
    console.log('Before Update:', { id, newMemorizedState: !isMemorized });

    const { data, error } = await supabase
    .from('flashcards')
    .update({ memorized: !isMemorized }) // Toggle memorized state
    .eq('id', id)
    .select();

    if (error) {
      console.error('Failed to update memorized state:', error.message);
    } else {
      console.log('Update successful:', data);
      // Update the local state
      setIsMemorized((prev) => !prev);
      // Notify the parent component to update the flashcards array
      if (onUpdate && data[0]) {
      onUpdate(data[0]); // Pass the updated flashcard
    }
    }
  };

  const handleDelete = async () => {
    const { error } = await supabase.from('flashcards').delete().eq('id', id);

    if (error) {
      console.error('Failed to delete flashcard:', error.message);
    } else {
      // Notify parent to remove the flashcard from the list
      onDelete(id);
    }
  }
  return (
    <div className="flashcard-container">
    <div
      className={`flashcard ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}>
      <div className={`flashcard-front ${isMemorized ? 'memorized' : ''}`}>
        {word}
      </div>
      <div className="flashcard-back">{translation}</div>
    </div>
    <button
      className={`memorized-button ${isMemorized ? 'active' : ''}`}
      onClick={handleToggleMemorized}>
      {isMemorized ? 'Mark as Unmemorized' : 'Mark as Memorized'}
    </button>
    <button className="delete-button" onClick={handleDelete}>
      Delete
    </button>
  </div>
  );
};

export default Flashcard;
