import ListSiswa from "./details/siswa/ListSiswa";
import Kelas from "./Kelas";
import LandingDetailKelas from "./details/LandingDetailKelas";
import InputMataPelajaran from "./details/siswa/ListMataPelajaran";

const RouteKelas = [
  { path: '/school/kelas', name: 'Kelas', component: Kelas },
  { path: '/school/detail_kelas/:idKelas/:kapasitas', name: 'DetailKelas', component: LandingDetailKelas },
  { path: '/school/list_siswa_kelas/:idKelas/:kapasitas', name: 'ListSiswa', component: ListSiswa },
  { path: '/school/input_mata_pelajaran/:idKelas', name: 'InputMataPelajaran', component: InputMataPelajaran }
];

export default RouteKelas;