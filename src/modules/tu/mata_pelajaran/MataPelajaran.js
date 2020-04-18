import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading } from "../../../components/layout/ActionLayout";
import DataTables from "../../../components/data_tables/DataTables";
import Modals from "../../../components/modal/Modal";
import { Fade } from 'react-reveal';

class MataPelajaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      modalFlag: false
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(false);
    this.setState({ pageLoaded: true });
  }

  onChangePage = (page, limit) => {
    console.log('page : ', page);
    console.log('limit : ', limit);
  }

  onSearch = (value) => {
    console.log(value);
  }

  handleAdd = () => {
    this.setState({ modalFlag: true });
  }

  handleDownload = () => {
    console.log("download data excel");
  }

  handleEdit = (checked) => {
    console.log('checked for edit : ', checked);
  }

  handleDelete = (checked) => {
    console.log('checked for delete : ', checked);
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
          tableName='Mata Pelajaran'
          allowEdit={true}
          page={0}
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
  dataTables: [
    { uniqueId: '001', matapelajaran: 'Matematika', kelompok: 'A (Wajib)', jam: 3 },
    { uniqueId: '002', matapelajaran: 'Bahasa Inggris', kelompok: 'A (Wajib)', jam: 3 },
    { uniqueId: '003', matapelajaran: 'Bahasa Indonesia', kelompok: 'A (Wajib)', jam: 3 },
    { uniqueId: '004', matapelajaran: 'Bahasa Sunda', kelompok: 'B (Wajib)', jam: 2 },
  ],
  headCells: [
    { id: 'matapelajaran', numeric: false, disablePadding: true, label: 'Mata Pelajaran' },
    { id: 'kelompok', numeric: true, disablePadding: false, label: 'Kelompok' },
    { id: 'jam', numeric: true, disablePadding: false, label: 'Jam Pelajaran (45 min)' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MataPelajaran);