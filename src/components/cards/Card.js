import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
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
    display: 'flex',
    marginTop: -20
  },
  spacing: {
    flexGrow: 1
  }
});

export default function CardsWithPeople(props) {
  const classes = useStyles();
  const [image, setImage] = useState('');
  const [nama, setNama] = useState('');

  useEffect(
    () => {
      setImage(props.image);
    }, [props.image]
  )

  useEffect(
    () => {
      setNama(props.nama)
    }, [props.nama]
  )

  const test = () => {
    props.changeButton();
  }

  const hapus = () => {
    props.onDeleteWali();
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          width="100%"
          image={image !== '' ? image : ImageDefault}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h4" noWrap>
            {nama || 'Pilih Wali Kelas'}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className={classes.buttonWrap}>
          <div className={classes.spacing}></div>
          {
            nama === ''
              ?
              <Button
                type="default"
                disabled={false}
                text="Pilih"
                onClick={test}
              />
              :
              <Button
                type="negative"
                disabled={false}
                text="Hapus"
                onClick={hapus}
              />
          }
        </div>
      </CardActions>
    </Card>
  );
}
