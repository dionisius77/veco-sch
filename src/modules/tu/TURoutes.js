import RouteSiswa from "./siswa/SiswaRoutes";
import RouteSchedule from "./schedule/scheduleRoutes";
import RouteMataPelajaran from "./mata_pelajaran/mataPelajaranRoutes";
import RouteKelas from "./kelas/kelasRoutes";
import RouteDataStaff from "./data_staff/dataStaffRoutes";

const RouteTU = [
  ...RouteSiswa,
  ...RouteSchedule,
  ...RouteMataPelajaran,
  ...RouteKelas,
  ...RouteDataStaff,
]
export default RouteTU;