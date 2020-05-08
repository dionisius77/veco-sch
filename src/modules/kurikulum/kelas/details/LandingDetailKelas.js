import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../../../components/layout/ActionLayout';
import CardsWithPeople from '../../../../components/cards/Card';
import { Grid } from '@material-ui/core';
import DataTables from '../../../../components/data_tables/DataTables';
import { Fade } from 'react-reveal';
import Modals from '../../../../components/modal/Modal';
import Selects from '../../../../components/select/Select';
import { HTTP_SERVICE } from '../../../../services/HttpServices';

class LandingDetailKelas extends Component {
  idKelas = this.props.match.params.idKelas;
  kapasitas = this.props.match.params.kapasitas;
  constructor(props) {
    super(props);
    this.state = {
      pageLoaded: false,
      openModal: false,
      formGuru: '',
      optGuru: [],
      dataWali: {},
      dataTablesMataPelajaran: [],
      dataSiswa: [],
    }
    this.handleChangeButton = this.handleChangeButton.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.setState({ pageLoaded: true });
    this.getDataGuru();
    this.getDataSiswa();
  }

  getDataSiswa = async () => {
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
      let newDataSiswa = [];
      if (res.docs.length > 0) {
        res.forEach(doc => {
          newDataSiswa.push({ uniqueId: doc.id, nis: doc.id, nama: doc.data().dataPribadi.nama });
        });
        this.setState({ dataSiswa: newDataSiswa });
      }
    }).catch(err => { console.log(err) });
    this.getDataMataPelajaran();
  }

  getDataMataPelajaran = () => {
    let newDataMaPel = [];
    const request = {
      collection: 'datakelas',
      doc: this.idKelas,
      subCollection: 'matapelajaran'
    }
    HTTP_SERVICE.getFbSubCollection(request)
      .then(res => {
        if (res.docs.length > 0) {
          res.docs.forEach(e => {
            newDataMaPel.push({ uniqueId: e.id, matapelajaran: e.data().matapelajaran, nama: e.data().staff });
          });
          this.setState({ dataTablesMataPelajaran: newDataMaPel });
          this.props.setLoading(false);
        } else {
          this.props.setLoading(false);
        }
      })
      .catch(err => {
        this.props.setLoading(false);
        // console.log(err);
      })
  }

  getDataGuru = async () => {
    const request = {
      collection: 'datastaff',
      params: 'wali',
      operator: '==',
      value: this.idKelas,
      lastVisible: '',
      orderBy: 'nama',
      directions: 'asc',
      limit: 1
    }
    await HTTP_SERVICE.getFBFilter(request).then(res => {
      if (res.docs.length > 0) {
        res.forEach(doc => {
          this.setState({
            dataWali: {
              image: doc.data().image || '',
              nama: doc.data().nama,
              id: doc.id
            }
          });
        });
      } else {
        this.setState({
          dataWali: {
            image: '',
            nama: '',
          }
        });
      }
    }).catch(err => {
      // console.log(err);
    });
  }

  handleChangeButton = async () => {
    if (this.state.optGuru.length > 0) {
      this.setState({
        openModal: true
      });
    } else {
      this.props.setLoading(true);
      await HTTP_SERVICE.getFb({ collection: 'datastaff' }).then(res => {
        let optionGuru = []
        res.forEach(doc => {
          optionGuru.push({ value: doc.id, text: doc.data().nama });
        });
        this.setState({ optGuru: optionGuru });
        this.props.setLoading(false);
      }).catch(err => {
        this.props.setLoading(false);
        // console.log(err);
      })
      this.setState({
        openModal: true
      });
    }
  }

  goToSiswa = () => {
    this.setState({
      pageLoaded: false
    }, () => {
      setTimeout(() => {
        window.location.hash = `#/school/list_siswa_kelas/${this.idKelas}/${this.kapasitas}`
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

  inputOnChange = (id, value, isValid) => {
    this.setState({ formGuru: value });
  }

  closeModal = () => {
    this.setState({ openModal: false });
  }

  submitModal = async () => {
    if (this.state.formGuru !== '') {
      this.setState({ openModal: false });
      this.props.setLoading(true);
      const requestCheck = {
        collection: 'datastaff',
        params: 'nik',
        operator: '==',
        value: this.state.formGuru,
        lastVisible: '',
        orderBy: 'nama',
        directions: 'asc',
        limit: 1
      }
      await HTTP_SERVICE.getFBFilter(requestCheck).then(async res => {
        if (res.docs.length > 0) {
          let wali, nama, id, image;
          res.forEach(element => {
            image = element.data().image || '';
            wali = element.data().wali || '';
            nama = element.data().nama;
            id = element.id;
          });
          if (wali === '') {
            const request = {
              collection: 'datastaff',
              doc: this.state.formGuru,
              data: {
                wali: this.idKelas,
                author: this.props.userProfile.email,
                authorId: this.props.userProfile.author
              }
            }
            await HTTP_SERVICE.updateFB(request).then(async resp => {
              await HTTP_SERVICE.updateFB({
                collection: 'datakelas',
                doc: this.idKelas,
                data: {
                  wali: this.state.formGuru,
                  author: this.props.userProfile.email,
                  authorId: this.props.userProfile.author,
                }
              }).then(res => {
                this.props.setAlert({
                  message: `${nama} sebagai wali kelas ${this.idKelas}`,
                  open: true,
                  type: 'success',
                });
                this.setState({
                  dataWali: {
                    image: image,
                    nama: nama,
                    id: id
                  }
                });
              }).catch(err => {
                // console.log(err)
              });
            }).catch(err => {
              this.props.setAlert({
                message: `Merubah wali kelas gagal`,
                open: true,
                type: 'error',
              });
            });
          } else {
            this.props.setAlert({
              message: `${nama} sudah menjadi wali kelas di kelas lain`,
              open: true,
              type: 'error',
            });
          }
        }
      }).catch(err => {
        // console.log(err);
      })
    }
    this.props.setLoading(false);
  }

  handleDelete = async () => {
    this.props.setLoading(true);
    const request = {
      collection: 'datastaff',
      doc: this.state.dataWali.id,
      data: {
        wali: '',
      }
    }
    await HTTP_SERVICE.updateFB(request).then(async resp => {
      await HTTP_SERVICE.updateFB({
        collection: 'datakelas',
        doc: this.idKelas,
        data: {
          wali: '',
          author: this.props.userProfile.email,
          authorId: this.props.userProfile.author,
        }
      }).then(res => { })
      .catch(err => {
        // console.log(err)
      });
      this.setState({
        dataWali: {
          image: '',
          nama: '',
          author: this.props.userProfile.email,
          authorId: this.props.userProfile.author,
        }
      });
      this.props.setAlert({
        message: `Wali kelas ${this.idKelas} berhasil di hapus`,
        open: true,
        type: 'success',
      });
    }).catch(err => {
      // console.log(err);
    });
    this.props.setLoading(false);
  }

  render() {
    const {
      dataWali
    } = this.state;
    return (
      <Fade right opposite cascade duration={500} when={this.state.pageLoaded}>
        <div>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <CardsWithPeople
                image={dataWali.image || ''}
                nama={dataWali.nama || ''}
                changeButton={() => this.handleChangeButton()}
                onDeleteWali={() => this.handleDelete()}
              />
            </Grid>
            <Grid item xs onClick={this.goToSiswa}>
              <DataTables
                tableName='Data Siswa'
                page={0}
                dataLength={0}
                headCells={this.props.headCellsSiswa}
                data={this.state.dataSiswa}
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
                dataLength={0}
                headCells={this.props.headCellsMataPelajaran}
                data={this.state.dataTablesMataPelajaran}
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
        <Modals
          modalTitle='Pilih Wali Kelas'
          open={this.state.openModal}
          onCloseModal={() => this.closeModal()}
          onSubmitModal={() => this.submitModal()}
          type="confirm"
        >
          <div style={{ width: 300 }}>
            <Selects name='guru' id='guru' label='Guru' variant='outlined' options={this.state.optGuru} value={this.state.formGuru} onChange={this.inputOnChange} isSubmit={false} disable={false} required={true} />
          </div>
        </Modals>
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
    { id: 'nis', numeric: false, disablePadding: true, label: 'NIS' },
    { id: 'nama', numeric: false, disablePadding: true, label: 'Nama' },
  ],
  headCellsMataPelajaran: [
    { id: 'matapelajaran', numeric: false, disablePadding: true, label: 'Mata Pelajaran' },
    { id: 'nama', numeric: true, disablePadding: false, label: 'Guru' },
  ],
  optGuru: [
    { value: 'dion', text: 'Dion' },
    { value: 'yoshi', text: 'Yoshi' },
  ],
  userProfile: state.layout.resAuth,
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingDetailKelas)