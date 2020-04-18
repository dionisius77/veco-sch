import React from 'react';
import Btn from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

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
        btnColor = 'primary';
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

Button.propTypes = {
  type: PropTypes.oneOf(['negative', 'default']),
  disabled: PropTypes.bool,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}