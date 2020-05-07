import RoutesLanding from "../modules/landing_page/LandingRoutes";
import RoutesHome from "../modules/home/homeRoutes";
import Layout from "../components/layout/Layout";
import RoutesGuru from "../modules/guru/GuruRoutes";
import RouteTU from "../modules/tu/TURoutes";
import RoutesKurikulum from "../modules/kurikulum/KurikulumRoutes";

const ContainerRoutes = [
  { path: '/school', name: 'layout', component: Layout },
  ...RoutesLanding,
];

const MenuRoutesHome = [
  ...RoutesHome
]

const MenuRoutesTU = [
  ...RouteTU,
]

const MenuRoutesGuru = [
  ...RoutesGuru,
]

const MenuRoutesWali = [

]

const MenuRoutesKurikulum = [
  ...RoutesKurikulum
]

export default {
  ContainerRoutes,
  MenuRoutesHome,
  MenuRoutesTU,
  MenuRoutesGuru,
  MenuRoutesWali,
  MenuRoutesKurikulum,
}