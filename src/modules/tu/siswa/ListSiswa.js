import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTables from '../../../components/data_tables/DataTables';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import Modals from '../../../components/modal/Modal';
import { Fade } from 'react-reveal';
import { HTTP_SERVICE } from '../../../services/HttpServices';
import Alert from '@material-ui/lab/Alert';

class ListSiswa extends Component {
  newListData;
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      modalFlag: false,
      lastVisible: '',
      hashMore: true,
      limit: 5,
      listData: [],
      modalConfirm: false,
      confirmValue: [],
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.newListData = this.state.listData;
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getData(this.state.limit, 0);
    this.setState({ pageLoaded: true });
  }

  getData = async (limit, page) => {
    if (page === 0) {
      this.newListData = [];
    }
    const request = {
      collection: 'datasiswa',
      limit: limit,
      lastVisible: page !== 0 ? this.state.lastVisible : '',
      orderBy: "dataPribadi.nama",
      directions: "asc",
      params: 'lulus',
      operator: '==',
      value: false,
    }
    await HTTP_SERVICE.getFBFilter(request).then(res => {
      if (res.docs.length < limit) {
        this.setState({ hashMore: false });
      }
      res.forEach(data => {
        this.newListData.push({
          uniqueId: data.id,
          nisn: data.data().dataPribadi.nisn,
          nama: data.data().dataPribadi.nama,
          jenisKelamin: this.getJenisKelaminText(data.data().dataPribadi.jenisKelamin),
          tanggalLahir: data.data().dataPribadi.tglLahir,
          kelas: data.data().dataPribadi.kelas || '-'
        })
      });
      this.setState({ listData: this.newListData });
    }).catch(err => {
      this.props.setAlert({
        open: true,
        message: err.message,
        type: 'error',
      });
    });
    this.props.setLoading(false);
  }

  getJenisKelaminText = (val) => {
    let selected = this.props.jenisKelamin.filter(e => {
      return e.value === val;
    });
    return selected[0].text;
  }

  onChangePage = (page, limit) => {
    if (this.state.hashMore) {
      this.props.setLoading(true);
      this.getData(limit, page);
    }
  }

  onSearch = (value) => {
    // console.log(value);
  }

  handleAdd = () => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = '#/school/form_siswa/0';
      }, 500)
    })
  }

  handleDownload = () => {
    // console.log("download data excel");
  }

  handleEdit = (checked) => {
    window.location.hash = `#/school/form_siswa/${checked}`
  }

  handleDelete = async () => {
    this.setState({ modalConfirm: false });
    this.props.setLoading(true);
    let checked = this.state.confirmValue;
    for (let i = 0; i < checked.length; i++) {
      await HTTP_SERVICE.deleteFB({
        collection: 'datasiswa',
        doc: checked[i],
      }).then(res => {
        if (i === checked.length - 1) {
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
    this.getData(this.state.limit, 0);
  }

  confirmDelete = (checked) => {
    this.setState({
      modalConfirm: true,
      confirmValue: checked,
    });
  }

  handleCloseConfirmModal = () => {
    this.setState({ modalConfirm: false });
  }

  render() {
    const { modalConfirm, confirmValue } = this.state;
    const deleteVal = confirmValue.length > 0 ? confirmValue.join(', ') : '';
    return (
      <Fade right opposite when={this.state.pageLoaded} duration={500}>
        <DataTables
          tableName='Data Siswa'
          allowEdit={true}
          page={0}
          headCells={this.props.headCells}
          data={this.state.listData}
          orderConfig={false}
          orderBy='name'
          handleDownload={this.handleDownload}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
          handleAdd={this.handleAdd}
          goToDetail={this.handleEdit}
          handleDelete={(checked) => this.confirmDelete(checked)}
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
    );
  }
}

const mapStateToProps = state => ({
  dataTables: [],
  headCells: [
    { id: 'nisn', numeric: false, disablePadding: true, label: 'NISN' },
    { id: 'nama', numeric: false, disablePadding: true, label: 'Nama' },
    { id: 'jenisKelamin', numeric: true, disablePadding: false, label: 'Jenis Kelamin' },
    { id: 'tanggalLahir', numeric: true, disablePadding: false, label: 'Tgl Lahir' },
    { id: 'kelas', numeric: true, disablePadding: false, label: 'Kelas' },
  ],
  jenisKelamin: state.layout.resMasterData.jenisKelamin,
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSiswa)