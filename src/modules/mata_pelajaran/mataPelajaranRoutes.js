import Loadable from "react-loadable";
import Loading from "../../components/loading/Loading";

const mataPelajaranPage = Loadable({
    loader: () => import('./MataPelajaran'),
    loading: Loading
});

const RouteMataPelajaran = [
    { path: '/school/mata_pelajaran', name: 'MataPelajaran', component: mataPelajaranPage }
];

export default RouteMataPelajaran;