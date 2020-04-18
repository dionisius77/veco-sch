import ListSiswa from './ListSiswa';
import FormSiswa from './details/FormSiswa';

const RouteSiswa = [
  { path: '/school/form_siswa/:idSiswa', name: 'FormSiswa', component: FormSiswa },
  { path: '/school/list_siswa', name: 'ListAllSiswa', component: ListSiswa },
];

export default RouteSiswa;