import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../../../../components/layout/ActionLayout';
import { Fade } from 'react-reveal';
import MoveableList from '../../../../../components/moveable_list/MoveableList';
import { Grid } from '@material-ui/core';

class InputMataPelajaran extends Component {
  newListA;
  newListB;
  constructor(props) {
    super(props);
    this.state = {
      listA: props.listA,
      listB: props.listB,
    }
    this.newListA = this.state.listA;
    this.newListB = this.state.listB;
    this.takeAction = this.takeAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.setAlert({
      open: true,
      message: 'Click dan seret mata pelajaran untuk memindahkan!',
      type: 'warning'
    })
  }

  takeAction = (nik, destination, sourceIndex) => {
    if (destination === 'droppableA') {
      let data = this.newListB[sourceIndex];
      let isAvailable = this.newListA.filter((val) => {
        return val.title === data.title;
      });
      if (isAvailable.length !== 0) {
        this.props.setAlert({
          open: true,
          message: `Mata Pelajaran ${data.title} sudah terdaftar`,
          type: 'error'
        });
      } else {
        this.newListA.unshift(data);
        this.newListB.splice(sourceIndex, 1);
        this.setState({
          listA: this.newListA,
          listB: this.newListB
        });
      }
    } else if (destination === 'droppableB') {
      let data = this.newListA[sourceIndex];
      this.newListB.unshift(data);
      this.newListA.splice(sourceIndex, 1);
      this.setState({
        listA: this.newListA,
        listB: this.newListB
      });
    }
  }

  closeModal = () => {
    this.setState({ openAlert: false });
  }

  render() {
    return (
      <Fade right duration={500}>
        <Grid container style={{ marginTop: -30 }}>
          <Grid item xs={12}>
            <h1 style={{ textAlign: 'center' }}>Input Mata Pelajaran VII-B</h1>
          </Grid>
        </Grid>
        <MoveableList
          listA={this.state.listA}
          titleA='Data Mata Pelajaran Kelas VII-B'
          titleB='Data Mata Pelajaran Sekolah'
          listB={this.state.listB}
          takeAction={this.takeAction}
        />
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  listA: [
    { id: '1100', title: 'Matematika', description: 'Antonius Heru' },
  ],
  listB: [
    { id: '1101', title: 'Matematika', description: 'Dion' },
    { id: '1200', title: 'Bahasa Inggris', description: 'Suprapti' },
    { id: '1201', title: 'Bahasa Inggris', description: 'Yoshi' },
    { id: '1300', title: 'IPA', description: 'Agus' },
    { id: '1301', title: 'IPA', description: 'Jordy' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: (value) => dispatch(pushLoading(value)),
  setAlert: (value) => dispatch(pushAlert(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(InputMataPelajaran);