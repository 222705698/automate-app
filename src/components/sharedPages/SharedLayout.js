import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/image.png';

const SharedLayout = ({ children }) => {
    const [showBookingDropdown, setShowBookingDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  return (
      <div style={styles.layout}>
      {/* Header with Logo */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div  style={styles.logoContainer}>
            {/* Logo Image with Text */}
            <img 
              src={logo} 
              alt="AutoMate Logo" 
              style={styles.logoImage}
            />
           <h1 style={styles.logoText}>AutoMate</h1>
          </div>
                <nav style={styles.nav}>
            {/* Home Link */}
            <div style={styles.navItem}>
              <Link to="/Home" style={styles.navLink}>Home</Link>
            </div>
            
            {/* About Link */}
            <div style={styles.navItem}>
              <Link to="/about" style={styles.navLink}>About</Link>
            </div>
            
            {/* Booking Dropdown */}
            <div 
              style={styles.navItem}
              onMouseEnter={() => setShowBookingDropdown(true)}
              onMouseLeave={() => setShowBookingDropdown(false)}
            >
              <div style={styles.navLink}>Booking</div>
              {showBookingDropdown && (
                <div style={styles.dropdownMenu}>
                  <Link to="/booking/learners-test" style={styles.dropdownItem}>Learners Test</Link>
                  <Link to="/booking/drivers-test" style={styles.dropdownItem}>Drivers Test</Link>
                </div>
              )}
            </div>
            
            {/* Profile Dropdown */}
            <div 
              style={styles.navItem}
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <div style={styles.navLink}>Profile</div>
              {showProfileDropdown && (
                <div style={styles.dropdownMenu}>
                  <Link to="/profile" style={styles.dropdownItem}>My Information</Link>
                  <Link to="/profile/tickets" style={styles.dropdownItem}>Tickets</Link>
                  <Link to="/profile/payments" style={styles.dropdownItem}>Payments</Link>
                  <Link to="/" style={styles.dropdownItem}>Log out</Link>
                </div>
              )}
               
            </div>
          </nav>
          <div style={styles.headerActions}>
            <Link to="/" style={styles.primaryButton}>Login</Link>
          </div>
        </div>
        
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        {children}
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerHeading}>Product</h3>
            <Link to="/features" style={styles.footerLink}>Features</Link>
            <Link to="/pricing" style={styles.footerLink}>Pricing</Link>
            <Link to="/integrations" style={styles.footerLink}>Integrations</Link>
          </div>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerHeading}>Company</h3>
            <Link to="/about" style={styles.footerLink}>About Us</Link>
            <Link to="/careers" style={styles.footerLink}>Careers</Link>
            <Link to="/blog" style={styles.footerLink}>Blog</Link>
          </div>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerHeading}>Resources</h3>
            <Link to="/help" style={styles.footerLink}>Help Center</Link>
            <Link to="/tutorials" style={styles.footerLink}>Tutorials</Link>
            <Link to="/webinars" style={styles.footerLink}>Webinars</Link>
          </div>
          <div style={styles.footerColumn}>
            <h3 style={styles.footerHeading}>Connect</h3>
            <div style={styles.socialLinks}>
              <a href="#" style={styles.socialLink}>Twitter</a>
              <a href="#" style={styles.socialLink}>LinkedIn</a>
              <a href="#" style={styles.socialLink}>Facebook</a>
            </div>
          </div>
        </div>
        <div style={styles.footerBottom}>
          <p style={styles.copyright}>© {new Date().getFullYear()} AutoMate. All rights reserved.</p>
          <div style={styles.legalLinks}>
            <Link to="/privacy" style={styles.legalLink}>Privacy Policy</Link>
            <Link to="/terms" style={styles.legalLink}>Terms of Service</Link>
            <Link to="/cookies" style={styles.legalLink}>Cookie Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

const styles = {
   logoContainer: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '10px'
  },
  logoImage: {
    height: '40px',
    width: 'auto'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#150aeaff', // Changed from #a7a3efff to match your design
    margin: 0,
    whiteSpace: 'nowrap'
  },

  layout: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    backgroundColor: '#ffffffff',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  headerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  logo: {
    textDecoration: 'none',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#4f46e5',
    margin: 0,
  },
  nav: {
    display: 'flex',
    gap: '30px',
  },

  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  loginLink: {
    textDecoration: 'none',
    color: '#4b5563',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'color 0.3s',
    ':hover': {
      color: '#4f46e5',
    },
  },
  primaryButton: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#4338ca',
    },
  },
  main: {
    flex: 1,
    padding: '40px 20px',
  },
 nav: {
    display: 'flex',
    gap: '40px', // Adjust spacing between items
    alignItems: 'center'
  },
  navItem: {
    position: 'relative',
    padding: '10px 0'
  },
  navLink: {
    textDecoration: 'none',
    color: '#4b5563',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'color 0.2s ease',
   padding: '8px 12px',
    borderRadius: '6px',
    ':hover': {
      color: '#ffffff',
      backgroundColor: '#4f46e5', // Purple background on hover
      boxShadow: '0 2px 4px rgba(79, 70, 229, 0.3)'
    }
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#ffffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '6px',
    minWidth: '160px',
    zIndex: 1000,
    padding: '8px 0'
  },
  dropdownItem: {
    display: 'block',
    padding: '8px 16px',
    color: '#4b5563',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#f6f5f3ff',
      color: '#211b89ff',
      
    }
  },
  footer: {
    backgroundColor: '#f9fafb',
    padding: '60px 0 20px',
  },
  footerContent: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  footerColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  footerHeading: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    margin: '0 0 10px',
  },
  footerLink: {
    textDecoration: 'none',
    color: '#6b7280',
    fontSize: '14px',
    transition: 'color 0.3s',
    ':hover': {
      color: '#4f46e5',
    },
  },
  socialLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  socialLink: {
    textDecoration: 'none',
    color: '#6b7280',
    fontSize: '14px',
    transition: 'color 0.3s',
    ':hover': {
      color: '#4f46e5',
    },
  },
  footerBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '40px auto 0',
    padding: '20px 20px 0',
    borderTop: '1px solid #e5e7eb',
  },
  copyright: {
    color: '#9ca3af',
    fontSize: '14px',
    margin: 0,
  },
  legalLinks: {
    display: 'flex',
    gap: '20px',
  },
  legalLink: {
    textDecoration: 'none',
    color: '#6b7280',
    fontSize: '14px',
    transition: 'color 0.3s',
    ':hover': {
      color: '#4f46e5',
    },
  },
};

export default SharedLayout;