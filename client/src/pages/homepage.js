import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useCharacter } from "../utility/useCharacter";
import { useParams } from "react-router";
const Homepage = () => {
  const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
        const { id } = useParams();
        const { data, loading, error } = useCharacter(id);

  return (
    <div>
      Homepage
      {user ? (
        <p>Your email - {user.email}</p>
      ) : (
        <div>
          {'Please '}
          <Link to="/login">login</Link>
          {' or '}
          <Link to="/register">register</Link>
        </div>
                  
                  
          )}
          
          
    </div>
  );
};

export default Homepage;
