import React, { Component } from "react";
import { pushLoading, pushAlert } from "../../../components/layout/ActionLayout";
import { connect } from "react-redux";
import { HTTP_SERVICE } from "../../../services/HttpServices";
import { Paper, TableContainer, Table, TableHead, TableRow, withStyles, TableCell, TableBody, Grid } from "@material-ui/core";
import { Zoom } from "react-reveal";
import InputSimple from "../../../components/input_simple/InputSimple";
import Button from "../../../components/button/Button";

class InputNilai extends Component {
  newDataTables;
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      dataTables: [],
    }
    this.newDataTables = this.state.dataTables;
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getDataNilai();
  }

  getDataNilai = async () => {
    const request = {
      collection: 'nilai',
      doc: this.props.details.uniqueId,
    }
    await HTTP_SERVICE.getFb(request).then(res => {
      if (res.exists) {
        this.newDataTables = res.data().nilai;
        this.setState({
          dataTables: this.newDataTables,
          dataLoaded: true,
        });
        this.props.setLoading(false);
      } else {
        this.getDataSiswa();
      }
    }).catch(err => {
      this.props.setLoading(false);
      this.props.setAlert({
        message: err.message,
        open: true,
        type: 'error',
      });
    });
  }

  getDataSiswa = async () => {
    const request = {
      collection: 'datasiswa',
      params: 'kelas', operator: '==', value: this.props.details.kelas,
      orderBy: 'dataPribadi.nama', directions: 'asc', lastVisible: '', limit: 100
    }
    await HTTP_SERVICE.getFBFilter(request).then(res => {
      res.docs.forEach(doc => {
        this.newDataTables.push({
          id: doc.id,
          nis: doc.data().regisPesertaDidik.nis,
          nama: doc.data().dataPribadi.nama,
          nilai: '',
        });
      });
      this.setState({
        dataLoaded: true,
        dataTables: this.newDataTables,
      });
      this.props.setLoading(false);
    }).catch(err => {
      this.props.setLoading(false);
      this.props.setAlert({
        message: 'Terjadi kesalahan saat mengambil data',
        open: true,
        type: 'error',
      });
    });
  }

  inputOnBlur = (id, value) => {
    this.newDataTables.map((data, index) => {
      if (data.id === id) {
        this.newDataTables[index].nilai = value;
      }
      return null;
    });

    this.setState({ dataTables: this.newDataTables });
    console.log(this.newDataTables);
  }

  onSave = async () => {
    this.props.setLoading(true);
    const data = {
      kelas: this.props.details.kelas,
      mataPelajaran: this.props.details.mataPelajaran,
      author: this.props.userProfile.email,
      authorId: this.props.userProfile.author,
      nilai: this.state.dataTables,
      kegiatan: this.props.details.kegiatan,
      title: this.props.details.title
    }
    const req = {
      collection: 'nilai',
      doc: this.props.details.uniqueId,
      data: data,
    }

    await HTTP_SERVICE.inputFb(req).then(async res => {
      const reqUpdate = {
        collection: 'jadwalkbm',
        doc: this.props.details.uniqueId,
        data: { hasNilai: true },
      }
      await HTTP_SERVICE.updateFB(reqUpdate).then(resp => {
        this.props.setLoading(false);
        this.props.setAlert({
          open: true,
          message: 'Data berhasil di simpan',
          type: 'success',
        });
        window.history.back();
      }).catch(err => {
        this.props.setLoading(false);
        this.props.setAlert({
          open: true,
          message: 'Terjadi kesalahan saat menyimpan data',
          type: 'error',
        });
      })
    }).catch(err => {
      this.props.setLoading(false);
      this.props.setAlert({
        open: true,
        message: 'Terjadi kesalahan saat menyimpan data',
        type: 'error',
      });
    })
  }

  render() {
    const { dataLoaded, dataTables } = this.state;
    const { details } = this.props;
    return (
      <Paper style={{ padding: 10, margin: -10, minHeight: 550 }}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs={3}>
            <h3>{`${details.mataPelajaran} ${details.kelas}`}</h3>
          </Grid>
          <Grid item xs={1}>
            <Button
              type="default"
              disabled={false}
              text="Simpan"
              onClick={() => { this.onSave() }}
            />
          </Grid>
        </Grid>
        <Zoom duration={500} when={dataLoaded}>
          <TableContainer style={{ paddingTop: 20 }}>
            <Table size='small' border={1} style={{ borderColor: '#fff' }}>
              <TableHead>
                <TableRow>
                  <StyledTblCell style={{ width: 100 }}>NIS</StyledTblCell>
                  <StyledTblCell>Nama</StyledTblCell>
                  <StyledTblCell style={{ width: 50 }}>Nilai</StyledTblCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  dataTables.map(data =>
                    <TableRow key={data.id}>
                      <StyledTblCell>{data.nis}</StyledTblCell>
                      <StyledTblCell>{data.nama}</StyledTblCell>
                      <StyledTblCell>
                        <InputSimple
                          id={data.id}
                          required={true}
                          type='number'
                          value={data.nilai}
                          disabled={false}
                          onBlur={(id, value) => { this.inputOnBlur(id, value) }}
                        /></StyledTblCell>
                    </TableRow>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Zoom>
      </Paper>
    )
  }
}

const StyledTblCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.grey,
    fontWeight: 800,
    fontSize: 16,
    height: 20
  },
  body: {
    fontSize: 14,
    paddingTop: 2,
    paddingBottom: 0
  },
}))(TableCell);

const mapStateToProps = state => {
  return {
    details: state.nilai.dataKelas,
    userProfile: state.layout.resAuth,
  };
}


const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputNilai);