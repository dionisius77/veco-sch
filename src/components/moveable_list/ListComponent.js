import React, { useEffect, useState, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 700,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    // overflow: 'auto',
    maxHeight: 500,
  },
  inline: {
    display: 'inline'
  }
}))

const getItemStyle = (isDragging, draggableStyle) => ({
  background: isDragging ? 'lightblue' : '',
  ...draggableStyle
})

export default function ListComponent(props) {
  const classes = useStyles();
  const [listData, setListData] = useState([]);

  useEffect(
    () => {
      setListData(props.listData);
    }, [props.listData]
  )

  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot) => (
        <Scrollbars className={classes.root} autoHide autoHideDuration={200} autoHideTimeout={1000}>
          <List
            ref={provided.innerRef}
          >
            {listData.map((sectionId, i) => (
              <Draggable
                key={sectionId.id}
                draggableId={sectionId.id}
                index={i}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                  >
                    <ListItem key={i} alignItems="center">
                      <ListItemText
                        primary={`${sectionId.title}`}
                        secondary={
                          <Fragment>
                            <Typography
                              component='span'
                              variant='body2'
                              className={classes.inline}
                              color="textPrimary"
                            >
                              {`${sectionId.id}`}
                            </Typography>
                            {` — ${sectionId.description}`}
                          </Fragment>
                        }
                      />
                    </ListItem>
                  </div>
                )}
              </Draggable>
            ))}
            {listData.length === 0 &&
              <ListItem alignItems="center">
                <ListItemText>
                  <p style={{ textAlign: 'center' }}>Data Not Found</p>
                </ListItemText>
              </ListItem>
            }
          </List>
        </Scrollbars>
      )}
    </Droppable>
  )
}