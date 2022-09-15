/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Sidebar from '../layouts/Sidebar';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

function Dashboard () {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({
    email: '',
    username: ''
  });

  const controller = new AbortController();
  const {auth} = useAuth();
  const fetchProfile = async () => {
    try {
      const response = await axiosPrivate.get(`pharmacy/me/${auth?.user_id}/`);
      setProfile(response.data);
    } catch (error) {
      // toast.error('Cannot retrieve name');
    }
  };

  useEffect(() => {
    fetchProfile();
    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="main">
      <Sidebar />
      <div className="main-container">
        <nav className="page-nav">
          <div className="page-title">
            <h2>Dashboard</h2>
          </div>
        </nav>
        <h3>
          Hello {profile.username}
        </h3>
      </div>
    </div>
  );
}

export default Dashboard
