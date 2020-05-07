import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTables from '../../../components/data_tables/DataTables';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import Modals from '../../../components/modal/Modal';
import { Fade } from 'react-reveal';
import { HTTP_SERVICE } from '../../../services/HttpServices';

class ListAlumni extends Component {
  newListData;
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      modalFlag: false,
      lastVisible: '',
      dataLength: 0,
      hashMore: true,
      limit: 5,
      listData: []
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
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
      params: 'pendaftaranKeluar.keluarKarena',
      operator: '==',
      value: 1,
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
          jenisKelamin: data.data().dataPribadi.jenisKelamin,
          tanggalLahir: data.data().dataPribadi.tglLahir,
          kelas: data.data().dataPribadi.kelas || '-'
        })
      });
      this.setState({ listData: this.newListData });
    }).catch(err => {
      // console.log(err)
    });
    this.props.setLoading(false);
  }

  onChangePage = (page, limit) => {
    if ((page + 1) * limit > this.state.dataLength && this.state.hashMore) {
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

  handleCloseModal = () => {
    this.setState({ modalFlag: false });
  }

  submitModal = () => {
    this.setState({ modalFlag: false })
  }

  render() {
    return (
      <Fade right opposite when={this.state.pageLoaded} duration={500}>
        <DataTables
          tableName='Data Alumni'
          allowEdit={false}
          page={0}
          dataLength={this.state.dataLength}
          headCells={this.props.headCells}
          data={this.state.listData}
          orderConfig={false}
          orderBy='name'
          handleDownload={this.handleDownload}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
          goToDetail={this.handleEdit}
        />
        <Modals
          open={this.state.modalFlag}
          modalTitle="Alert"
          type="alert"
          onCloseModal={this.handleCloseModal}
          onSubmitModal={this.submitModal}
        >
          Test 123456789012346789 123768123 123123
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
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListAlumni)