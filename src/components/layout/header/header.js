import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExitIcon from '@material-ui/icons/PowerSettingsNew';
import NotifIcon from '@material-ui/icons/Notifications';
import { LEFT_MENU_TU, LEFT_MENU_GURU, LEFT_MENU_KURIKULUM, LEFT_MENU_WALI } from '../../../config/Navigation';
import { Switch, Redirect, Route } from "react-router-dom";
import Routes from "../../../config/Routes";
import HomeIcon from '@material-ui/icons/Home';
import { HTTP_SERVICE } from '../../../services/HttpServices';
import Scrollbars from 'react-custom-scrollbars';
import Alert from '@material-ui/lab/Alert';
import imagePeople from '../../../shared/people_default.png';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  alertVerif: {
    zIndex: theme.zIndex.drawer + 2,
    width: '100%',
    position: 'relative',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    color: theme.palette.text.primary,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    border: 0,
  },
  drawerOpen: {
    border: 0,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    border: 0,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8),
    },
  },
  toolbar: {
    display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  namebarClose: {
    flexGrow: 1,
    marginTop: '15px',
    maxWidth: '150px',
  },
  namebarOpen: {
    flexGrow: 1,
    marginTop: '15px',
    maxWidth: '150px',
    height: '150px',
  },
  imageProfile: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '10px',
    height: '100px',
    borderRadius: '50%'
  },
  buttonbar: {
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  scroller: {
    width: '100%',
    maxWidth: drawerWidth,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    // overflow: 'auto',
    // maxHeight: 500,
  },
  menuSelected: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.background.paper,
    border: 0,
    borderRadius: '30px 0 0 10px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: '#fff',
    }
  },
  menuDefault: {

  }
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Home')
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    author: '',
    bidangStudi: [],
    jabatan: [],
    wali: '',
    emailVerified: true,
  });

  useEffect(
    () => {
      if (props.userProfile) {
        setUserProfile(props.userProfile);
      } else {
        setUserProfile({
          name: '',
          email: '',
          author: '',
          bidangStudi: [],
          jabatan: '',
          wali: '',
          emailVerified: true
        })
      }
    }, [props.userProfile]
  )

  const menuRoutesByRole = (roles, wali, bidangStudi) => {
    let finalRoutes = [];
    finalRoutes = [...finalRoutes, ...Routes.MenuRoutesHome];
    if (roles.length > 0) {
      roles.forEach(e => {
        if (e === 'kepsek') {
          finalRoutes = [...finalRoutes, ...Routes.MenuRoutesTU, ...Routes.MenuRoutesKurikulum]
        } else if (e === 'kurikulum') {
          finalRoutes = [...finalRoutes, ...Routes.MenuRoutesKurikulum]
        } else if (e === 'KTU' || e === 'STU') {
          finalRoutes = [...finalRoutes, ...Routes.MenuRoutesTU]
        }
      });
    }

    if (wali !== '') {
      finalRoutes = [...finalRoutes, ...Routes.MenuRoutesWali]
    }

    if (bidangStudi.length > 0) {
      finalRoutes = [...finalRoutes, ...Routes.MenuRoutesGuru]
    }

    return finalRoutes;
    // switch (roles) {
    //   case 'TU':
    //     return [...Routes.MenuRoutesHome, ...Routes.MenuRoutesTU];
    //   case 'GURU':
    //     return [...Routes.MenuRoutesHome, ...Routes.MenuRoutesGuru];
    //   case 'WALI':
    //     return [...Routes.MenuRoutesHome, ...Routes.MenuRoutesWali, ...Routes.MenuRoutesGuru];
    //   default:
    //     return [...Routes.MenuRoutesHome];
    // }
  }

  const leftMenuByRoutes = (role, wali, bidangStudi) => {
    let finalNavigation = [];
    if (role.length > 0) {
      role.forEach(e => {
        if (e === 'kepsek') {
          finalNavigation = [...finalNavigation, ...LEFT_MENU_TU, ...LEFT_MENU_KURIKULUM]
        } else if (e === 'kurikulum') {
          finalNavigation = [...finalNavigation, ...LEFT_MENU_KURIKULUM]
        } else if (e === 'KTU' || e === 'STU') {
          finalNavigation = [...finalNavigation, ...LEFT_MENU_TU]
        }
      });
    }

    if (wali !== '') {
      finalNavigation = [...finalNavigation, ...LEFT_MENU_WALI]
    }

    if (bidangStudi.length > 0) {
      finalNavigation = [...finalNavigation, ...LEFT_MENU_GURU]
    }

    return finalNavigation;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    HTTP_SERVICE.logOut().then(res => {
      // console.log(res);
      props.onLogout();
    }).catch(err => { console.log(err) })
  }

  const notif = () => {
    props.onNotif();
  }

  const goToProfile = () => {
    window.location.hash = '#/school/profile'
  }

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          color="secondary"
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" noWrap>
              VeCo Sch
            </Typography>
            <Typography style={{ marginBottom: -5, marginLeft: 10 }} variant="body1" noWrap={true}>
              {`| ${selected}`}
            </Typography>
          </Toolbar>
          {!userProfile.emailVerified &&
            <div className={classes.alertVerif}>
              <Alert variant="filled" severity="error">
                Mohon lakukan verifikasi, periksa kotak masuk email Anda.
              </Alert>
            </div>
          }
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <Scrollbars
            className={classes.scroller}
            autoHide
            autoHideDuration={200}
            autoHideTimeout={1000}
            renderThumbVertical={({ style, ...props }) =>
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: '#f8bbd0',
                  width: 4,
                  opacity: 0.5,
                }}
              />
            }
            renderTrackVertical={({ style, ...props }) =>
              <div
                {...props}
                style={{
                  position: 'absolute',
                  width: '6px',
                  transition: 'opacity 200ms ease 0s',
                  opacity: 0,
                  left: '2px',
                  bottom: '2px',
                  top: '2px',
                  borderRadius: '3px',
                }}
              />
            }
          >
            <div>
              <div p={1} className={classes.toolbar}>
                <div
                  className={clsx({
                    [classes.namebarOpen]: open,
                    [classes.namebarClose]: !open,
                  })}
                  onClick={goToProfile}
                >
                  <div>
                    {open &&
                      <img alt='profile pict' className={classes.imageProfile} src={userProfile.photoUrl !== null ? userProfile.photoUrl : imagePeople} />
                    }
                  </div>
                  <Typography style={{ maxWidth: 150 }} display="block" align="center" p={1} flexgrow={1} variant="body1" noWrap={true}>
                    {userProfile.displayName || (userProfile.email || '')}
                  </Typography>
                </div>
                <IconButton p={1} className={classes.buttonbar} onClick={handleDrawerClose}>
                  {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </div>
              <Divider />
              <List>
                <ListItem className={clsx({
                  [classes.menuSelected]: selected === 'Home',
                  [classes.menuDefault]: !(selected === 'Home'),
                })} button key='home' onClick={() => { window.location.hash = '#/school/home'; setSelected('Home') }}>
                  <ListItemIcon><HomeIcon style={{ color: '#fff' }} /></ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                {
                  leftMenuByRoutes(userProfile.jabatan, userProfile.wali, userProfile.bidangStudi)
                    .map((item, index) => (
                      <ListItem className={clsx({
                        [classes.menuSelected]: selected === item.name,
                        [classes.menuDefault]: !(selected === item.name),
                      })} button key={index} onClick={() => { item.onClick(); setSelected(item.name) }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))
                }
              </List>
              <Divider />
              <List>
                <ListItem button key="notification" onClick={() => { notif() }}>
                  <ListItemIcon>
                    <Badge badgeContent={18} color='secondary'>
                      <NotifIcon style={{ color: '#fff' }} />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button key="logout" onClick={() => { logOut() }}>
                  <ListItemIcon><ExitIcon style={{ color: '#fff' }} /></ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </List>
            </div>
          </Scrollbars>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            {
              menuRoutesByRole(userProfile.jabatan, userProfile.wali, userProfile.bidangStudi).map((item, index) =>
                <Route key={index.toString()} path={item.path} name={item.name} component={item.component} />
              )
            }
            < Redirect exact from="**" to="/school/home" />
          </Switch>
        </main>
      </div>
    </div >
  );
}
