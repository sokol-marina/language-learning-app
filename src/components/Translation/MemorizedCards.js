import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabase';
import '../../styles/Flashcards.css'; // Reuse the existing Flashcards styles

const MemorizedCards = () => {
  const [memorizedCards, setMemorizedCards] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemorizedCards = async () => {
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
        .eq('user_id', user.id)
        .eq('memorized', true); // Fetch only memorized cards

      if (error) {
        setError('Failed to fetch memorized cards.');
        console.error('Error fetching memorized cards:', error.message);
      } else {
        console.log('Fetched memorized cards:', data);
        setMemorizedCards(data);
      }
    };

    fetchMemorizedCards();
  }, []);

  return (
    <div className="flashcards-container">
      <h2>Memorized Flashcards</h2>
      {error && <p className="error">{error}</p>}
      <div className="flashcards-grid">
        {memorizedCards.map((card) => (
          <div key={card.id} className="flashcard-container memorized">
            <div className="flashcard">
              <div className="flashcard-front">{card.word}</div>
              <div className="flashcard-back">{card.translation}</div>
            </div>
          </div>
        ))}
      </div>
      {memorizedCards.length === 0 && <p>No memorized cards available.</p>}
    </div>
  );
};

export default MemorizedCards;
