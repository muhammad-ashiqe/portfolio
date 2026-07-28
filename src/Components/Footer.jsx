import React from "react";

const Footer = () => {
  return (
    <footer className="relative z-10 mt-20 border-t theme-border theme-surface-strong py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 md:flex-row md:px-12">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-mono uppercase tracking-widest theme-text-muted">
            System_Ver: 2.0.4 [Cyber_Brutalist]
          </p>
          <p className="text-[10px] font-mono theme-text-faint">
            © {new Date().getFullYear()} MUHAMMAD ASHIQE. ALL RIGHTS RESERVED.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-end gap-2 text-xs font-mono theme-text-muted">
            <span>REACT_THREE_FIBER</span>
            <span
              className="h-3 w-1 animate-pulse"
              style={{ backgroundColor: "var(--color-success)" }}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
