import { FC, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconButton, Menu, MenuItem } from '@mui/material';
import {
  ChatBubble,
  ChatBubbleOutlineOutlined,
  Home,
  HomeOutlined,
  Menu as MenuIcon,
  Note,
  NoteOutlined,
} from '@mui/icons-material';
import clsx from 'clsx';

import styles from '../../styles/components/organisms/Header.module.scss';
import Logo from '../atoms/Logo';
import useMobileQuery from '../../hooks/useMobileQuery';
import If from '../atoms/If';
import SearchDropdown from './SearchDropdown';

const SECTIONS = [
  {
    icon: <HomeOutlined />,
    filledIcon: <Home />,
    label: 'Home',
    link: '/',
  },
  {
    icon: <ChatBubbleOutlineOutlined />,
    filledIcon: <ChatBubble />,
    label: 'Review',
    link: '/review',
  },
  {
    icon: <NoteOutlined />,
    filledIcon: <Note />,
    label: 'Planner',
    link: '/planner',
  },
];

const Header: FC = () => {
  const router = useRouter();
  const isMobile = useMobileQuery();
  const [anchorEl, setAnchorEl] = useState(null);
  const navSections = SECTIONS.map(section => {
    const active =
      router.pathname.startsWith(section.link) &&
      (section.link.length > 1 || section.link === router.pathname);
    return (
      <Link key={section.link} href={section.link}>
        <a
          className={clsx(
            styles.navLabelContainer,
            'column center',
            active && 'active'
          )}
        >
          {active ? section.filledIcon : section.icon}
          {section.label}
        </a>
      </Link>
    );
  });

  return (
    <header className={styles.headerBgContainer}>
      <div className={clsx(styles.headerContainer, 'row')}>
        <If visible={isMobile}>
          <IconButton
            aria-label="sort"
            size="small"
            onClick={e => setAnchorEl(e.currentTarget)}
            disableRipple
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="header-menu"
            className={styles.sortMenu}
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
          >
            {SECTIONS.map(section => (
              <MenuItem
                key={section.link}
                onClick={() => {
                  router.push(section.link);
                  setAnchorEl(null);
                }}
              >
                {section.label}
              </MenuItem>
            ))}
          </Menu>
        </If>
        <Link href="/">
          <a className={styles.headerLogo}>
            <Logo />
          </a>
        </Link>
        <nav className={clsx(styles.headerNav, 'row')}>
          <SearchDropdown style={styles.headerSearchDropdown} />
          {!isMobile && navSections}
        </nav>
      </div>
    </header>
  );
};

export default Header;
