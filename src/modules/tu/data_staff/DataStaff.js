import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading } from '../../../components/layout/ActionLayout';
import { Fade } from 'react-reveal';
import DataTables from '../../../components/data_tables/DataTables';

class DataStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      dataTables: this.props.dataTables,
      pageLoaded: false,
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
  }

  componentDidMount() {
    this.setState({ pageLoaded: true })
  }

  handleDownload = () => {

  }

  onChangePage = (page, limit) => {

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

  handleDelete = (selected) => {

  }

  goToDetail = (clicked) => {
    this.setState({ pageLoaded: false }, () => {
      setTimeout(() => {
        window.location.hash = `#/school/input_staff/${clicked}`;
      }, 500);
    })
  }

  render() {
    const {
      page,
      dataTables,
      pageLoaded
    } = this.state;
    const {
      headCells
    } = this.props;
    return (
      <Fade right opposite when={pageLoaded} duration={500}>
        <DataTables
          tableName='Daftar Staff'
          allowEdit={true}
          page={page}
          dataLength={dataTables.length}
          headCells={headCells}
          data={dataTables}
          orderConfig={false}
          orderBy='name'
          handleDownload={() => { this.handleDownload() }}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
          handleAdd={() => { this.handleAdd() }}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          goToDetail={this.goToDetail}
        />
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
      { id: 'jabatan', numeric: false, disablePadding: true, label: 'Jabatan' },
      { id: 'tahunKerja', numeric: false, disablePadding: true, label: 'Tahun Kerja' },
      { id: 'waliKelas', numeric: false, disablePadding: true, label: 'Wali Kelas' },
    ],
    dataTables: [
      { uniqueId: '001', nama: 'Antonius Heru H', pendidikan: 'S1', kedudukan: 'GT', jabatan: 'Kepala Sekolah', tahunKerja: 22, waliKelas: '-' },
      { uniqueId: '002', nama: 'Agus Supriyanto', pendidikan: 'S1', kedudukan: 'GT', jabatan: 'Sie Kurikulum', tahunKerja: 12, waliKelas: '-' },
      { uniqueId: '003', nama: 'Sandhi Hendra F', pendidikan: 'S1', kedudukan: 'GT', jabatan: 'Sie Kesiswaan', tahunKerja: 10, waliKelas: '-' },
      { uniqueId: '004', nama: 'Anita Siwi S', pendidikan: 'S1', kedudukan: 'GT', jabatan: 'BP / BK', tahunKerja: 8, waliKelas: '-' },
    ],
  }
}

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataStaff);