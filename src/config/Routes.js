import RoutesLanding from "../modules/landing_page/LandingRoutes";
import RoutesHome from "../modules/home/homeRoutes";
import RouteMataPelajaran from "../modules/mata_pelajaran/mataPelajaranRoutes";
import Layout from "../components/layout/Layout";
import RouteKelas from "../modules/kelas/kelasRoutes";
import RouteSiswa from "../modules/siswa/SiswaRoutes";
import RouteSchedule from "../modules/schedule/scheduleRoutes";
import RoutesGuru from "../modules/guru/GuruRoutes";
import RoutesAbsensi from "../modules/guru/absensi/AbsensiRoutes";

const ContainerRoutes = [
  { path: '/school', name: 'layout', component: Layout },
  ...RoutesLanding,
];

const MenuRoutes = [
  ...RoutesHome,
  ...RouteMataPelajaran,
  ...RouteKelas,
  ...RouteSiswa,
  ...RouteSchedule,
  ...RoutesGuru,
  ...RoutesAbsensi,
]

export default {
  ContainerRoutes,
  MenuRoutes
}