import Loadable from "react-loadable";
import Loading from "../../components/loading/Loading";

const HomePage = Loadable({
    loader: () => import("./Home"),
    loading: Loading
});

const RoutesHome = [
    { path: "/school/home", name: "home", component: HomePage }
];

export default RoutesHome;