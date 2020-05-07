import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { Fade } from 'react-reveal';
import DataTables from '../../../components/data_tables/DataTables';
import { HTTP_SERVICE } from '../../../services/HttpServices';
import Modals from '../../../components/modal/Modal';
import Alert from '@material-ui/lab/Alert';

class DataStaff extends Component {
  newDataTables;
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      dataTables: this.props.dataTables,
      lastVisible: '',
      hashMore: true,
      modalConfirm: false,
      confirmVal: [],
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
    this.newDataTables = this.state.dataTables;
  }

  componentDidMount() {
    this.props.onPushLoading(true);
    this.getData(this.state.limit, 0);
    this.setState({ pageLoaded: true })
  }

  getData = async (limit, page) => {
    if (page === 0) {
      this.newDataTables = [];
    }
    const request = {
      collection: 'datastaff',
      limit: limit,
      lastVisible: page !== 0 ? this.state.lastVisible : '',
      orderBy: "nama",
      direction: "asc"
    }
    await HTTP_SERVICE.getFb(request).then(res => {
      if (res.docs.length < limit) {
        this.setState({ hashMore: false });
      }
      res.forEach(doc => {
        this.newDataTables.push({
          uniqueId: doc.id,
          nama: doc.data().nama,
          pendidikan: this.getPendidikanString(doc.data().pendidikanTerakhir),
          kedudukan: doc.data().status,
          jabatan: doc.data().jabatan !== 'none' ? doc.data().jabatan : '-',
          tahunKerja: doc.data().masaKerja,
          waliKelas: doc.data().wali || '-'
        })
      });
      this.setState({ dataTables: this.newDataTables });
    }).catch(err => {
      // console.log(err)
    });
    this.props.onPushLoading(false);
  }

  getPendidikanString = (value) => {
    let data = this.props.pendidikan.filter(val => { return val.value === value });
    return data[0].text;
  }

  handleDownload = () => {

  }

  onChangePage = (page, limit) => {
    if (this.state.hashMore) {
      this.props.onPushLoading(true);
      this.getData(limit, page);
    }
  }

  onSearch = (value) => {

  }

  handleAdd = () => {
    this.setState({ pageLoaded: false }, () => {
      setTimeout(() => {
        window.location.hash = '#/school/input_staff/0';
      }, 500);
    })
  }

  handleEdit = (selected) => {

  }

  handleDelete = async () => {
    this.setState({ modalConfirm: false });
    this.props.onPushLoading(true);
    let checked = this.state.confirmVal;
    for (let i = 0; i < checked.length; i++) {
      await HTTP_SERVICE.deleteFB({
        collection: 'datastaff',
        doc: checked[i],
      }).then(res => {
        for (let j = 0; j < this.newDataTables.length; j++) {
          if (this.newDataTables[j].uniqueId === checked[i]) {
            this.newDataTables.splice(j, 1);
            break;
          }
        }
        if (i === checked.length - 1) {
          this.setState({ dataTables: this.newDataTables });
          this.props.setAlert({
            message: 'Data berhasil dihapus',
            open: true,
            type: 'success',
          });
        }
      }).catch(err => {
        if (i === checked.length - 1) {
          this.props.setAlert({
            message: 'Data gagal dihapus',
            open: true,
            type: 'error',
          });
        }
      })
    }
    this.props.onPushLoading(false);
  }

  goToDetail = (clicked) => {
    this.setState({ pageLoaded: false }, () => {
      setTimeout(() => {
        window.location.hash = `#/school/input_staff/${clicked}`;
      }, 500);
    })
  }

  confirmDelete = (checked) => {
    this.setState({
      modalConfirm: true,
      confirmVal: checked,
    });
  }

  handleCloseConfirmModal = () => {
    this.setState({ modalConfirm: false });
  }

  render() {
    const {
      dataTables,
      pageLoaded,
      modalConfirm,
      confirmVal,
    } = this.state;
    const {
      headCells
    } = this.props;
    const deleteVal = confirmVal.join(', ');
    return (
      <Fade right opposite when={pageLoaded} duration={500}>
        <DataTables
          tableName='Daftar Staff'
          allowEdit={true}
          page={0}
          headCells={headCells}
          data={dataTables}
          orderConfig={false}
          orderBy='name'
          handleDownload={() => { this.handleDownload() }}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
          handleAdd={() => { this.handleAdd() }}
          handleEdit={this.handleEdit}
          handleDelete={(checked) => this.confirmDelete(checked)}
          goToDetail={this.goToDetail}
        />
        <Modals
          open={modalConfirm}
          modalTitle={`Hapus Data`}
          type="confirm"
          onCloseModal={this.handleCloseConfirmModal}
          onSubmitModal={this.handleDelete}
        >
          <Alert variant="standard" severity="warning" color="error">Apakah anda yakin akan menghapus {deleteVal}?</Alert>
        </Modals>
      </Fade>
    )
  }
}

const mapStateToProps = state => {
  return {
    headCells: [
      { id: 'nama', numeric: false, disablePadding: true, label: 'Nama' },
      { id: 'pendidikan', numeric: false, disablePadding: true, label: 'Pendidikan' },
      { id: 'kedudukan', numeric: false, disablePadding: true, label: 'GT/GTT' },
      { id: 'jabatan', numeric: false, disablePadding: true, label: 'Tugas Tambahan' },
      { id: 'tahunKerja', numeric: false, disablePadding: true, label: 'Tahun Kerja' },
      { id: 'waliKelas', numeric: false, disablePadding: true, label: 'Wali Kelas' },
    ],
    dataTables: [
    ],
    pendidikan: state.layout.resMasterData.pendidikan,
  }
}

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataStaff);