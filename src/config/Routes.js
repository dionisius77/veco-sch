import RoutesLanding from "../modules/landing_page/LandingRoutes";
import RoutesHome from "../modules/home/homeRoutes";
import RouteMataPelajaran from "../modules/mata_pelajaran/mataPelajaranRoutes";
import Layout from "../components/layout/Layout";

const ContainerRoutes = [
  { path: '/school', name: 'layout', component: Layout },
  ...RoutesLanding,
];

const MenuRoutes = [
  ...RoutesHome,
  ...RouteMataPelajaran
]

export default {
  ContainerRoutes,
  MenuRoutes
}