import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import ClassIcon from '@material-ui/icons/Apartment';
import StudentIcon from '@material-ui/icons/RecentActors';
import ScheduleIcon from '@material-ui/icons/Schedule';

export const LEFT_MENU = [
  {
    name: 'Home',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/home'; },
    icon: <HomeIcon />,
  },
  {
    name: 'MataPelajaran',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/mata_pelajaran'; },
    icon: <BookIcon />,
  },
  {
    name: 'Siswa',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/list_siswa' },
    icon: <StudentIcon />
  },
  {
    name: 'Kelas',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/kelas' },
    icon: <ClassIcon />
  },
  {
    name: 'Jadwal',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/jadwal_landing' },
    icon: <ScheduleIcon />
  }
];