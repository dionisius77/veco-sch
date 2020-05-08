import React, { Component } from 'react';
import { Fade, Zoom } from 'react-reveal';
import { connect } from 'react-redux';
import { Grid, Table, TableContainer, Paper, TableHead, TableBody, TableRow, withStyles, TableCell } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ListComponent from '../../../components/moveable_list/ListComponent';
import Selects from '../../../components/select/Select';
import Button from '../../../components/button/Button';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { HTTP_SERVICE } from '../../../services/HttpServices';

class ManualJadwal extends Component {
  newJadwal;
  newListMataPelajaran;
  idKelas = this.props.match.params.idKelas;
  constructor(props) {
    super(props);
    this.state = {
      jadwal: {},
      selectedClass: '',
      dataLoaded: false,
      classOption: [],
      listMataPelajaran: [],
    }
    this.newJadwal = this.state.jadwal;
    this.onDrop = this.onDrop.bind(this);
    this.newListMataPelajaran = this.state.listMataPelajaran;
  }

  componentDidMount() {
    this.props.onSetLoading(true);
    this.getListKelas();
  }

  getListKelas = async () => {
    let newListKelas = [];
    await HTTP_SERVICE.getFb({ collection: 'datakelas' })
      .then(res => {
        res.forEach(doc => {
          newListKelas.push({ value: doc.id, text: doc.id });
        });
        this.setState({ classOption: newListKelas });
        if (this.idKelas !== 'empty') {
          this.setState({
            selectedClass: this.idKelas,
          });
          this.getListMataPelajaran(this.idKelas);
        } else {
          this.props.onSetLoading(false);
          this.props.onSetAlert({
            open: true,
            message: 'Silahkan pilih kelas terlebih dahulu',
            type: 'warning'
          })
        }
      })
      .catch(err => {
        this.props.onSetLoading(false);
        this.props.onSetAlert({
          open: true,
          message: 'Gagal mengambil data',
          type: 'error'
        });
      });
  }

  getListMataPelajaran = async (idKelas) => {
    const request = {
      collection: 'datakelas',
      doc: idKelas,
      subCollection: 'matapelajaran',
    }
    await HTTP_SERVICE.getFbSubCollection(request)
      .then(res => {
        if (res.docs.length > 0) {
          res.docs.forEach(e => {
            this.newListMataPelajaran.push({ id: e.id, title: e.data().matapelajaran, description: e.data().staff });
          });
          this.setState({ listMataPelajaran: this.newListMataPelajaran });
          this.getJadwal();
        } else {
          this.props.onSetAlert({
            open: true,
            message: 'Silahkan input Mata Pelajaran untuk kelas terlebih dahulu',
            type: 'error',
          });
          window.history.back();
        }
      })
      .catch(err => {
        // console.log(err);
      })
  }

  getJadwal = async () => {
    const req = {
      collection: 'datakelas',
      doc: this.state.selectedClass,
    }
    await HTTP_SERVICE.getFb(req)
      .then(res => {
        if (res.data().jadwal) {
          this.props.onSetLoading(false);
          this.props.onSetAlert({
            open: true,
            message: 'Click dan seret untuk mengubah nilai',
            type: 'warning'
          });
          this.newJadwal = res.data().jadwal;
          this.setState({
            dataLoaded: true,
            jadwal: res.data().jadwal,
          });
        } else {
          this.props.onSetLoading(false);
          this.props.onSetAlert({
            open: true,
            message: 'Click dan seret untuk mengubah nilai',
            type: 'warning'
          });
          this.setState({ dataLoaded: true });
        }
      })
      .catch(err => {
        // console.log(err);
      });
  }

  onDrop = (result) => {
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId) {
        let jam = destination.droppableId.split('-');
        let droppedAt = this.state.listMataPelajaran.filter((val) => {
          return val.id === result.draggableId;
        })
        if (
          jam[1] !== 'istirahat 1' &&
          jam[1] !== 'istirahat 2' &&
          destination.droppableId !== 'jumat-7' &&
          destination.droppableId !== 'jumat-8' &&
          destination.droppableId !== 'jumat-9' &&
          destination.droppableId !== 'senin-1'
        ) {
          let newDataJadwal = {
            id: droppedAt[0].id,
            text: droppedAt[0].title,
          };
          this.newJadwal[destination.droppableId] = newDataJadwal;
          this.setState({ jadwal: this.newJadwal });
        }
      }
    }
  }

  selectOnChange = (name, value) => {
    this.props.onSetLoading(true);
    this.setState({
      selectedClass: value,
      dataLoaded: false
    }, () => {
      this.getListMataPelajaran(value);
    });
  }

  onSave = async () => {
    this.props.onSetLoading(true);
    const { jadwal, selectedClass } = this.state;
    const reqDataKelas = {
      collection: 'datakelas',
      doc: selectedClass,
      data: {
        jadwal: jadwal,
        author: this.props.userProfile.email,
        authorId: this.props.userProfile.author,
      }
    }
    await HTTP_SERVICE.updateFB(reqDataKelas).then(async res => {
      let failed = 0;
      for (let item in jadwal) {
        let idMP = jadwal[item].id.split('_');
        let key = `jadwal.${item}`;
        let newobject = {}
        newobject[key] = {
          kelas: this.state.selectedClass,
          id: jadwal[item].id,
          text: jadwal[item].text,
        }
        let requestDataStaff = {
          collection: 'datastaff',
          doc: idMP[1],
          data: newobject,
          author: this.props.userProfile.email,
          authorId: this.props.userProfile.author,
        }
        await HTTP_SERVICE.updateFB(requestDataStaff)
          .then(res => {

          })
          .catch(err => {
            failed += 1;
          });
      }
      if (failed > 0) {
        this.props.onSetAlert({
          open: true,
          message: 'Jadwal gagal di simpan, silahkan coba lagi',
          type: 'error'
        });
      } else {
        this.props.onSetAlert({
          open: true,
          message: 'Jadwal berhasil simpan',
          type: 'success'
        });
        window.history.back();
      }
    }).catch(err => {
      this.props.onSetLoading(false)
      this.props.onSetAlert({
        open: true,
        message: 'Jadwal gagal di simpan, silahkan coba lagi',
        type: 'error'
      });
    });
  }

  render() {
    const { jadwal, selectedClass, dataLoaded, classOption, listMataPelajaran } = this.state;
    const { classes } = this.props;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 5, margin: 0 }}>
          <Grid container justify='space-between' alignItems="center">
            <Grid item xs={2}>
              <Selects
                name='kelas'
                id='kelas'
                label='Pilih Kelas'
                variant='outlined'
                options={classOption}
                value={selectedClass}
                onChange={this.selectOnChange}
                isSubmit={false}
                disable={this.idKelas !== 'empty'}
                required={false}
              />
            </Grid>
            <Grid item xs={3}>
              <h1 style={{ textAlign: 'left' }}>Input Jadwal</h1>
            </Grid>
            <Grid item xs={1}>
              <div>
                <Button
                  type="default"
                  disabled={false}
                  text="Simpan"
                  onClick={() => { this.onSave() }}
                />
              </div>
            </Grid>
          </Grid>
          <Zoom opposite when={dataLoaded} duration={500}>
            <DragDropContext onDragEnd={this.onDrop}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <ListComponent
                    listData={listMataPelajaran}
                    droppableId='listJadwal'
                  />
                </Grid>
                <Grid item xs>
                  <TableContainer component={Paper}>
                    <Table size='medium' border={1} className={classes.tableStyle}>
                      <TableHead>
                        <TableRow>
                          <StyledTblCell align='center'>Senin</StyledTblCell>
                          <StyledTblCell align='center'>Selasa</StyledTblCell>
                          <StyledTblCell align='center'>Rabu</StyledTblCell>
                          <StyledTblCell align='center'>Kamis</StyledTblCell>
                          <StyledTblCell align='center'>Jumat</StyledTblCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {['1', '2', '3', 'istirahat 1', '4', '5', '6', 'istirahat 2', '7', '8', '9'].map(jam => (
                          <TableRow key={jam}>
                            {['senin', 'selasa', 'rabu', 'kamis', 'jumat'].map((hari, i) => (
                              <Droppable droppableId={hari + '-' + jam} key={i}>
                                {(provided, snapshot) => {
                                  return (
                                    <StyledTblCell
                                      align='center'
                                      ref={provided.innerRef}
                                      style={{
                                        background: snapshot.isDraggingOver ? jam === 'istirahat 1' || jam === 'istirahat 2' ? 'yellow' : 'lightblue' : jam === 'istirahat 1' || jam === 'istirahat 2' ? 'yellow' : '',
                                        height: snapshot.isDraggingOver && jam !== 'istirahat 1' && jam !== 'istirahat 2' ? 80 : 10
                                      }}
                                      key={hari}
                                    >
                                      {jadwal[hari + '-' + jam] !== undefined
                                        ?
                                        jadwal[hari + '-' + jam].text
                                        :
                                        jam === 'istirahat 1' || jam === 'istirahat 2'
                                          ?
                                          jam
                                          :
                                          hari === 'jumat' && (jam === 'istirahat 2' || jam === '7' || jam === '8' || jam === '9')
                                            ?
                                            ''
                                            :
                                            hari === 'senin' && jam === '1'
                                              ?
                                              'Upacara'
                                              :
                                              'Empty'
                                      }
                                    </StyledTblCell>
                                  )
                                }}
                              </Droppable>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DragDropContext>
          </Zoom>
        </Paper>
      </Fade >
    )
  }
}

const mapStateToProps = state => ({
  listJadwal: [
    { id: '0', title: 'Matematika', description: 'Dion' },
    { id: '1', title: 'Bahasa Inggris', description: 'Yoshi' },
    { id: '2', title: 'Bahasa Indonesia', description: 'Rika' },
    { id: '3', title: 'IPA', description: 'Agus' },
    { id: '4', title: 'Sejarah', description: 'Yona' },
    { id: '5', title: 'PPKN', description: 'Vino' },
    { id: '6', title: 'Bahasa Sunda', description: 'Bebby' },
    { id: '7', title: 'Olahraga', description: 'Marcel' },
  ],
  userProfile: state.layout.resAuth
});

const mapDispatchToProps = dispatch => ({
  onSetLoading: value => dispatch(pushLoading(value)),
  onSetAlert: value => dispatch(pushAlert(value)),
});

const useStyles = (theme) => ({
  tableStyle: {
    background: theme.palette.background.paper,
    borderColor: theme.palette.text
  },
});

const StyledTblCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.common.grey,
    fontWeight: 800,
    fontSize: 16
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(ManualJadwal));