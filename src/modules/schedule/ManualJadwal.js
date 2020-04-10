import React, { Component } from 'react';
import { Fade, Zoom } from 'react-reveal';
import { connect } from 'react-redux';
import { Grid, Table, TableContainer, Paper, TableHead, TableBody, TableRow, withStyles, TableCell } from '@material-ui/core';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ListComponent from '../../components/moveable_list/ListComponent';
import Selects from '../../components/select/Select';
import Button from '../../components/button/Button';
import { pushLoading, pushAlert } from '../../components/layout/ActionLayout';

class ManualJadwal extends Component {
  newJadwal;
  idKelas = this.props.match.params.idKelas;
  constructor(props) {
    super(props);
    this.state = {
      jadwal: {},
      selectedClass: '',
      dataLoaded: false
    }
    this.newJadwal = this.state.jadwal;
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    if (this.idKelas !== 'empty') {
      this.props.onSetLoading(true);
      this.setState({
        selectedClass: this.idKelas,
      }, () => {
        setTimeout(() => {
          this.setState({ dataLoaded: true });
          this.props.onSetLoading(false);
        }, 3000);
      });
    } else {
      this.props.onSetAlert({
        open: true,
        message: 'Silahkan pilih kelas terlebih dahulu',
        type: 'warning'
      })
    }
  }

  onDrop = (result) => {
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      if (destination.droppableId) {
        let jam = destination.droppableId.split('-');
        let droppedAt = this.props.listJadwal.filter((val) => {
          return val.id === result.draggableId;
        })
        if (
          jam[1] !== 'istirahat 1' &&
          jam[1] !== 'istirahat 2' &&
          destination.droppableId !== 'jumat-7' &&
          destination.droppableId !== 'jumat-8' &&
          destination.droppableId !== 'jumat-9'
        ) {
          this.newJadwal[destination.droppableId] = droppedAt[0].title;
          this.setState({ jadwal: this.newJadwal });
        }
      }
    }
    console.log(this.state.jadwal);
  }

  selectOnChange = (name, value) => {
    this.props.onSetLoading(true);
    this.setState({
      selectedClass: value,
      dataLoaded: false
    }, () => {
      setTimeout(() => {
        this.props.onSetLoading(false);
        this.setState({ dataLoaded: true });
      }, 3000);
    });
  }

  onSave = () => {
    this.props.onSetLoading(true);
    setTimeout(() => {
      this.props.onSetLoading(false);
      this.props.onSetAlert({
        open: true,
        message: 'Jadwal berhasil di simpan',
        type: 'success'
      })
    }, 3000);
  }

  render() {
    const { jadwal, selectedClass, dataLoaded } = this.state;
    return (
      <Fade right duration={500}>
        <Grid style={{ marginTop: -20 }} container justify='space-between' alignItems="center">
          <Grid item xs={2}>
            <Selects
              name='kelas'
              id='kelas'
              label='Pilih Kelas'
              variant='outlined'
              options={this.props.classOption}
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
            <div style={{ marginLeft: 15 }}>
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
                  listData={this.props.listJadwal}
                  droppableId='listJadwal'
                />
              </Grid>
              <Grid item xs>
                <TableContainer component={Paper}>
                  <Table size='medium' border={1} style={{ borderColor: 'grey.100' }}>
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
                            <Droppable droppableId={hari + '-' + jam}>
                              {(provided, snapshot) => {
                                return (
                                  <StyledTblCell
                                    align='center'
                                    ref={provided.innerRef}
                                    style={{
                                      background: snapshot.isDraggingOver ? jam === 'istirahat 1' || jam === 'istirahat 2' ? 'yellow' : 'lightblue' : jam === 'istirahat 1' || jam === 'istirahat 2' ? 'yellow' : 'white',
                                      height: snapshot.isDraggingOver && jam !== 'istirahat 1' && jam !== 'istirahat 2' ? 80 : 10
                                    }}
                                    key={hari}
                                  >
                                    {jadwal[hari + '-' + jam] !== undefined
                                      ?
                                      jadwal[hari + '-' + jam]
                                      :
                                      jam === 'istirahat 1' || jam === 'istirahat 2'
                                        ?
                                        jam
                                        :
                                        hari === 'jumat' && (jam === 'istirahat 2' || jam === '7' || jam === '8' || jam === '9')
                                          ?
                                          ''
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
  classOption: [
    { value: '001', text: 'VII A' },
    { value: '002', text: 'VII B' },
    { value: '003', text: 'VIII' },
    { value: '004', text: 'IX' },
  ]
});

const mapDispatchToProps = dispatch => ({
  onSetLoading: value => dispatch(pushLoading(value)),
  onSetAlert: value => dispatch(pushAlert(value)),
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

export default connect(mapStateToProps, mapDispatchToProps)(ManualJadwal);