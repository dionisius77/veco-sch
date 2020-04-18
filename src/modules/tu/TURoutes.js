import RouteSiswa from "./siswa/SiswaRoutes";
import RouteSchedule from "./schedule/scheduleRoutes";
import RouteMataPelajaran from "./mata_pelajaran/mataPelajaranRoutes";
import RouteKelas from "./kelas/kelasRoutes";

const RouteTU = [
  ...RouteSiswa,
  ...RouteSchedule,
  ...RouteMataPelajaran,
  ...RouteKelas
]
export default RouteTU;