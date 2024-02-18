import React from 'react'
import OrdenesItem from './OrdenesItem'

const OrdenesSection = () => {
  return (
    <div>
        <h4 className='text-3xl font-bold mt-2'>Ordenes</h4>
        <div>
            <OrdenesItem />
        </div>
    </div>
  )
}

export default OrdenesSection