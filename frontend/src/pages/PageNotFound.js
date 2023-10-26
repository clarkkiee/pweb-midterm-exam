import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='notFound'>
        <h1>Page Not Found :/</h1><br></br>
        <h1>Go to the Homepage : <Link to={"/"}>Homepage</Link></h1>
    </div>
  )
}

export default PageNotFound