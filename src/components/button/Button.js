// HOW TO USE
// <Button 
//   type="" (string {negative, default})
//   disabled={} (boolean)
//   text="" (string)
//   onClick={} (function ())
// />
import React from 'react';
import Btn from '@material-ui/core/Button';
import { useState, useEffect } from 'react';

export default function Button(props) {
  const [disable, setDisable] = useState(false);

  useEffect(
    () => {
      setDisable(props.disabled || false);
    }, [props.disabled]
  )

  const handleClick = (e) => {
    props.onClick(e);
  }

  const colorFn = (type) => {
    let btnColor;
    switch (type) {
      case 'negative':
        btnColor = 'default';
        break;
      default:
        btnColor = 'secondary';
        break;
    }
    return btnColor;
  }
  return (
    <Btn style={{width: 80, marginLeft: 5}} variant="contained" disabled={disable} color={colorFn(props.type)} onClick={handleClick}>
      {props.text}
    </Btn>
  )
}