import Jadwal from './jadwal/Jadwal';
import JadwalUjian from './jadwal_ujian/JadwalUjian';
import ListKBM from './nilai/ListKBM';
import RoutesAbsensi from './absensi/AbsensiRoutes';
import InputNilai from './nilai/InputNilai';
import RoutesBankMateri from './bank_materi/BankMateriRoutes';

const RoutesGuru = [
  { path: '/school/input_nilai', name: 'InputNilai', component: InputNilai },
  { path: '/school/jadwal', name: 'JadwalGuru', component: Jadwal },
  { path: '/school/jadwal_ujian', name: 'JadwalUjian', component: JadwalUjian },
  { path: '/school/landing_nilai', name: 'LandingNilai', component: ListKBM },
  ...RoutesAbsensi,
  ...RoutesBankMateri,
]

export default RoutesGuru;