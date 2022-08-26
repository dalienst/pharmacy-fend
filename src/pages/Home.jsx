import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container mx-auto bg-slate-300 rounded-xl shadow border p-8 m-10 justify-center text-center">
      <p className="text-3xl text-black font-bold mb-5">Pharmacy Project Zero</p>
      <br></br>
      <Link to="/login/" className="text-xl text-blue-700 italic underline font-bold mb-5 hover:text-slate-900">Login here</Link>
      <div></div>
      <Link to="/register/" className="text-xl text-blue-700 font-bold mb-5 hover:text-slate-900">Sign up here</Link>
    </div>
  )
}
