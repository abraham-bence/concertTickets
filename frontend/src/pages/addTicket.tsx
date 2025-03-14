import React from 'react'
import NavigationBar from '../components/navbar'
import AddTicketForm from '../components/addTicketForm'
import './style/addTicketForm.css'

function AddTicket() {
  return (
    <div className='addTicket body'>
        <NavigationBar/>
        <AddTicketForm/>
    </div>
  )
}

export default AddTicket