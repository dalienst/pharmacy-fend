/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "../layouts/Sidebar";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { privateLinks } from "../constants/links";

export default function Profile() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const [profile, setProfile] = useState({
    pharmacist: "pharmacy01",
    first_name: "Pharmacy",
    last_name: "Project",
    contact: "001",
    employee_number: "A01",
  });

  const controller = new AbortController();
  const { auth } = useAuth();
  const fetchProfile = async () => {
    try {
      const response = await axiosPrivate.get(`employee/${auth?.user_id}/`);
      setProfile(response.data);
    } catch (error) {
      toast.error("Cannot retrieve profile");
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
        <article className="profile-card">
          <h3 className="profile-title">Profile</h3>
          <hr></hr>
          <div className="profile-label">
            First Name:
            <span className="profile-input">{profile.first_name}</span>
          </div>

          <div className="profile-label">
            Last Name:
            <span className="profile-input">{profile.last_name}</span>
          </div>

          <div className="profile-label">
            Contact:
            <span className="profile-input">{profile.contact}</span>
          </div>

          <div className="profile-label">
            Employee Number:
            <span className="profile-input">{profile.employee_number}</span>
          </div>

          <Link className="profile-link" to={privateLinks.Update_profile}>
            Update your Profile
          </Link>
        </article>
      </div>
    </div>
  );
}
