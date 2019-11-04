import React from 'react'
import { FaBars, FaClose } from 'react-icons/lib/fa'
const SidebarIcon = ({handleClick, isOpen}) => {
  return <span onClick={handleClick}>
    {isOpen ? <FaClose /> : <FaBars/>}
  </span>
}
export default SidebarIcon