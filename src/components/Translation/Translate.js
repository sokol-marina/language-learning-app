import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { supabase } from '../../supabase';
import '../../styles/Translate.css';
// Configuration object
const config = {
  apiUrl: process.env.REACT_APP_GOOGLE_TRANSLATE_URL,
};

const Translate = () => {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
      }
    };

    fetchUserId();
  }, []);

  // Function to fetch translation
  useEffect(() => {
    const fetchSupportedLanguages = async () => {
      const options = {
        method: 'GET',
        url: `${config.apiUrl}/support-languages`,
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        setLanguages(response.data); // Assumes the API returns a list of languages
        if (response.data.length > 0) {
          setSelectedLanguage(response.data[0].code); // Set default language
        }
      } catch (err) {
        setError('Failed to fetch supported languages');
      }
    };

    fetchSupportedLanguages();
  }, []);

  // Function to handle translation
  const fetchTranslation = async (word, language) => {
    const url = `${config.apiUrl}/text`;
    const options = {
      method: 'POST',
      url: url,
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
        'x-rapidapi-host': process.env.REACT_APP_RAPIDAPI_HOST,
        'Content-Type': 'application/json',
      },
      data: {
        from: 'auto',
        to: language,
        text: word,
      },
    };

    try {
      setLoading(true);
      const response = await axios.request(options);
      console.log('API Response:', response.data); // Add this line
      setTranslation(response.data.trans);
    } catch (err) {
      setError('Failed to fetch translation');
    } finally {
      setLoading(false);
    }
  };

  // Save translation to Supabase
  const saveTranslation = async () => {
    if (!userId) {
      setError('You must be logged in to save flashcards.');
      return;
    }

    try {
      const { error } = await supabase.from('flashcards').insert({
        word: word,
        translation: translation,
        user_id: userId,
      });

      if (error) {
        console.error('Error saving translation:', error.message);
        setError('Failed to save translation');
      } else {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000); // Show success message for 3 seconds
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to save translation');
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() && selectedLanguage) {
      fetchTranslation(word, selectedLanguage);
    } else {
      setError('Please enter a word and select a language');
    }
  };

  return (
    <div className="translate-container">
      <h2 className="translate-title">Translation</h2>
      <form onSubmit={handleSubmit} className="translate-form">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter word/phrase"
          className="translate-input"
        />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="translate-select">
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.language} ({lang.code})
            </option>
          ))}
        </select>
        <button type="submit" className="translate-button" disabled={loading}>
          {loading ? 'Translating...' : 'Translate'}
        </button>
      </form>
      <div className="translate-result-window">
        {loading && <p>Translating...</p>}
        {!loading && translation && (
          <div>
            <p>{translation}</p>
            <button onClick={saveTranslation} className="save-button">
              Save
            </button>
          </div>
        )}
        {!loading && !translation && (
          <p className="placeholder-text">Your translation will appear here</p>
        )}
      </div>
      {error && <p className="translate-error">{error}</p>}
      {saveSuccess && (
        <p className="save-success">Translation saved successfully!</p>
      )}
    </div>
  );
};

export default Translate;
