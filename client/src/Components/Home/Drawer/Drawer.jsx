import React from 'react'

const Drawer = () => {
  return (
    <div>
      <select defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Agriculture</option>
        <option>Coffee</option>
        <option>Corn</option>
        <option>Rice</option>
        <option>Soybeans</option>
        <option>Sugar</option>
      </select>
      <select defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Energy</option>
        <option>Gasoline</option>
        <option>Heating Fuel</option>
        <option>Natural Gas</option>
        <option>Petroleum</option>
      </select>
      <select defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Livestock</option>
        <option>Beef Cattle</option>
        <option>Chicken Cattle</option>
        <option>Pig Cattle</option>
      </select>
      <select defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Metals</option>
        <option>Copper</option>
        <option>Gold</option>
        <option>Platinum</option>
        <option>Silver</option>
      </select>
    </div>
  )
}

// Agriculture: Coffe, Corn, Rice, Soybeans, Sugar
// Energy: Gasoline, Heating Fuel, Natural Gas, Petroleum
// Livestock: Beef Cattle, Chicken Cattle, Pig Cattle
// Metals: Copper, Gold, Platinum, Silver 

export default Drawer
