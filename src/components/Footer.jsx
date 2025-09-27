import React from 'react';
import './Footer.css';

export default function Footer(){
  return (
    <footer className="site-footer">
      <div className="container-custom">
        <div className="foot-inner">
          <div>© {new Date().getFullYear()} Bijendra Mishra. All rights reserved.</div>
          <div>Contact: <a href="mailto:bijendramishra2002@gmail.com">bijendramishra2002@gmail.com</a></div>
        </div>
      </div>
    </footer>
  );
}
