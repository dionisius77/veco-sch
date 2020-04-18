import React from 'react';
import ReactLoading from 'react-loading';
import { Grid, makeStyles } from '@material-ui/core';
import { Zoom } from 'react-reveal';

const useStyles = makeStyles(theme => ({
  grid: {
    minHeight: '100vh',
    zIndex: 99
  },
  block: {
    position: "absolute",
    top: 0,
    display: 'inline-block',
    width: '100%',
    height: '100%',
    margin: '0px',
    padding: '0px',
    backgroundColor: theme.palette.text.primary,
    zIndex: 97,
    opacity: 0.7
  }
}));
export default function Loading(props) {
  const classes = useStyles();
  return (
    <div className={classes.block}>
      <Zoom duration={1500}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          className={classes.grid}
        >

          <Grid item xs={3}>
            <ReactLoading type={"cylon"} color={props.color} />
          </Grid>

        </Grid>
      </Zoom>
    </div>
  );
}
