import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading, pushAlert } from "../../../components/layout/ActionLayout";
import DataTables from "../../../components/data_tables/DataTables";
import { Fade } from "react-reveal";
import Modals from "../../../components/modal/Modal";
import Selects from "../../../components/select/Select";
import InputField from "../../../components/input_field/InputField";
import { HTTP_SERVICE } from "../../../services/HttpServices";
import Alert from "@material-ui/lab/Alert";

class Kelas extends Component {
  newForm;
  newDataTables;
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      page: 0,
      dataTables: [],
      optionTahunAjaran: [],
      form: {
        kelas: '',
        indexKelas: '',
        kapasitas: 0,
      },
      openModal: false,
      limit: 5,
      modalConfirm: false,
      confirmValue: [],
    }

    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.goToDetail = this.goToDetail.bind(this);
    this.newDataTables = this.props.dataTables;
    this.newForm = this.state.form;
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getData(this.state.limit);
    this.setState({ dataTables: this.props.dataTables });
    this.setState({ pageLoaded: true });
  }

  getData = async (limit) => {
    const request = {
      collection: 'datakelas',
      limit: limit,
      lastVisible: '',
      orderBy: "uniqueId",
      directions: "asc",
      params: 'active',
      operator: '==',
      value: true,
    }
    await HTTP_SERVICE.getFBFilter(request).then(res => {
      res.forEach(doc => {
        this.newDataTables.push({
          uniqueId: doc.id,
          kelas: doc.data().kelas,
          wali: doc.data().wali || '-',
          tahun: doc.data().tahun,
          kapasitas: doc.data().kapasitas,
          tanggal: doc.data().tanggal,
        });
      });
      this.setState({ dataTables: this.newDataTables })
      this.props.setLoading(false);
    }).catch(err => {
      this.props.setLoading(false);
      // console.log(err);
    });
  }

  handleDownload = () => {

  }

  onChangePage = (page, limit) => {
    this.getData(limit);
  }

  onSearch = (value) => {

  }

  handleAdd = () => {
    this.setState({
      openModal: true,
      form: {
        kelas: '',
        indexKelas: '',
        kapasitas: 0,
      }
    });
    this.newForm = this.state.form;
  }

  handleEdit = (checked) => {

  }

  handleDelete = (checked) => {

  }

  goToDetail = (clicked) => {
    this.setState({
      pageLoaded: false
    }, () => {
      const selected = this.newDataTables.filter(data => {
        return data.uniqueId === clicked;
      })
      setTimeout(() => {
        window.location.hash = `#/school/detail_kelas/${clicked}/${selected[0].kapasitas}`;
      }, 400)
    });
  }

  selectOnChange = (name, value) => {
    this.newForm[name] = value;
    this.setState({ form: this.newForm });
  }

  onBlurInput = (id, value) => {
    this.newForm[id] = value;
    this.setState({ form: this.newForm });
  }

  closeModal = () => {
    this.setState({
      openModal: false
    })
  }

  submitModal = async () => {
    this.setState({
      openModal: false
    });
    let now = new Date();
    let current = `${now.getFullYear()}/${now.getFullYear() + 1}`;
    this.props.setLoading(true);
    const {
      kelas,
      indexKelas,
      kapasitas,
    } = this.state.form;
    let newRow = {
      uniqueId: kelas + '-' + indexKelas,
      kelas: kelas + '-' + indexKelas,
      wali: '',
      tahun: current,
      kapasitas: kapasitas,
      tanggal: now.getDate() + ' ' + now.toLocaleString('default', { month: 'long' }) + ' ' + now.getFullYear(),
      active: true,
      author: this.props.userProfile.email,
      authorId: this.props.userProfile.author,
    }
    let request = {
      collection: 'datakelas',
      doc: `${kelas}-${indexKelas}-${now.getFullYear()}`,
      data: newRow
    }
    await HTTP_SERVICE.getFb(request)
    .then(async res => {
      if(!res.exists){
        await HTTP_SERVICE.inputFb(request).then(res => {
          this.newDataTables.unshift(newRow);
          this.setState({
            dataTables: this.newDataTables,
          })
            this.props.setLoading(false);
          }).catch(err => {
            this.props.setLoading(false);
          })
        } else {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Kelas sudah terdaftar',
            type: 'error',
          });
        }
      })
      .catch(err => {
        // console.log(err);
      });
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
    const {
      pageLoaded,
      page,
      dataTables,
      openModal,
      modalConfirm,
      confirmValue
    } = this.state;
    const {
      headCells,
      optionKelas
    } = this.props;
    const deleteVal = confirmValue.length > 0 ? confirmValue.join(', ') : '';
    return (
      <Fade right opposite when={pageLoaded} duration={500}>
        <DataTables
          tableName='Daftar Kelas'
          allowEdit={true}
          page={page}
          headCells={headCells}
          data={dataTables}
          orderConfig={false}
          orderBy='name'
          handleDownload={this.handleDownload}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
          handleAdd={this.handleAdd}
          handleEdit={this.handleEdit}
          handleDelete={(checked) => this.confirmDelete(checked)}
          goToDetail={this.goToDetail}
        />
        <Modals
          modalTitle='Input Jadwal Kegiatan'
          open={openModal}
          onCloseModal={() => { this.closeModal() }}
          onSubmitModal={() => { this.submitModal() }}
          type='confirm'
        >
          <div style={{ width: 400, height: 300 }}>
            <Selects name='kelas' id='kelas' label='Kelas' variant='outlined' options={optionKelas} value='' onChange={(name, value) => { this.selectOnChange(name, value) }} isSubmit={false} disable={false} required={true} />
            <InputField id='indexKelas' label='Index Kelas' variant='outlined' required={false} type="text" value='' disabled={false} onBlur={(id, value) => this.onBlurInput(id, value)} isSubmit={false} />
            <InputField id='kapasitas' label='Kapasitas' variant='outlined' required={false} type="number" value='' disabled={false} onBlur={(id, value) => this.onBlurInput(id, value)} isSubmit={false} />
          </div>
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
    )
  }
}

const mapStateToProps = state => ({
  dataTables: [],
  headCells: [
    { id: 'kelas', numeric: false, disablePadding: true, label: 'Kelas' },
    { id: 'wali', numeric: false, disablePadding: true, label: 'Wali Kelas' },
    { id: 'tahun', numeric: true, disablePadding: false, label: 'Tahun' },
    { id: 'kapasitas', numeric: true, disablePadding: false, label: 'Kapasitas (Max)' },
    { id: 'tanggal', numeric: true, disablePadding: false, label: 'Tanggal Pembuatan' },
  ],
  optionKelas: [
    { value: 'VII', text: 'VII' },
    { value: 'VIII', text: 'VIII' },
    { value: 'IX', text: 'IX' },
    { value: 'X', text: 'X' },
    { value: 'XI', text: 'XI' },
    { value: 'XII', text: 'XII' },
  ],
  userProfile: state.layout.resAuth,
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Kelas)