import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
const SidebarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <FaArrowLeft /> : <FaArrowRight/>}
  </span>
}
export default SidebarIcon