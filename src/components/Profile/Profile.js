import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../../supabase'; // Import Supabase for fetching profile data
import '../../styles/Profile.css';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ display_name: '', image_url: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      // Redirect to login page if no user is logged in
      navigate('/login');
    } else {
      // Fetch profile data for the logged-in user
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('display_name, image_url')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Failed to fetch profile:', error.message);
        } else {
          setProfile(data || { display_name: '', image_url: '' });
        }
        setLoading(false);
      };

      fetchProfile();
    }
  }, [user, navigate]);

  if (loading) {
    return <p className="profile-loading">Loading...</p>;
  }

  return (
    <div className="profile-container">
      {user && (
        <>
          <h2 className="profile-title">Welcome to Your Profile</h2>
          <div className="profile-image-container">
            {profile.image_url ? (
              <img
                src={profile.image_url}
                alt="Profile"
                className="profile-image"
              />
            ) : (
              <div className="profile-image-placeholder">No Image</div>
            )}
          </div>
          <p className="profile-info">
            <strong>Display Name:</strong>{' '}
            {profile.display_name || 'No display name set'}
          </p>
          <p className="profile-info">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="profile-info" hidden>
            <strong>User ID:</strong> {user.id}
          </p>
          <Link to="/update-profile" className="update-profile-link">
            Update Profile
          </Link>
        </>
      )}
    </div>
  );
};

export default Profile;
