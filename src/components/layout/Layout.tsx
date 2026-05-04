import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SearchIcon from '@mui/icons-material/Search';
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { signOut } from '../../store/slices/authSlice';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { colors, gradients } from '../../theme';
import { OrionTekLogo } from '../common/OrionTekLogo';

const SIDEBAR_WIDTH = 256;

interface Props {
  children: ReactNode;
}

interface NavItem {
  path: string;
  label: string;
  icon: ReactNode;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const sections: NavSection[] = [
  {
    title: 'General',
    items: [
      { path: '/', label: 'Dashboard', icon: <SpaceDashboardOutlinedIcon /> },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { path: '/clients', label: 'Clientes', icon: <PeopleAltOutlinedIcon /> },
    ],
  },
];

const initialsFromName = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '?';

export const Layout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarOpen = useAppSelector((s) => s.ui.sidebarOpen);
  const user = useAppSelector((s) => s.auth.user);

  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);

  const closeMenu = () => setMenuAnchor(null);

  const handleSignOut = () => {
    closeMenu();
    dispatch(signOut());
    navigate('/login', { replace: true });
  };

  const sidebarContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', minHeight: 72 }}>
        <OrionTekLogo size={36} />
      </Box>
      <Divider />

      <Box sx={{ flexGrow: 1, overflow: 'auto', py: 1 }}>
        {sections.map((section) => (
          <List
            key={section.title}
            subheader={
              <ListSubheader
                disableSticky
                sx={{
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                  bgcolor: 'transparent',
                  lineHeight: '32px',
                  px: 2.5,
                }}
              >
                {section.title}
              </ListSubheader>
            }
          >
            {section.items.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);

              return (
                <ListItemButton
                  key={link.path}
                  component={NavLink}
                  to={link.path}
                  sx={{
                    mx: 1.5,
                    my: 0.25,
                    borderRadius: 2,
                    color: 'text.secondary',
                    transition: 'all 0.15s',
                    ...(isActive && {
                      background: gradients.brand,
                      color: '#FFFFFF',
                      boxShadow: '0 4px 14px -4px rgba(59, 91, 255, 0.45)',
                      '& .MuiListItemIcon-root': { color: '#FFFFFF' },
                      '&:hover': { background: gradients.brandSoft },
                    }),
                    ...(!isActive && {
                      '&:hover': {
                        backgroundColor: alpha(colors.blue, 0.06),
                        color: colors.navy,
                      },
                    }),
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'inherit' }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ fontSize: '0.92rem', fontWeight: isActive ? 600 : 500 }}
                  />
                </ListItemButton>
              );
            })}
          </List>
        ))}
      </Box>

      {user && (
        <Box sx={{ p: 2, borderTop: `1px solid ${colors.border}` }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: gradients.brand,
                fontSize: '0.85rem',
                fontWeight: 700,
              }}
            >
              {initialsFromName(user.name)}
            </Avatar>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ display: 'block' }}>
                {user.email}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          ml: { md: `${SIDEBAR_WIDTH}px` },
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          <IconButton
            color="inherit"
            edge="start"
            onClick={() => dispatch(toggleSidebar())}
            sx={{ display: { md: 'none' } }}
            aria-label="abrir menú"
          >
            <MenuIcon />
          </IconButton>

          <TextField
            size="small"
            placeholder="Buscar en el panel..."
            sx={{
              ml: { xs: 0, md: 1 },
              flexGrow: { xs: 1, md: 0 },
              maxWidth: 360,
              '& .MuiOutlinedInput-root': {
                backgroundColor: colors.backgroundSecondary,
                '& fieldset': { borderColor: 'transparent' },
                '&:hover fieldset': { borderColor: colors.border },
                '&.Mui-focused fieldset': { borderColor: colors.blue },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />

          <Box sx={{ flexGrow: 1 }} />

          <Tooltip title="Notificaciones">
            <IconButton size="large" sx={{ color: 'text.secondary' }}>
              <Badge badgeContent={0} color="primary" showZero={false}>
                <NotificationsNoneOutlinedIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          {user && (
            <Tooltip title="Mi cuenta">
              <IconButton onClick={(e) => setMenuAnchor(e.currentTarget)} sx={{ p: 0.5 }}>
                <Avatar
                  sx={{
                    width: 36,
                    height: 36,
                    background: gradients.brand,
                    fontSize: '0.85rem',
                    fontWeight: 700,
                  }}
                >
                  {initialsFromName(user.name)}
                </Avatar>
              </IconButton>
            </Tooltip>
          )}

          <Menu
            anchorEl={menuAnchor}
            open={!!menuAnchor}
            onClose={closeMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: { mt: 1, minWidth: 220, border: `1px solid ${colors.border}`, boxShadow: '0 8px 24px rgba(15,30,71,0.08)' },
              },
            }}
          >
            {user && (
              <Box sx={{ px: 2, py: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user.email} · {user.role}
                </Typography>
              </Box>
            )}
            <Divider />
            <MenuItem onClick={closeMenu}>
              <ListItemIcon>
                <PersonOutlineIcon fontSize="small" />
              </ListItemIcon>
              Mi perfil
            </MenuItem>
            <MenuItem onClick={handleSignOut} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          width: SIDEBAR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
            backgroundColor: colors.surface,
            borderRight: `1px solid ${colors.border}`,
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Drawer
        variant="temporary"
        open={sidebarOpen}
        onClose={() => dispatch(toggleSidebar())}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: SIDEBAR_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          height: '100vh',
          overflowY: 'auto',
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }} className="fade-in">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
