import RouteSchedule from "./schedule/scheduleRoutes";
import RouteKelas from "./kelas/kelasRoutes";

const RoutesKurikulum = [
  ...RouteSchedule,
  ...RouteKelas,
]

export default RoutesKurikulum;