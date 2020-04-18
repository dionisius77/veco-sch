import LandingJadwal from './LandingJadwal';
import InputLibur from './InputLibur';
import ManualJadwal from './ManualJadwal';

const RouteSchedule = [
  { path: '/school/jadwal_landing', name: 'LandingJadwal', component: LandingJadwal },
  { path: '/school/hari_libur', name: 'MarkOfDay', component: InputLibur },
  { path: '/school/input_jadwal/:idKelas', name: 'ManualJadwal', component: ManualJadwal },
]

export default RouteSchedule;