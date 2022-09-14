/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from "../layouts/Sidebar";
import DistroModal from "../layouts/DistroModal";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Distros() {
    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);
    const [distros, setDistros] = useState([
      {
        company_name: "",
        license: "",
        location: "",
        contact: "",
      },
    ]);

    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const response = await axiosPrivate.get(urls.DISTROS);
        setDistros(response.data);
      } catch (error) {
        // toast.error('Cannot fetch distributors at this time')
      }
    };

    useEffect(() => {
      fetchProduct();
      return () => {
        controller.abort();
      };
    }, []);

  return (
    <div className="main">
      <Sidebar />
      <div className="main-container">
        <div className="page-title">
          <h2>Distributors</h2>
          <span>
            <button className="primaryBtn" onClick={() => setIsOpen(true)}>
              Add Distributor
            </button>
            {isOpen && <DistroModal setIsOpen={setIsOpen} />}
          </span>
        </div>

        <div className="product-card">
          <div className="table-responsive">
            <table
              className="product-table"
              id="products-table"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>License</th>
                  <th>Contact</th>
                  <th>Location</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {distros.map((distro) => (
                  <tr key={distro.id}>
                    <td>{distro.company_name}</td>
                    <td>{distro.license}</td>
                    <td>{distro.contact}</td>
                    <td>{distro.location}</td>
                    <td>
                      <button>
                        <RiDeleteBin5Fill />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
