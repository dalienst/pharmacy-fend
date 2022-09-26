/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import ProductsModalDisplay from "../layouts/ProductsModalDisplay";
import {
  RiDeleteBin5Fill,
  RiExternalLinkFill,
  RiRefreshFill,
} from "react-icons/ri";
import Sidebar from "../layouts/Sidebar";

const ProductDetail = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inOpen, setOpen] = useState(false);
  const getProduct = async () => {
    try {
      const response = await axiosPrivate.get(`inventory/product/${id}/`);
      setProductData(() => {
        return response.data;
      });
    //   console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="main">
      <Sidebar />
      <div className="main-container">
        <div className="page-title">
          <h2>{productData?.item_name}</h2>
        </div>

        <div className="product-card">
          <div className="table-responsive">
            <table
              className="product-table"
              id="products-table"
              width="100%"
              cellSpacing="0"
            >
              <tr>
                <th>Name</th>
                <td>{productData?.item_name}</td>
              </tr>
              <tr>
                <th>Description</th>
                <td>{productData?.item_description}</td>
              </tr>
              <tr>
                <th>Type</th>
                <td>{productData?.item_type}</td>
              </tr>
              <tr>
                <th>Code</th>
                <td>{productData?.item_code}</td>
              </tr>
              <tr>
                <th>Price</th>
                <td>{productData?.item_price}</td>
              </tr>
              <tr>
                <th>Quantity</th>
                <td>{productData?.quantity_in}</td>
              </tr>
              <tr>
                <th>Expiry</th>
                <td>{productData?.expiry}</td>
              </tr>
              <tr>
                <th>Entry By</th>
                <td>{productData?.entered_by.username}</td>
              </tr>
              <tr>
                <th>Distributor</th>
                <td>{productData?.distributor}</td>
              </tr>
            </table>
          </div>
        </div>

        <button onClick={() => setOpen(true)}>
          <RiRefreshFill />
        </button>
        {inOpen && (
          <ProductsModalDisplay setOpen={setOpen} product={productData} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
