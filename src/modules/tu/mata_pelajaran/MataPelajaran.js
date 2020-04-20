import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading } from "../../../components/layout/ActionLayout";
import DataTables from "../../../components/data_tables/DataTables";
import Modals from "../../../components/modal/Modal";
import { Fade } from 'react-reveal';
import InputField from "../../../components/input_field/InputField";
import Selects from "../../../components/select/Select";

class MataPelajaran extends Component {
  newFormData;
  newDataTables;
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      modalFlag: false,
      formData: {
        mataPelajaran: { value: '', isValid: false },
        jam: { value: '', isValid: false },
        kelompok: { value: '', isValid: false },
      },
      dataTables: this.props.dataTables
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.submitModal = this.submitModal.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.newFormData = this.state.formData;
    this.newDataTables = this.state.dataTables;
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
    const { formData } = this.state;
    let newMataPelajaran = {
      uniqueId: '001',
      matapelajaran: formData.mataPelajaran.value,
      kelompok: formData.kelompok.value,
      jam: formData.jam.value,
    }
    this.newDataTables.unshift(newMataPelajaran);
    this.setState({ dataTables: this.newDataTables });
    this.handleCloseModal();
  }

  inputOnChange = (id, value, isValid) => {
    this.newFormData[id].value = value;
    this.newFormData[id].isValid = isValid;
    this.setState({ formData: this.newFormData });
  }

  render() {
    const { formData, dataTables, modalFlag } = this.state;
    return (
      <Fade right opposite when={this.state.pageLoaded} duration={500}>
        <DataTables
          tableName='Mata Pelajaran'
          allowEdit={true}
          page={0}
          dataLength={dataTables.length}
          headCells={this.props.headCells}
          data={dataTables}
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
          open={modalFlag}
          modalTitle="Input Mata Pelajaran"
          type="confirm"
          onCloseModal={this.handleCloseModal}
          onSubmitModal={this.submitModal}
        >
          <InputField id='mataPelajaran' label='Mata Pelajaran' required={true} type="text" value='' disabled={false} onBlur={this.inputOnChange} isSubmit={false} variant='outlined' setFocus={true} />
          <InputField id='jam' label='Jam Pelajaran' required={true} type="number" value='' disabled={false} onBlur={this.inputOnChange} isSubmit={false} variant='outlined' />
          <Selects name='kelompok' id='kelompok' label='Kelompok' variant='outlined' options={this.props.optKelompok} value='' onChange={this.inputOnChange} isSubmit={false} disable={false} required={true} />
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
  optKelompok: [
    { value: 'A (Wajib)', text: 'A (Wajib)' },
    { value: 'B (Wajib)', text: 'B (Wajib)' },
    { value: 'C', text: 'C' },
  ]
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MataPelajaran);