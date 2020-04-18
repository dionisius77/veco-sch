import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading } from "../../components/layout/ActionLayout";
import DataTables from "../../components/data_tables/DataTables";
import { Fade } from "react-reveal";
import Modals from "../../components/modal/Modal";
import Selects from "../../components/select/Select";
import InputField from "../../components/input_field/InputField";
import { HTTP_SERVICE } from "../../services/HttpServices";

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
        tahunAjaran: '',
        kapasitas: 0,
      },
      openModal: false,
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
    this.newDataTables = this.props.dataTables;
    this.newForm = this.state.form;
  }

  componentDidMount() {
    this.createListTahunAjaran();
    this.setState({ dataTables: this.props.dataTables });
    this.props.setLoading(false);
    this.setState({ pageLoaded: true });
  }

  createListTahunAjaran = () => {
    let now = new Date();
    let list = [];
    let prev = `${now.getFullYear() - 1}/${now.getFullYear()}`;
    let current = `${now.getFullYear()}/${now.getFullYear() + 1}`;
    let next = `${now.getFullYear() + 1}/${now.getFullYear() + 2}`;
    list.push({ value: prev, text: prev });
    list.push({ value: current, text: current });
    list.push({ value: next, text: next });
    this.setState({ optionTahunAjaran: list });
  }

  handleDownload = () => {

  }

  onChangePage = (page, limit) => {

  }

  onSearch = (value) => {

  }

  handleAdd = () => {
    this.setState({
      openModal: true,
      form: {
        kelas: '',
        indexKelas: '',
        tahunAjaran: '',
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
      setTimeout(() => {
        window.location.hash = `#/school/detail_kelas/${clicked}`;
      }, 400)
    })
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
    const {
      kelas,
      indexKelas,
      tahunAjaran,
      kapasitas,
    } = this.state.form;
    let id = Math.floor(Math.random() * 101);
    let now = new Date();
    let newRow = {
      uniqueId: id.toString(),
      kelas: kelas + '-' + indexKelas,
      wali: '-',
      tahun: tahunAjaran,
      kapasitas: kapasitas,
      tanggal: now.getDate() + ' ' + now.toLocaleString('default', { month: 'long' }) + ' ' + now.getFullYear(),
    }
    this.newDataTables.unshift(newRow);
    this.setState({
      dataTables: this.newDataTables,
    })
    let request = {
      url: 'api/v1/testSekolah',
      data: newRow
    }
    HTTP_SERVICE.post(request).then(res => {
      console.log(res)
    }).catch(err => {console.log(err)});
  }

  render() {
    const {
      pageLoaded,
      page,
      dataTables,
      optionTahunAjaran,
      openModal
    } = this.state;
    const {
      headCells,
      optionKelas
    } = this.props;
    return (
      <Fade right opposite when={pageLoaded} duration={500}>
        <DataTables
          tableName='Daftar Kelas'
          allowEdit={true}
          page={page}
          dataLength={dataTables.length}
          headCells={headCells}
          data={dataTables}
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
            <Selects name='tahunAjaran' id='tahunAjaran' label='Tahun Ajaran' variant='outlined' options={optionTahunAjaran} value='' onChange={(name, value) => { this.selectOnChange(name, value) }} isSubmit={false} disable={false} required={true} />
            <InputField id='kapasitas' label='Kapasitas' variant='outlined' required={false} type="number" value='' disabled={false} onBlur={(id, value) => this.onBlurInput(id, value)} isSubmit={false} />
          </div>
        </Modals>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  dataTables: [
    { uniqueId: '001', kelas: 'VII-A', wali: 'Ahahaha', tahun: '2019/2020', kapasitas: 40, tanggal: '6 June 2019' },
    { uniqueId: '002', kelas: 'VII-B', wali: 'Ehehehe', tahun: '2019/2020', kapasitas: 40, tanggal: '6 June 2019' },
    { uniqueId: '003', kelas: 'VIII-A', wali: 'Ohohoho', tahun: '2019/2020', kapasitas: 40, tanggal: '6 June 2019' },
    { uniqueId: '004', kelas: 'IX-A', wali: 'Uhuhuhu', tahun: '2019/2020', kapasitas: 40, tanggal: '6 June 2019' },
  ],
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
  ]
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(Kelas)