import RoutesLanding from "../modules/landing_page/LandingRoutes";
import RoutesHome from "../modules/home/homeRoutes";
import Layout from "../components/layout/Layout";
import RoutesGuru from "../modules/guru/GuruRoutes";
import RouteTU from "../modules/tu/TURoutes";

const ContainerRoutes = [
  { path: '/school', name: 'layout', component: Layout },
  ...RoutesLanding,
];

const MenuRoutes = [
  ...RoutesHome,
  ...RouteTU,
  ...RoutesGuru,
]

export default {
  ContainerRoutes,
  MenuRoutes
}