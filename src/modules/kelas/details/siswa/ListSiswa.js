import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../../../components/layout/ActionLayout';
import { Fade } from 'react-reveal';
import MoveableList from '../../../../components/moveable_list/MoveableList';
import { Grid } from '@material-ui/core';

class ListSiswa extends Component {
  newListA;
  newListB;
  constructor(props) {
    super(props);
    this.state = {
      listA: props.listA,
      listB: props.listB
    }
    this.newListA = this.state.listA;
    this.newListB = this.state.listB;
    this.takeAction = this.takeAction.bind(this);
  }

  componentDidMount() {
    this.props.setAlert({
      open: true,
      message: 'Click dan seret siswa untuk memindahkan!',
      type: 'warning'
    })
  }

  takeAction = (nik, destination, sourceIndex) => {
    console.log(nik);
    console.log(destination);
    console.log(sourceIndex);
    if (destination === 'droppableA') {
      let data = this.newListB[sourceIndex];
      this.newListA.unshift(data);
      this.newListB.splice(sourceIndex, 1);
      this.setState({
        listA: this.newListA,
        listB: this.newListB
      });
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

  render() {
    return (
      <Fade right duration={500}>
        <Grid container style={{marginTop: -30}}>
          <Grid item xs={12}>
            <h1 style={{textAlign: 'center'}}>Pendaftaran Siswa Kelas VII-B</h1>
          </Grid>
        </Grid>
        <MoveableList
          listA={this.state.listA}
          titleA='Data Siswa Kelas VII-B'
          titleB='Data Siswa Belum Terdaftar'
          listB={this.state.listB}
          takeAction={this.takeAction}
        />
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  listA: [
    { id: '0', title: 'a', description: 2017 },
    { id: '1', title: 'b', description: 2017 },
    { id: '2', title: 'c', description: 2017 },
    { id: '3', title: 'd', description: 2017 },
    { id: '4', title: 'e', description: 2017 },
    { id: '5', title: 'f', description: 2017 },
    { id: '6', title: 'g', description: 2017 },
    { id: '7', title: 'h', description: 2017 },
    { id: '8', title: 'i', description: 2017 },
    { id: '9', title: 'j', description: 2017 },
    { id: '10', title: 'k', description: 2017 },
    { id: '11', title: 'l', description: 2017 },
    { id: '12', title: 'm', description: 2017 },
    { id: '13', title: 'n', description: 2017 },
    { id: '14', title: 'o', description: 2017 },
    { id: '15', title: 'p', description: 2017 },
    { id: '16', title: 'q', description: 2017 },
    { id: '17', title: 'r', description: 2017 },
  ],
  listB: [
    { id: '100', title: 'aa', description: 2017 },
    { id: '101', title: 'ab', description: 2017 },
    { id: '102', title: 'ac', description: 2017 },
    { id: '103', title: 'ad', description: 2017 },
    { id: '104', title: 'ae', description: 2017 },
    { id: '105', title: 'af', description: 2017 },
    { id: '106', title: 'ag', description: 2017 },
    { id: '107', title: 'ah', description: 2017 },
    { id: '108', title: 'ai', description: 2017 },
    { id: '109', title: 'aj', description: 2017 },
    { id: '110', title: 'ak', description: 2017 },
    { id: '111', title: 'al', description: 2017 },
    { id: '112', title: 'am', description: 2017 },
    { id: '113', title: 'an', description: 2017 },
    { id: '114', title: 'ao', description: 2017 },
    { id: '115', title: 'ap', description: 2017 },
    { id: '116', title: 'aq', description: 2017 },
    { id: '117', title: 'ar', description: 2017 },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: (value) => dispatch(pushLoading(value)),
  setAlert: (value) => dispatch(pushAlert(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSiswa);