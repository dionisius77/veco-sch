import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../../../../components/layout/ActionLayout';
import { Fade } from 'react-reveal';
import MoveableList from '../../../../../components/moveable_list/MoveableList';
import { Grid } from '@material-ui/core';
import { HTTP_SERVICE } from '../../../../../services/HttpServices';

class ListSiswa extends Component {
  newListA;
  newListB;
  idKelas = this.props.match.params.idKelas;
  kapasitas = this.props.match.params.kapasitas;
  constructor(props) {
    super(props);
    this.state = {
      listA: [],
      listB: []
    }
    this.newListA = this.state.listA;
    this.newListB = this.state.listB;
    this.takeAction = this.takeAction.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getDataKelas();
    this.getUnregisteredStudent();
  }

  getDataKelas = async () => {
    const request = {
      collection: 'datasiswa',
      params: 'kelas',
      operator: '==',
      value: this.idKelas,
      lastVisible: '',
      orderBy: 'dataPribadi.nama',
      directions: 'asc',
      limit: 60,
    }
    await HTTP_SERVICE.getFBFilter(request).then(res => {
      if (res.docs.length > 0) {
        res.forEach(doc => {
          this.newListA.push({
            id: doc.id,
            title: doc.data().dataPribadi.nama,
            description: doc.data().regisPesertaDidik.tglMasuk,
          });
        });
        this.setState({ listA: this.newListA });
      }
    }).catch(err => {
      // console.log(err)
    });
  }

  getUnregisteredStudent = async () => {
    const request = {
      collection: 'datasiswa',
      params: 'kelas',
      operator: '==',
      value: '',
      lastVisible: '',
      orderBy: 'dataPribadi.nama',
      directions: 'asc',
      limit: 60,
    }
    await HTTP_SERVICE.getFBFilter(request).then(res => {
      if (res.docs.length > 0) {
        res.forEach(doc => {
          this.newListB.push({
            id: doc.id,
            title: doc.data().dataPribadi.nama,
            description: `Tanggal Masuk ${doc.data().regisPesertaDidik.tglMasuk}`,
          });
        });
        this.setState({ listB: this.newListB });
      }
    }).catch(err => {
      // console.log(err) 
    });
    this.props.setLoading(false);
    this.props.setAlert({
      open: true,
      message: 'Click dan seret siswa untuk memindahkan!',
      type: 'warning'
    })
  }

  takeAction = async (nik, destination, sourceIndex) => {
    let request;
    if (destination === 'droppableA') {
      if (this.state.listA.length < this.kapasitas) {
        request = {
          collection: 'datasiswa',
          doc: nik,
          data: { kelas: this.idKelas },
        }
        let data = this.newListB[sourceIndex];
        this.newListA.unshift(data);
        this.newListB.splice(sourceIndex, 1);
        this.setState({
          listA: this.newListA,
          listB: this.newListB
        });
      } else {
        this.props.setAlert({
          open: true,
          message: 'Kapasitas kelas sudah penuh',
          type: 'error'
        });
      }
    } else if (destination === 'droppableB') {
      request = {
        collection: 'datasiswa',
        doc: nik,
        data: { kelas: '' },
      }
      let data = this.newListA[sourceIndex];
      this.newListB.unshift(data);
      this.newListA.splice(sourceIndex, 1);
      this.setState({
        listA: this.newListA,
        listB: this.newListB
      });
    }
    await HTTP_SERVICE.updateFB(request)
      .then(res => { })
      .catch(err => {
        // console.log(err)
      });
  }

  render() {
    return (
      <Fade right duration={500}>
        <Grid container style={{ marginTop: -30 }}>
          <Grid item xs={12}>
            <h1 style={{ textAlign: 'center' }}>Pendaftaran Siswa Kelas VII-B</h1>
          </Grid>
        </Grid>
        <MoveableList
          listA={this.state.listA}
          titleA={`Data Siswa Kelas VII-B ${this.state.listA.length}/${this.kapasitas}`}
          titleB='Data Siswa Belum Terdaftar'
          listB={this.state.listB}
          takeAction={this.takeAction}
        />
      </Fade>
    )
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setLoading: (value) => dispatch(pushLoading(value)),
  setAlert: (value) => dispatch(pushAlert(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListSiswa);