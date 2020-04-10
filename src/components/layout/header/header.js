// import React, { Component } from 'react';
// import { pushLogin } from '../ActionLayout';
// import { connect } from 'react-redux';

// class Header extends Component {
//   constructor(props){
//     super(props);
//     this.state = {

//     }
//     this.goToPage = this.goToPage.bind(this);
//   }

//   goToPage(page) {
//     if(page === 'logout'){
//       this.props.onLogin(false);
//       window.location.hash = '/landing_page'
//     } else {
//       window.location.hash = `/${page}`;
//     }
//   }

//   render() {
//     return(
//       <div>
//         <button onClick={() => this.goToPage('home')}>Home</button>
//         <button onClick={() => this.goToPage('mata_pelajaran')}>Matapelajaran</button>
//         <button onClick={() => this.goToPage('logout')}>Logout</button>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({

// });

// const mapDispatchToProps = dispatch => ({
//   onLogin: value => dispatch(pushLogin(value)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React, { useEffect, useState } from 'react';
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
import { LEFT_MENU } from '../../../config/Navigation';
import { Switch, Redirect, Route } from "react-router-dom";
import Routes from "../../../config/Routes";
import Loading from '../../loading/Loading';

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
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
  namebar: {
    flexGrow: 1,
    marginTop: '15px',
    maxWidth: '180px',
  },
  buttonbar: {
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(
    () => {
      setLoading(props.loadingFlag);
    }, [props.loadingFlag]
  )

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
          </Toolbar>
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
          <div p={1} className={classes.toolbar}>
            <Typography p={1} className={classes.namebar} flexgrow={1} variant="h6" noWrap={true}>
              Nama saya sdfkjsafd sadfasdf
            </Typography>
            <IconButton p={1} className={classes.buttonbar} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {LEFT_MENU.map((item, index) => (
              <ListItem button key={index} onClick={() => { item.onClick() }}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button key="notification">
              <ListItemIcon>
                <Badge badgeContent={18}>
                  <NotifIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary="Notifications" />
            </ListItem>
            <ListItem button key="logout">
              <ListItemIcon><ExitIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <Switch>
            {
              Routes.MenuRoutes.map((item, index) =>
                <Route key={index.toString()} path={item.path} name={item.name} component={item.component} />
              )
            }
            < Redirect exact from="**" to="/school/home" />
          </Switch>
        </main>
        {
          loading && loading !== undefined &&
          <Loading />
        }
      </div>
    </div>
  );
}
