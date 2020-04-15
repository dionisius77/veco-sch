import React, { useEffect, useState } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import ListComponent from './ListComponent';
import { DragDropContext } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  header: {
    background: theme.palette.secondary.main,
    color: 'white'
  }
}))

export default function MoveableList(props) {
  const classes = useStyles();
  const [listA, setListA] = useState([]);
  const [listB, setListB] = useState([]);

  useEffect(
    () => {
      setListA(props.listA);
    }, [props.listA]
  )

  useEffect(
    () => {
      setListB(props.listB);
    }, [props.listB]
  )

  const onDrop = (result) => {
    const { source, destination } = result;
    if (destination !== null) {
      if (source.droppableId !== destination.droppableId) {
        props.takeAction(result.draggableId, destination.droppableId, source.index);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDrop}>
      <Grid container spacing={5}>
        <Grid item xs style={{ height: 500 }}>
          <Grid container>
            <Grid item xs={12} className={classes.header}>
              <h2 style={{ textAlign: 'center' }}>{props.titleA}</h2>
            </Grid>
          </Grid>
          <ListComponent
            listData={listA}
            droppableId='droppableA'
          />
        </Grid>
        <Grid item xs style={{ height: 500 }}>
          <Grid container>
            <Grid item xs={12} className={classes.header}>
              <h2 style={{ textAlign: 'center' }}>{props.titleB}</h2>
            </Grid>
          </Grid>
          <ListComponent
            listData={listB}
            droppableId='droppableB'
          />
        </Grid>
      </Grid>
    </DragDropContext>
  )
}

MoveableList.propTypes = {
  listA: PropTypes.array.isRequired,
  listB: PropTypes.array.isRequired,
  titleA: PropTypes.string.isRequired,
  titleB: PropTypes.string.isRequired,
  takeAction: PropTypes.func.isRequired,
}