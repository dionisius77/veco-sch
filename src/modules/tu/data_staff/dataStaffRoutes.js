import DataStaff from "./DataStaff";
import InputStaff from "./InputStaff";

const RouteDataStaff = [
  { path: '/school/data_staff', name: 'DataStaff', component: DataStaff },
  { path: '/school/input_staff/:idStaff', name: 'InputStaff', component: InputStaff },
];

export default RouteDataStaff;