// import Loadable from "react-loadable";
// import Loading from "../../components/loading/Loading";
import Home from './Home';
import Profile from './Profile';

const RoutesHome = [
    { path: "/school/home", name: "home", component: Home },
    { path: "/school/profile", name: "profile", component: Profile },
];

export default RoutesHome;