import React from 'react'

const Footer = () => {
  return (
    <div className="footer bg-opacity-50 backdrop-blur-md bg-inherit text-white py-6 mt-10 rounded-lg">
  <div className="container mx-auto text-center px-4">
    <p className="text-lg text-gray-400 mb-2">
      &copy; {new Date().getFullYear()} Ashiqe. All rights reserved.
    </p>
    <p className="text-gray-500">
      Designed and Developed by <span className="font-semibold text-green-500">Ashiqe</span>
    </p>
  </div>
</div>

  
  )
}

export default Footer
