import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book'

export const LEFT_MENU = [
  {
    name: 'Home',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/home'; },
    icon: <HomeIcon/>,
  },
  {
    name: 'MataPelajaran',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/mata_pelajaran'; },
    icon: <BookIcon/>,
  },
];