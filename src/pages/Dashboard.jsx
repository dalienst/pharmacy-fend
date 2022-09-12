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
    pharmacist: 'pharmacy01',
    first_name: 'Pharmacy',
    last_name: 'Project',
    contact: '001',
    employee_number: 'A01'
  });

  const controller = new AbortController();
  const {auth} = useAuth();
  const fetchProfile = async () => {
    try {
      const response = await axiosPrivate.get(`employee/`);
      setProfile(response.data[0]);
    } catch (error) {
      toast.error('Cannot retrieve name');
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
      <div className="container">
        <div className="welcome-screen">
          <div className="row">
            <div className="column">
              <p className="welcome-msg">
                Welcome {profile.first_name}
                <br></br>
                This is your dashboard.<br></br>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard
