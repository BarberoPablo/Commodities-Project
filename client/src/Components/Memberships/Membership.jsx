import React from 'react'

const Memberships = () => {
  return (
    <div>
      <div>
        <div id="membership">
          <h3>Membership Features</h3>
        </div>
        <p id="bagde">Membership Badge</p>
        <p id="catalog">Your complete product catalog with images in your profile</p>
        <p id="ranking">High search ranking (other companies find you easily)</p>
        <p id="seller">Directly contact any Seller on our website</p>
        <p id="buyer">Directly contact any Buyer on our website</p>
      </div>
      <div>
        <div id="membership">
          <h5>FREE Membership</h5>
          <p>Price</p>
          <h2>$0</h2>
          <p>(Free Forever)</p>
        </div>
        <p id="bagde">❌</p>
        <p id="catalog">❌</p>
        <p id="ranking">Lowest</p>
        <p id="seller">❌</p>
        <p id="buyer">❌</p>
        <button>Get Started</button>
      </div>
      <div>
        <div id="membership">
          <h5>BASIC Membership</h5>
          <p>Price</p>
          <h2>$300</h2>
          <p>(Total for 6 months)</p>
        </div>
        <p id="bagde">Basic Membership</p>
        <p id="catalog">❌</p>
        <p id="ranking">Medium</p>
        <p id="seller">Limit 10 per week</p>
        <p id="buyer">Limit 10 per week</p>
        <button>Get Started</button>
      </div>
      <div>
        <div id="membership">
          <h5>PREMIUM Membership</h5>
          <p>Price</p>
          <h2>$500</h2>
          <p>(Total for 6 months)</p>
        </div>
        <p id="bagde">Premium Membership🌐</p>
        <p id="catalog">✔</p>
        <p id="ranking">Highest</p>
        <p id="seller">Unlimited</p>
        <p id="buyer">Unlimited</p>
        <button>Get Started</button>
      </div>
    </div>
  )
}

export default Memberships
