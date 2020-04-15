import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import DataTables from '../../../components/data_tables/DataTables';
import Modals from '../../../components/modal/Modal';
import InputField from '../../../components/input_field/InputField';
import DatePicker from '../../../components/date_picker/DatePicker';
import Selects from '../../../components/select/Select';
import { pushLoading } from '../../../components/layout/ActionLayout';

class ListKBM extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
    }
  }

  componentDidMount() {
    this.setState({ pageLoaded: true });
  }

  handleDownload = () => {

  }

  onChangePage = (oage, limit) => {

  }

  onSearch = (value) => {

  }

  handleAdd = () => {
    this.props.onPushLoading(true);
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = '#/school/jadwal_ujian';
      }, 300);
    });
  }
  
  handleEdit = (checked) => {
    this.props.onPushLoading(true);
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = '#/school/jadwal_ujian';
      }, 300);
    });
  }

  handleDelete = (checked) => {

  }

  goToDetail = (checked) => {

  }

  render() {
    const {
      dataTables,
      headCells,
    } = this.props;
    return (
      <Fade opposite when={this.state.pageLoaded} right duration={500}>
        <DataTables
          tableName="List Kegiatan"
          allowEdit={true}
          page={0}
          dataLength={dataTables.length}
          headCells={headCells}
          data={dataTables}
          orderConfig={false}
          orderBy='name'
          handleDownload={() => { this.handleDownload() }}
          handleChangePage={(page, limit) => { this.onChangePage(page, limit) }}
          handleSearch={(value) => { this.onSearch() }}
          handleAdd={() => { this.handleAdd() }}
          handleEdit={(checked) => { this.handleEdit(checked) }}
          handleDelete={(checked) => { this.handleDelete(checked) }}
          goToDetail={(checked) => { this.goToDetail(checked) }}
        />
      </Fade >
    )
  }
}

const mapStateToProps = state => ({
  dataTables: [
    { uniqueId: '001', kegiatan: 'Tugas', tanggal: '23 Maret 2020', kelas: 'IX-A', selesai: 'Sudah Input Nilai' },
    { uniqueId: '002', kegiatan: 'Ulangan Harian', tanggal: '30 Maret 2020', kelas: 'IX-B', selesai: 'Belum Input Nilai' },
    { uniqueId: '003', kegiatan: 'Tugas', tanggal: '1 April 2020', kelas: 'VII-A', selesai: 'Belum Input Nilai' },
    { uniqueId: '004', kegiatan: 'Tugas', tanggal: '4 April 2020', kelas: 'VIII-A', selesai: 'Sudah Input Nilai' },
  ],
  headCells: [
    { id: 'kegiatan', numeric: false, disablePadding: true, label: 'Kegiatan' },
    { id: 'kelas', numeric: true, disablePadding: false, label: 'Kelas' },
    { id: 'tanggal', numeric: true, disablePadding: false, label: 'Tanggal' },
    { id: 'selesai', numeric: true, disablePadding: false, label: 'Nilai' },
  ],
});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListKBM);