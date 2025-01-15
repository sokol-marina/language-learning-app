import React, { useState } from 'react';
import { supabase } from '../../supabase';
import '../../styles/UpdateProfile.css'; 

const UpdateProfile = () => {
  const [displayName, setDisplayName] = useState('');
  const [imageLink, setImageLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError('User not authenticated.');
      return;
    }

    const { error } = await supabase
      .from('profiles') // Ensure you have a `profiles` table
      .upsert({
        id: user.id, // Match the user's profile by their ID
        display_name: displayName,
        image_url: imageLink,
      });

    if (error) {
      console.error('Failed to update profile:', error.message);
      setError('Failed to update profile.');
    } else {
      setMessage('Profile updated successfully!');
      setDisplayName('');
      setImageLink('');
    }
  };

  return (
    <div className="update-profile-container">
      <h2>Update Profile</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleUpdateProfile} className="update-profile-form">
        <div className="form-group">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Enter display name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageLink">Image Link:</label>
          <input
            type="url"
            id="imageLink"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            placeholder="Enter image URL"
            required
          />
        </div>
        <button type="submit" className="update-profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
