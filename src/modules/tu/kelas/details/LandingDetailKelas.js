import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading } from '../../../components/layout/ActionLayout';
import CardsWithPeople from '../../../components/cards/Card';
import { Grid } from '@material-ui/core';
import DataTables from '../../../components/data_tables/DataTables';
import { Fade } from 'react-reveal';

class LandingDetailKelas extends Component {
  idKelas = this.props.match.params.idKelas;
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false
    }
    this.handleChangeButton = this.handleChangeButton.bind(this);
  }

  componentDidMount() {
    this.setState({pageLoaded: true});
    this.props.setLoading(false);
  }

  handleChangeButton = () => {
    // this.props.setLoading(true);
    this.setState({
      pageLoaded: false
    },() => {
      setTimeout(() => {
        this.setState({pageLoaded: true})
      }, 5)
    })
  }

  goToSiswa = () => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = `#/school/list_siswa/${this.idKelas}`
      }, 300)
    });
  }
  
  goToMataPelajaran = () => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = `#/school/input_mata_pelajaran/${this.idKelas}`
      }, 300);
    });
  }

  goToJadwal = () => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = `#/school/input_jadwal/${this.idKelas}`;
      }, 300);
    })
  }

  render() {
    return (
      <Fade right opposite cascade duration={500} when={this.state.pageLoaded}>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <CardsWithPeople changeButton={() => this.handleChangeButton()} />
            </Grid>
            <Grid item xs onClick={this.goToSiswa}>
              <DataTables
                tableName='Data Siswa'
                page={0}
                dataLength={this.props.dataTablesSiswa.length}
                headCells={this.props.headCellsSiswa}
                data={this.props.dataTablesSiswa}
                orderConfig={false}
                orderBy='kelas'
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6} onClick={this.goToMataPelajaran}>
              <DataTables
                tableName='Mata Pelajaran'
                page={0}
                dataLength={this.props.dataTablesSiswa.length}
                headCells={this.props.headCellsSiswa}
                data={this.props.dataTablesSiswa}
                orderConfig={false}
                orderBy='kelas'
              />
            </Grid>
            <Grid item xs={6} onClick={this.goToJadwal}>
              <DataTables
                tableName='Jadwal'
                page={0}
                dataLength={this.props.dataTablesSiswa.length}
                headCells={this.props.headCellsSiswa}
                data={this.props.dataTablesSiswa}
                orderConfig={false}
                orderBy='kelas'
              />
            </Grid>
          </Grid>
        </div>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  dataTablesSiswa: [
    // { uniqueId: '001', kelas: 'VII A', tahun: '2019/2020', tanggal: '06 Juni 2019' },
    // { uniqueId: '002', kelas: 'VII B', tahun: '2019/2020', tanggal: '06 Juni 2019' },
    // { uniqueId: '003', kelas: 'VIII', tahun: '2019/2020', tanggal: '06 Juni 2019' },
    // { uniqueId: '004', kelas: 'IX', tahun: '2019/2020', tanggal: '06 Juni 2019' },
  ],
  headCellsSiswa: [
    { id: 'kelas', numeric: false, disablePadding: true, label: 'Kelas' },
    { id: 'tahun', numeric: true, disablePadding: false, label: 'Tahun' },
    { id: 'tanggal', numeric: true, disablePadding: false, label: 'Tanggal Pembuatan' },
  ]
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingDetailKelas)