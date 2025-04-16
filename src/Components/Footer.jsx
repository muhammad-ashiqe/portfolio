import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900/30 border-t border-gray-800/20 py-3 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Ashiqe • Built with <span className="text-blue-400">React</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer