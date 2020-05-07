import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading, pushAlert } from "../../../components/layout/ActionLayout";
import DataTables from "../../../components/data_tables/DataTables";
import Modals from "../../../components/modal/Modal";
import { Fade } from 'react-reveal';
import InputField from "../../../components/input_field/InputField";
import Selects from "../../../components/select/Select";
import { HTTP_SERVICE } from '../../../services/HttpServices';
import Alert from "@material-ui/lab/Alert";

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
      dataTables: this.props.dataTables,
      limit: 5,
      lastVisible: '',
      edit: false,
      idDoc: '',
      hashMore: true,
      modalConfirm: false,
      confirmValue: [],
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
    this.props.setLoading(true);
    this.getData(this.state.limit, 0);
  }

  getData = async (limit, page) => {
    if (page === 0) {
      this.newDataTables = [];
    }
    const request = {
      collection: 'matapelajaran',
      limit: limit,
      lastVisible: page !== 0 ? this.state.lastVisible : '',
      orderBy: "timestamp",
      directions: "desc"
    }
    await HTTP_SERVICE.getFb(request).then(async res => {
      if (res.docs.length < limit) {
        this.setState({ hashMore: false });
      }
      res.forEach(data => {
        this.newDataTables.push({
          uniqueId: data.id,
          matapelajaran: data.data().matapelajaran,
          jam: data.data().jam,
          kelompok: data.data().kelompok,
        });
      });
      this.setState({
        dataTables: this.newDataTables,
        lastVisible: res.docs[res.docs.length - 1]
      });
    }).catch(err => {
      // console.log(err)
    });
    this.setState({ pageLoaded: true });
    this.props.setLoading(false);
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
    this.setState({ modalFlag: true, edit: false });
  }

  handleDownload = () => {
    // console.log("download data excel");
  }

  handleEdit = async (clicked) => {
    this.props.setLoading(true);
    for (let i = 0; i < this.newDataTables.length; i++) {
      if (this.newDataTables[i].uniqueId === clicked) {
        this.newFormData.mataPelajaran.value = this.newDataTables[i].matapelajaran;
        this.newFormData.jam.value = this.newDataTables[i].jam;
        this.newFormData.kelompok.value = this.newDataTables[i].kelompok;
        break;
      }
    }
    this.setState({ modalFlag: true, edit: true });
    this.setState({
      formData: this.newFormData,
      idDoc: clicked,
    });
    this.props.setLoading(false);
  }

  handleDelete = async () => {
    this.setState({ modalConfirm: false });
    this.props.setLoading(true);
    let checked = this.state.confirmValue;
    for (let i = 0; i < checked.length; i++) {
      await HTTP_SERVICE.deleteFB({
        collection: 'matapelajaran',
        doc: checked[i],
      }).then(res => {
        for (let j = 0; j < this.newDataTables.length; j++) {
          if (this.newDataTables[j].uniqueId === checked[i]) {
            this.newDataTables.splice(j, 1);
            break;
          }
        }
        if (i === checked.length - 1) {
          this.props.setLoading(false);
          this.setState({ dataTables: this.newDataTables });
          this.props.setAlert({
            message: 'Data berhasil dihapus',
            open: true,
            type: 'success',
          });
        }
      }).catch(err => {
        if (i === checked.length - 1) {
          this.setState({ modalConfirm: false });
          this.props.setLoading(false);
          this.props.setAlert({
            message: 'Data gagal dihapus',
            open: true,
            type: 'error',
          });
        }
      })
    }
  }

  submitEdit = async () => {
    this.setState({ modalFlag: false });
    this.props.setLoading(true);
    const { formData, idDoc } = this.state;
    const request = {
      collection: 'matapelajaran',
      doc: idDoc,
      data: {
        jam: formData.jam.value,
        kelompok: formData.kelompok.value,
        author: this.props.userProfile.author
      }
    }
    await HTTP_SERVICE.updateFB(request).then(res => {
      let updateMataPelajaran = {
        uniqueId: idDoc,
        matapelajaran: formData.mataPelajaran.value,
        kelompok: formData.kelompok.value,
        jam: formData.jam.value,
      }
      for (let i = 0; i < this.newDataTables.length; i++) {
        if (this.newDataTables[i].uniqueId === idDoc) {
          this.newDataTables[i] = updateMataPelajaran;
          break;
        }
      }
      this.setState({ dataTables: this.newDataTables });
      this.props.setAlert({
        message: 'Data berhasil diupdate',
        open: true,
        type: 'success'
      });
    }).catch(err => {
      this.props.setAlert({
        message: 'Data gagal diupdate',
        open: true,
        type: 'error'
      });
    })
    this.handleCloseModal()
    this.props.setLoading(false);
  }

  handleCloseModal = () => {
    this.newFormData.mataPelajaran.value = '';
    this.newFormData.jam.value = '';
    this.newFormData.kelompok.value = '';
    this.setState({ formData: this.newFormData });
    this.setState({ modalFlag: false });
  }

  submitModal = async () => {
    let defaultIndex = 1;
    const { formData } = this.state;
    const gets = {
      collection: 'matapelajaran',
      doc: formData.mataPelajaran.value + '-' + defaultIndex
    }
    this.setState({ modalFlag: false });
    this.props.setLoading(true);
    await HTTP_SERVICE.getFb(gets).then(async res => {
      if (res.exists) {
        let request = {
          collection: 'matapelajaran',
          doc: formData.mataPelajaran.value + '-' + (defaultIndex + 1),
          data: {
            matapelajaran: formData.mataPelajaran.value,
            kelompok: formData.kelompok.value,
            jam: formData.jam.value,
            timestamp: new Date(),
            author: this.props.userProfile.email,
            authorId: this.props.userProfile.author,
          }
        }
        defaultIndex += 1;
        await HTTP_SERVICE.inputFb(request).then(res => {
          this.props.setAlert({
            message: 'Data berhasil diinput',
            open: true,
            type: 'success'
          });
        }).catch(err => {
          this.props.setAlert({
            message: 'Data gagal diinput',
            open: true,
            type: 'error'
          });
        });
      } else {
        let request = {
          collection: 'matapelajaran',
          doc: formData.mataPelajaran.value + '-' + defaultIndex,
          data: {
            matapelajaran: formData.mataPelajaran.value,
            kelompok: formData.kelompok.value,
            jam: formData.jam.value,
            timestamp: new Date(),
            author: this.props.userProfile.email,
            authorId: this.props.userProfile.author,
          }
        }
        await HTTP_SERVICE.inputFb(request).then(res => {
          this.props.setAlert({
            message: 'Data berhasil diinput',
            open: true,
            type: 'success'
          });
        }).catch(err => {
          this.props.setAlert({
            message: 'Data gagal diinput',
            open: true,
            type: 'error'
          });
        });
      }
    }).catch(err => {
      this.props.setAlert({
        message: 'error',
        open: true,
        type: 'error'
      });
    });

    let newMataPelajaran = {
      uniqueId: formData.mataPelajaran.value + defaultIndex,
      matapelajaran: formData.mataPelajaran.value,
      kelompok: formData.kelompok.value,
      jam: formData.jam.value,
    }

    this.newDataTables.unshift(newMataPelajaran);
    this.setState({ dataTables: this.newDataTables });
    this.props.setLoading(false);
    this.handleCloseModal();
  }

  inputOnChange = (id, value, isValid) => {
    this.newFormData[id].value = value;
    this.newFormData[id].isValid = isValid;
    this.setState({ formData: this.newFormData });
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
    const { dataTables, modalFlag, edit, formData, modalConfirm, confirmValue } = this.state;
    const deleteVal = confirmValue.length > 0 ? confirmValue.join(', ') : '';
    return (
      <Fade right opposite when={this.state.pageLoaded} duration={500}>
        <DataTables
          tableName='Mata Pelajaran'
          allowEdit={true}
          page={0}
          headCells={this.props.headCells}
          data={dataTables}
          orderConfig={false}
          orderBy='name'
          handleDownload={this.handleDownload}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={(checked) => this.confirmDelete(checked)}
          goToDetail={this.handleEdit}
        />
        <Modals
          open={modalFlag}
          modalTitle="Input Mata Pelajaran"
          type="confirm"
          onCloseModal={this.handleCloseModal}
          onSubmitModal={edit ? this.submitEdit : this.submitModal}
        >
          <InputField id='mataPelajaran' label='Mata Pelajaran' required={true} type="text" value={formData.mataPelajaran.value} disabled={edit} onBlur={this.inputOnChange} isSubmit={false} variant='outlined' setFocus={true} />
          <InputField id='jam' label='Jam Pelajaran' required={true} type="number" value={formData.jam.value} disabled={false} onBlur={this.inputOnChange} isSubmit={false} variant='outlined' />
          <Selects name='kelompok' id='kelompok' label='Kelompok' variant='outlined' options={this.props.optKelompok} value={formData.kelompok.value} onChange={this.inputOnChange} isSubmit={false} disable={false} required={true} />
        </Modals>
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
  userProfile: state.layout.resAuth,
  dataTables: [
  ],
  headCells: [
    { id: 'matapelajaran', numeric: false, disablePadding: true, label: 'Mata Pelajaran' },
    { id: 'kelompok', numeric: true, disablePadding: false, label: 'Kelompok' },
    { id: 'jam', numeric: true, disablePadding: false, label: 'Jam Pelajaran (40 min)' },
  ],
  optKelompok: [
    { value: 'A (Wajib)', text: 'A (Wajib)' },
    { value: 'B (Wajib)', text: 'B (Wajib)' },
    { value: 'C', text: 'C' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MataPelajaran);