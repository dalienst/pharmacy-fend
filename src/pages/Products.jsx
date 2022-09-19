/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { urls } from '../constants/links';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from '../layouts/Sidebar';
import Modal from '../layouts/Modal';
import { RiDeleteBin5Fill, RiExternalLinkFill, RiRefreshFill } from "react-icons/ri";
import ProductsModalDisplay from '../layouts/ProductsModalDisplay';
import { Link } from 'react-router-dom';


export default function Products() {
    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);
    const [inOpen, setOpen] = useState(false);
    const [products, setProducts] = useState([]);

    const controller = new AbortController();
    const fetchProduct = async () => {
      try {
        const response = await axiosPrivate.get(urls.PRODUCTS);
        setProducts(response.data);
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
                  <th>Quantity</th>
                  <th>Expiry</th>
                  <th>Created By</th>
                  <th>Supplier</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.item_name}</td>
                    <td>{product.item_description}</td>
                    <td>{product.item_type}</td>
                    <td>{product.item_code}</td>
                    <td>{product.item_price}</td>
                    <td>{product.quantity_in}</td>
                    <td>{product.expiry}</td>
                    <td>{product.entered_by.username}</td>
                    <td>{product.distributor}</td>
                    <td>
                      <div className="product-icon">
                        <Link to ={`/products/${product.id}/detail`}>
                          <RiExternalLinkFill />
                        </Link>
                      </div>
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
