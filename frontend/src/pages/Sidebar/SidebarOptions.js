import React from 'react'
import './SidebarOptions.css'

const SidebarOptions = ({active,text,Icon}) => {
  return (
    <div className={`sidebarOptions ${active && 'sideOptions_active'}`}>
        <Icon/>
        <h2>{text}</h2>
    </div>
  )
}

export default SidebarOptions