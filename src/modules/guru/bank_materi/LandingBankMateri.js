import React, { Component } from 'react';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import Selects from '../../../components/select/Select';
import DataTables from '../../../components/data_tables/DataTables';
class LandingBankMateri extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exists: false,
      optionMapel: [],
      dataTables: [],
    };
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getDataMapel();
  }

  generateMapelList = (list) => {
    let finalList = [];
    list.forEach(item => {
      let splitted = item.split('-');
      finalList.push({ value: item, text: splitted[0] });
    });
    return finalList;
  }

  getDataMapel = () => {
    if (this.props.userProfile.bidangStudi) {
      const mapelList = this.generateMapelList(this.props.userProfile.bidangStudi);
      this.setState({ optionMapel: mapelList });
      this.props.setLoading(false);
    } else {
      this.props.setLoading(false);
      this.props.setAlert({
        open: true,
        message: 'Data bidang studi belum ada.',
        type: 'error',
      });
    }
  }

  goToDetail = (id) => {
    console.log(id);
  }

  handleAdd = () => {
    window.location.hash = '#/school/input_bank_materi';
  }

  selectOnChange = (name, value) => {
    console.log('name : ', name);
    console.log('value : ', value);
  }

  render() {
    const {
      optionMapel,
      dataTables
    } = this.state;
    const {
      headCells
    } = this.props;
    return (
      <Paper style={{ padding: 10, margin: -10, minHeight: 550 }}>
        <DataTables
          tableName="Bank Materi"
          allowEdit={true}
          filter={
            <Grid container spacing={1} alignItems="flex-start">
              <Grid item xs={3}>
                <Selects
                  name='mataPelajaran'
                  id='mataPelajaran'
                  label='Pilih Mata Pelajaran'
                  variant='outlined'
                  options={optionMapel}
                  value=''
                  onChange={(name, value) => { this.selectOnChange(name, value) }}
                  isSubmit={false}
                  required={false}
                  size='small'
                />
              </Grid>
              <Grid item xs={3}>
                <Selects
                  name='kelas'
                  id='kelas'
                  label='Pilih Kelas'
                  variant='outlined'
                  options={[]}
                  value=''
                  onChange={(name, value) => { this.selectOnChange(name, value) }}
                  isSubmit={false}
                  required={false}
                  size='small'
                />
              </Grid>
            </Grid>
          }
          multipleEdit={false}
          page={0}
          dataLength={dataTables.length}
          headCells={headCells}
          data={dataTables}
          orderConfig={false}
          orderBy='name'
          handleDownload={() => { }}
          handleChangePage={(page, limit) => { this.onChangePage(page, limit) }}
          handleSearch={(value) => { }}
          handleAdd={() => { this.handleAdd() }}
          handleDelete={(checked) => { this.handleDelete(checked) }}
          goToDetail={(checked) => { this.goToDetail(checked) }}
        />
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.layout.resAuth,
  headCells: [
    { id: 'mapel', numeric: false, disablePadding: true, label: 'Mata Pelajaran' },
    { id: 'judul', numeric: false, disablePadding: true, label: 'Judul' },
    { id: 'kelas', numeric: false, disablePadding: true, label: 'Kelas' },
    { id: 'tglupload', numeric: true, disablePadding: false, label: 'Tgl Upload' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingBankMateri);