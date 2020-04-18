import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ImageDefault from '../../shared/people.png';
import Button from '../button/Button';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    maxHeight: 300,
  },
  buttonWrap: {
    display: 'flex'
  },
  spacing: {
    flexGrow: 1
  }
});

export default function CardsWithPeople(props) {
  const classes = useStyles();

  const test = () => {
    props.changeButton();
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          width="100%"
          image={ImageDefault}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4" noWrap>
            Prof dadadaddadadadad
          </Typography>
          <div className={classes.buttonWrap}>
            <div className={classes.spacing}></div>
            <Button
              type="default"
              disabled={false}
              text="Change"
              onClick={test}
            />
          </div>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
      </CardActions> */}
    </Card>
  );
}
