import LandingAbsensi from "./LandingAbsensi";
import InputAbsensi from "./InputAbsensi";
import RekapAbsensi from "./RekapAbsensi";

const RoutesAbsensi = [
  { path: '/school/landing_absensi', name: 'LandingAbsensi', component: LandingAbsensi },
  { path: '/school/input_absensi', name: 'InputAbsensi', component: InputAbsensi },
  { path: '/school/rekap_absensi', name: 'RekapAbsensi', component: RekapAbsensi },
];

export default RoutesAbsensi;