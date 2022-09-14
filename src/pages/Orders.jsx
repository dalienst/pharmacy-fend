/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { urls } from "../constants/links";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Sidebar from "../layouts/Sidebar";
import { RiLockUnlockFill } from "react-icons/ri";
import OrderModal from "../layouts/OrderModal";

export default function Orders() {

    const axiosPrivate = useAxiosPrivate();
    const [isOpen, setIsOpen] = useState(false);
    const [orders, setOrders] = useState([
      {
        product:"",
        customer_name:"",
        product_quantity: "",
        product_price:"",
        total_amount:"",
        served_by:""
      },
    ]);

    const controller = new AbortController();
    const fetchOrder = async () => {
      try {
        const response = await axiosPrivate.get(urls.ORDERS);
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        // toast.error('Cannot fetch distributors at this time')
      }
    };

    useEffect(() => {
      fetchOrder();
      return () => {
        controller.abort();
      };
    }, []);

  return (
    <div className="main">
      <Sidebar />
      <div className="main-container">
        <div className="page-title">
          <h2>Orders</h2>
          <span>
            <button className="primaryBtn" onClick={() => setIsOpen(true)}>
              Create Order
            </button>
            {isOpen && <OrderModal setIsOpen={setIsOpen} />}
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
                  <th colSpan="4">Customer</th>
                  <th>Status</th>
                  <th>Served by</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer_name}</td>
                    <td>{order.product}</td>
                    <td>{order.product_quantity}</td>
                    <td>{order.total_amount}/-</td>
                    <td>
                      <button>
                        <RiLockUnlockFill />
                      </button>
                    </td>
                    <td>{order.served_by.username}</td>
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
