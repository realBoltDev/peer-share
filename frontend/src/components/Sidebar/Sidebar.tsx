import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navigationData } from '@/data/navigation';
import classes from './Sidebar.module.css';

export function Sidebar() {
  const location = useLocation();
  const [active, setActive] = useState('');

  useEffect(() => {
    const current = navigationData.find(item => item.link === location.pathname);
    if (current) {
      setActive(current.label);
    }
  }, [location.pathname]);

  const links = navigationData.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        {links}
      </div>
    </nav>
  );
}
