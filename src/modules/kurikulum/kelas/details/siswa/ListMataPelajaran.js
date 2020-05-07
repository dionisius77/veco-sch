import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../../../../components/layout/ActionLayout';
import { Fade } from 'react-reveal';
import MoveableList from '../../../../../components/moveable_list/MoveableList';
import { Grid } from '@material-ui/core';
import { HTTP_SERVICE } from '../../../../../services/HttpServices';

class InputMataPelajaran extends Component {
  newListA;
  newListB;
  idKelas = this.props.match.params.idKelas;
  constructor(props) {
    super(props);
    this.state = {
      listA: [],
      listB: [],
      dataMP: [],
      dataGuru: [],
    }
    this.newListA = this.state.listA;
    this.newListB = this.state.listB;
    this.takeAction = this.takeAction.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getListMPUnregistered();
  }

  getListMPOnClass = async () => {
    const request = {
      collection: 'datakelas',
      doc: this.idKelas,
      subCollection: 'matapelajaran',
    }
    await HTTP_SERVICE.getFbSubCollection(request)
      .then(async res => {
        if (res.docs.length > 0) {
          res.docs.forEach(e => {
            let tempMP = this.getMPName(e.data().idMataPelajaran, e.data().idStaff);
            this.newListA.push({ id: tempMP.id, title: tempMP.namaMP, description: e.data().staff });
            this.newListB = this.newListB.filter(e => {
              return e.id !== tempMP.id;
            });
          });
          this.props.setLoading(false);
          this.setState({
            listA: this.newListA,
            listB: this.newListB,
          });
          this.props.setAlert({
            open: true,
            message: 'Click dan seret mata pelajaran untuk memindahkan!',
            type: 'warning'
          });
        } else {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Click dan seret mata pelajaran untuk memindahkan!',
            type: 'warning'
          });
        }
      })
      .catch(err => {
        this.props.setLoading(false);
        // console.log(err);
      })
  }

  getListMPUnregistered = async () => {
    const request = {
      collection: 'matapelajaran',
    }
    await HTTP_SERVICE.getFb(request)
      .then(async res => {
        let newDataMP = [];
        res.forEach(doc => {
          newDataMP.push({
            value: doc.id,
            text: doc.data().matapelajaran,
          });
        });
        this.setState({
          dataMP: newDataMP
        });
        await HTTP_SERVICE.getFb({ collection: 'datastaff' })
          .then(async resp => {
            let newDataGuru = [];
            await resp.forEach(e => {
              if (e.data().bidangStudi && e.data().bidangStudi.length > 0) {
                newDataGuru.push({ id: e.id, nama: e.data().nama });
                e.data().bidangStudi.map(val => {
                  let tempMP = this.getMPName(val, e.id);
                  this.newListB.push({
                    id: tempMP.id,
                    title: tempMP.namaMP,
                    description: e.data().nama,
                  });
                })
              }
            });
            this.setState({
              listB: this.newListB,
              dataGuru: newDataGuru,
            }, () => {
              this.getListMPOnClass();
            });
          })
          .catch(err => {
            // console.log(err);
          });
      })
      .catch(err => {
        // console.log(err);
      });
  }

  getMPName = (idMP, idGuru) => {
    let founded = this.state.dataMP.filter(doc => {
      return doc.value === idMP;
    });
    return {
      id: `${founded[0].value}_${idGuru}`,
      namaMP: founded[0].text,
    };
  }

  takeAction = (id, destination, sourceIndex) => {
    this.props.setLoading(true);
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
        let newId = id.split('_');
        let request = {
          collection: 'datakelas',
          doc: this.idKelas,
          subCollection: 'matapelajaran',
          subDoc: id,
          data: {
            idMataPelajaran: newId[0],
            idStaff: newId[1],
            idDoc: id,
            staff: data.description,
            matapelajaran: data.title,
          },
        }
        HTTP_SERVICE.inputFbSubCollection(request)
        .then(res => {
          this.newListA.unshift(data);
          this.newListB.splice(sourceIndex, 1);
          this.setState({
            listA: this.newListA,
            listB: this.newListB
          });
          this.props.setLoading(false);
        })
        .catch(err => {
          // console.log(err);
          this.props.setLoading(false);
        });
      }
    } else if (destination === 'droppableB') {
      let data = this.newListA[sourceIndex];
      const request = {
        collection: 'datakelas',
          doc: this.idKelas,
          subCollection: 'matapelajaran',
          subDoc: id,
      }
      HTTP_SERVICE.deleteFbSubCollection(request)
      .then(res => {
        this.newListB.unshift(data);
        this.newListA.splice(sourceIndex, 1);
        this.setState({
          listA: this.newListA,
          listB: this.newListB
        });
        this.props.setLoading(false);
      })
      .catch(err => {
        // console.log(err);
        this.props.setLoading(false);
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