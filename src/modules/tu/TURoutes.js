import RouteSiswa from "./siswa/SiswaRoutes";
import RouteMataPelajaran from "./mata_pelajaran/mataPelajaranRoutes";
import RouteDataStaff from "./data_staff/dataStaffRoutes";
import RouteAlumni from "./alumni/AlumniRoutes";

const RouteTU = [
  ...RouteSiswa,
  ...RouteMataPelajaran,
  ...RouteDataStaff,
  ...RouteAlumni
]
export default RouteTU;