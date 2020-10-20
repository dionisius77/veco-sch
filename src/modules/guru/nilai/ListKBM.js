import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import DataTables from '../../../components/data_tables/DataTables';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { HTTP_SERVICE } from '../../../services/HttpServices';
import { pushNilai } from './ActionNilai';

class ListKBM extends Component {
  newDataTables;
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      dataTables: [],
    }
    this.newDataTables = this.state.dataTables;
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getFinishedEvent();
  }

  async getFinishedEvent() {
    const current = new Date().toLocaleDateString();
    const splittedCurrent = current.split('/');
    const formatedDate = `${splittedCurrent[2]}-${splittedCurrent[0].length === 1 ? '0' + splittedCurrent[0] : splittedCurrent[0]}-${splittedCurrent[1].length === 1 ? '0' + splittedCurrent[1] : splittedCurrent[1]}`
    const req = {
      collection: 'jadwalkbm',
      params: 'end', operator: '<=', value: formatedDate,
      params2: 'authorId', operator2: '==', value2: this.props.userProfile.author,
      orderBy: 'end',
      directions: 'asc',
      lastVisible: '',
      limit: 500,
    }
    await HTTP_SERVICE.getFBTwoFilter(req)
      .then(async res => {
        if (!res.empty) {
          res.forEach(doc => {
            let splittedKelas = doc.data().kelas.split('_');
            this.newDataTables.push({
              uniqueId: doc.id,
              kegiatan: doc.data().jenis,
              mataPelajaran: splittedKelas[0],
              tanggal: doc.data().end,
              kelas: splittedKelas[1],
              title: doc.data().title,
              selesai: doc.data().hasNilai ? 'Sudah Input Nilai' : 'Belum Input Nilai',
            });
          });
          this.setState({ dataTables: this.newDataTables, pageLoaded: true });
          this.props.setLoading(false);
        } else {
          this.setState({ pageLoaded: true });
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Belum ada kegiatan yang sudah dilaksanakan',
            type: 'warning',
          });
        }
      })
      .catch(err => {

      });
  }

  handleDownload = () => {

  }

  onChangePage = (oage, limit) => {

  }

  onSearch = (value) => {

  }

  handleAdd = () => {
    this.props.setLoading(true);
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = '#/school/jadwal_ujian';
      }, 300);
    });
  }

  handleEdit = (checked) => {
    this.props.setLoading(true);
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
    const dataClicked = this.state.dataTables.filter((value) => value.uniqueId === checked);
    this.props.setDetail(dataClicked[0]);
    window.location.hash = '/school/input_nilai';
  }

  render() {
    const {
      headCells,
    } = this.props;
    const {
      dataTables,
    } = this.state;
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
  userProfile: state.layout.resAuth,
  headCells: [
    { id: 'kegiatan', numeric: false, disablePadding: true, label: 'Kegiatan' },
    { id: 'kelas', numeric: true, disablePadding: false, label: 'Kelas' },
    { id: 'title', numeric: true, disablePadding: false, label: 'Nama Kegiatan' },
    { id: 'mataPelajaran', numeric: true, disablePadding: false, label: 'Mata Pelajaran' },
    { id: 'tanggal', numeric: true, disablePadding: false, label: 'Tanggal' },
    { id: 'selesai', numeric: true, disablePadding: false, label: 'Nilai' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
  setDetail: value => dispatch(pushNilai(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListKBM);