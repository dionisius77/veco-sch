import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading } from "../../components/layout/ActionLayout";
import DataTables from "../../components/data_tables/DataTables";
import { Fade } from "react-reveal";

class Kelas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      page: 0,
    }

    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
    // this.submitModal = this.submitModal.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(false);
    this.setState({ pageLoaded: true });
  }

  handleDownload = () => {

  }

  onChangePage = (page, limit) => {

  }

  onSearch = (value) => {

  }

  handleAdd = () => {

  }

  handleEdit = (checked) => {

  }

  handleDelete = (checked) => {

  }

  goToDetail = (clicked) => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = `#/school/detail_kelas/${clicked}`;
      }, 400)
    })
  }

  render() {
    return (
      <Fade right opposite when={this.state.pageLoaded} duration={500}>
        <DataTables
          tableName='Daftar Kelas'
          allowEdit={true}
          page={this.state.page}
          dataLength={this.props.dataTables.length}
          headCells={this.props.headCells}
          data={this.props.dataTables}
          orderConfig={false}
          orderBy='name'
          handleDownload={this.handleDownload}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          goToDetail={this.goToDetail}
        />
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  dataTables: [
    { uniqueId: '001', kelas: 'VII A', wali: 'Ahahaha', tahun: '2019/2020', kapasitas: 40, tanggal: '06 Juni 2019' },
    { uniqueId: '002', kelas: 'VII B', wali: 'Ehehehe', tahun: '2019/2020', kapasitas: 40, tanggal: '06 Juni 2019' },
    { uniqueId: '003', kelas: 'VIII', wali: 'Ohohoho', tahun: '2019/2020', kapasitas: 40, tanggal: '06 Juni 2019' },
    { uniqueId: '004', kelas: 'IX', wali: 'Uhuhuhu', tahun: '2019/2020', kapasitas: 40, tanggal: '06 Juni 2019' },
  ],
  headCells: [
    { id: 'kelas', numeric: false, disablePadding: true, label: 'Kelas' },
    { id: 'wali', numeric: false, disablePadding: true, label: 'Wali Kelas' },
    { id: 'tahun', numeric: true, disablePadding: false, label: 'Tahun' },
    { id: 'kapasitas', numeric: true, disablePadding: false, label: 'Kapasitas (Max)' },
    { id: 'tanggal', numeric: true, disablePadding: false, label: 'Tanggal Pembuatan' },
  ]
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Kelas)