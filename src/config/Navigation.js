import React from 'react';
import BookIcon from '@material-ui/icons/Book';
import ClassIcon from '@material-ui/icons/Apartment';
import StudentIcon from '@material-ui/icons/RecentActors';
import ScheduleIcon from '@material-ui/icons/Schedule';
import MateriIcon from '@material-ui/icons/LibraryBooks';
import AbsensiIcon from '@material-ui/icons/EventAvailable';
import NilaiIcon from '@material-ui/icons/Assignment';
import UjianIcon from '@material-ui/icons/EventNote';
import StaffIcon from '@material-ui/icons/SupervisorAccount';
import AlumniIcon from '@material-ui/icons/HowToReg';
import ScheduleGuruIcon from '@material-ui/icons/DateRange';

const LEFT_MENU_TU = [
  {
    name: 'Mata Pelajaran',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/mata_pelajaran'; },
    icon: <BookIcon style={{ color: '#fff' }} />,
  },
  {
    name: 'Data Staff',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/data_staff'; },
    icon: <StaffIcon style={{ color: '#fff' }} />,
  },
  {
    name: 'Siswa',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/list_siswa' },
    icon: <StudentIcon style={{ color: '#fff' }} />
  },
  {
    name: 'Alumni',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/list_alumni' },
    icon: <AlumniIcon style={{ color: '#fff' }} />
  },
];

const LEFT_MENU_WALI = [
  // {
  //   name: 'homeWali',
  //   translateId: '',
  //   onClick: () => { window.location.hash = '#/school/home_wali' },
  //   icon: <ClassIcon style={{ color: '#fff' }} />
  // },
];

const LEFT_MENU_BK = [
  {
    name: 'homeBK',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/home_bk' },
    icon: <ClassIcon style={{ color: '#fff' }} />
  },
];

const LEFT_MENU_GURU = [
  {
    name: 'Jadwal',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/jadwal' },
    icon: <ScheduleGuruIcon style={{ color: '#fff' }} />
  },
  {
    name: 'Bank Materi',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/bank_materi' },
    icon: <MateriIcon style={{ color: '#fff' }} />
  },
  {
    name: 'Absensi',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/landing_absensi' },
    icon: <AbsensiIcon style={{ color: '#fff' }} />
  },
  {
    name: 'Input Nilai',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/landing_nilai' },
    icon: <NilaiIcon style={{ color: '#fff' }} />
  },
  {
    name: 'Jadwal KBM',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/jadwal_ujian' },
    icon: <UjianIcon style={{ color: '#fff' }} />
  },
];

const LEFT_MENU_KURIKULUM = [
  {
    name: 'Kelas',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/kelas' },
    icon: <ClassIcon style={{ color: '#fff' }} />
  },
  {
    name: 'Setting Jadwal',
    translateId: '',
    onClick: () => { window.location.hash = '#/school/jadwal_landing' },
    icon: <ScheduleIcon style={{ color: '#fff' }} />
  },
]

export { LEFT_MENU_BK, LEFT_MENU_WALI, LEFT_MENU_GURU, LEFT_MENU_TU, LEFT_MENU_KURIKULUM };