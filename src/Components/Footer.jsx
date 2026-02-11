import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-black py-8 mt-20 relative z-10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="flex flex-col gap-1">
            <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                System_Ver: 2.0.4 [Cyber_Brutalist]
            </p>
            <p className="text-[10px] text-gray-700 font-mono">
                © {new Date().getFullYear()} MUHAMMAD ASHIQE. ALL RIGHTS RESERVED.
            </p>
        </div>

        <div className="flex items-center gap-6">
            <div className="flex items-end gap-2 text-xs font-mono text-gray-500">
                <span>REACT_THREE_FIBER</span>
                <span className="w-1 h-3 bg-green-500 animate-pulse" />
            </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer