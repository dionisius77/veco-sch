import Loadable from "react-loadable";
import Loading from "../../components/loading/Loading";

const LandingPage = Loadable({
    loader: () => import("./LandingPage"),
    loading: Loading
});

const RoutesLanding = [
    { path: "/login_page", name: "login_page", component: LandingPage }
];

export default RoutesLanding;