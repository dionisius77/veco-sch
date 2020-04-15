import Jadwal from './jadwal/Jadwal';
import JadwalUjian from './jadwal_ujian/JadwalUjian';
import ListKBM from './nilai/ListKBM';

const RoutesGuru = [
  { path: '/school/jadwal', name: 'JadwalGuru', component: Jadwal },
  { path: '/school/jadwal_ujian', name: 'JadwalUjian', component: JadwalUjian },
  { path: '/school/landing_nilai', name: 'LandingNilai', component: ListKBM },
]

export default RoutesGuru;