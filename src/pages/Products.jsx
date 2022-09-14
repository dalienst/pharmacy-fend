/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { urls } from '../constants/links';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from '../layouts/Sidebar';
import Modal from '../layouts/Modal';


export default function Products() {
    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);
    const [products, setProducts] = useState({
      item_name:"",
      item_description: "",
      item_type: "",
      item_code: "",
      item_price: "",
      expiry: "",
      created_at: "",
      entered_by:"",
      distributor:"",
    })

    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const response = await axiosPrivate.get(urls.PRODUCTS);
        setProducts(response.data);
        console.log(response.data);
      } catch(error) {
        // toast.error('Cannot fetch products at this time')
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
          <h2>Products</h2>
          <span>
            <button className="primaryBtn" onClick={() => setIsOpen(true)}>
              Add Product
            </button>
            {isOpen && <Modal setIsOpen={setIsOpen} />}
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
                  <th>Description</th>
                  <th>Type</th>
                  <th>Code</th>
                  <th>Price</th>
                  <th>Expiry</th>
                  <th>Created At</th>
                  <th>Created By</th>
                  <th>Supplier</th>
                  <th>Actions</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
