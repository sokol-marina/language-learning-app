import { supabase } from '../../supabase';

const Logout = () => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) alert(error.message);
    else alert('Logged out successfully!');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
