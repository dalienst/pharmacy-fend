import React from 'react'
import { Link } from 'react-router-dom';
import Banner from '../layouts/Banner';
import Hero from '../layouts/Hero';

export default function Home() {
  return (
      <Hero>
        <Banner title="Medicine Center">
          <Link to="/login" className="btn-primary">Start Shopping</Link>
        </Banner>
      </Hero>
  )
}
