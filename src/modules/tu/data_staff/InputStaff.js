import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { Paper, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import InputField from '../../../components/input_field/InputField';
import Selects from '../../../components/select/Select';
import DatePicker from '../../../components/date_picker/DatePicker';
import SelectMultiple from '../../../components/select/SelectMultiple';
import Button from '../../../components/button/Button';
import { HTTP_SERVICE } from '../../../services/HttpServices';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';

class InputStaff extends Component {
  idStaff = this.props.match.params.idStaff;
  newFormGuru;
  constructor(props) {
    super(props);
    this.state = {
      formGuru: {
        nama: { value: '', isValid: false },
        bidangStudi: { value: [], isValid: false },
        tempatLahir: { value: '', isValid: false },
        tanggalLahir: { value: '', isValid: false },
        pendidikanTerakhir: { value: '', isValid: false },
        jurusan: { value: '', isValid: false },
        tahun: { value: '', isValid: false },
        jabatan: { value: [], isValid: false },
        masaKerja: { value: '', isValid: false },
        status: { value: '', isValid: false },
        tanggalSK: { value: '', isValid: false },
        email: { value: '', isValid: false },
        nik: { value: '', isValid: false },
      },
      isSubmit: false,
      finish: false,
      optBidangStudi: []
    }
    this.inputOnChange = this.inputOnChange.bind(this);
    this.newFormGuru = this.state.formGuru;
  }

  componentDidMount() {
    this.props.onLoading(true);
    this.getBidangStudi();
    if (this.idStaff !== '0') {
      this.getDataStaff();
    }
  }

  getDataStaff = async () => {
    const request = {
      collection: 'datastaff',
      doc: this.idStaff
    }
    await HTTP_SERVICE.getFb(request).then(async res => {
      let doc = res.data();
      this.newFormGuru.nama.value = doc.nama;
      this.newFormGuru.nama.isValid = true;
      this.newFormGuru.tempatLahir.value = doc.tempatLahir;
      this.newFormGuru.tempatLahir.isValid = true;
      this.newFormGuru.tanggalLahir.value = doc.tanggalLahir;
      this.newFormGuru.tanggalLahir.isValid = true;
      let jabatan = [];
      if(typeof(doc.jabatan) === 'string'){
        jabatan.push(doc.jabatan);
      } else {
        jabatan = doc.jabatan;
      }
      this.newFormGuru.jabatan.value = jabatan;
      this.newFormGuru.jabatan.isValid = true;
      this.newFormGuru.pendidikanTerakhir.value = doc.pendidikanTerakhir;
      this.newFormGuru.pendidikanTerakhir.isValid = true;
      this.newFormGuru.jurusan.value = doc.jurusan;
      this.newFormGuru.jurusan.isValid = true;
      this.newFormGuru.tahun.value = doc.tahun;
      this.newFormGuru.tahun.isValid = true;
      this.newFormGuru.bidangStudi.value = doc.bidangStudi;
      this.newFormGuru.bidangStudi.isValid = true;
      this.newFormGuru.masaKerja.value = doc.masaKerja;
      this.newFormGuru.masaKerja.isValid = true;
      this.newFormGuru.status.value = doc.status;
      this.newFormGuru.status.isValid = true;
      this.newFormGuru.nik.value = doc.nik;
      this.newFormGuru.nik.isValid = true;
      this.newFormGuru.tanggalSK.value = doc.tanggalSK;
      this.newFormGuru.tanggalSK.isValid = true;
      this.newFormGuru.email.value = doc.email;
      this.newFormGuru.email.isValid = true;
      this.setState({ formGuru: this.newFormGuru })
    }).catch(err => {
      // console.log(err)
    });
  }

  getBidangStudi = async () => {
    const request = {
      collection: 'matapelajaran'
    }
    await HTTP_SERVICE.getFb(request).then(async res => {
      let tempBidangStudi = [{
        value: '',
        text: 'None'
      }];
      res.forEach(data => {
        tempBidangStudi.push({
          value: data.id,
          text: data.data().matapelajaran
        })
      });
      this.setState({ optBidangStudi: tempBidangStudi });
      this.props.onLoading(false);
    }).catch(err => {
      // console.log(err)
    });
  }

  inputOnChange = (id, value, isValid) => {
    this.newFormGuru[id].value = value;
    this.newFormGuru[id].isValid = isValid;
    if (id === 'jabatan') {

    }
    this.setState({ formGuru: this.newFormGuru });
  }

  onSubmit = () => {
    const { formGuru } = this.state;
    // console.log(formGuru)
    this.setState({ isSubmit: true });
    if (
      (formGuru.jabatan.value === 'KTU' || formGuru.jabatan.value === 'STU' || formGuru.jabatan.value === 'pembina umum')
    ) {
      this.newFormGuru.bidangStudi.isValid = true;
      this.newFormGuru.bidangStudi.value = [];
      this.setState({ formGuru: this.newFormGuru });
    } else {
      this.newFormGuru.bidangStudi.isValid = this.newFormGuru.bidangStudi.value.length !== 0;
      this.setState({ formGuru: this.newFormGuru });
    }
    if (formGuru.status.value !== 'GT') {
      this.newFormGuru.tanggalSK.isValid = true;
      this.newFormGuru.tanggalSK.value = '';
      this.setState({ formGuru: this.newFormGuru });
    } else {
      this.newFormGuru.tanggalSK.isValid = this.newFormGuru.tanggalSK.value !== '';
      this.setState({ formGuru: this.newFormGuru });
    }
    if (
      formGuru.nama.isValid && formGuru.jabatan.isValid && formGuru.tempatLahir.isValid &&
      formGuru.tanggalLahir.isValid && formGuru.pendidikanTerakhir.isValid && formGuru.jurusan.isValid &&
      formGuru.tahun.isValid && formGuru.masaKerja.isValid && formGuru.status.isValid && formGuru.bidangStudi.isValid &&
      formGuru.tanggalSK.isValid && formGuru.email.isValid && formGuru.nik.isValid
    ) {
      this.props.onLoading(true);
      this.sendData();
    } else {
      // console.log('blm lengkap')
    }
  }

  sendData = async () => {
    const { formGuru } = this.state;
    const request = {
      collection: 'datastaff',
      doc: formGuru.nik.value,
      data: {
        nama: formGuru.nama.value,
        jabatan: formGuru.jabatan.value,
        tempatLahir: formGuru.tempatLahir.value,
        tanggalLahir: formGuru.tanggalLahir.value,
        pendidikanTerakhir: formGuru.pendidikanTerakhir.value,
        jurusan: formGuru.jurusan.value,
        tahun: formGuru.tahun.value,
        masaKerja: formGuru.masaKerja.value,
        status: formGuru.status.value,
        bidangStudi: (formGuru.jabatan.value === 'KTU' || formGuru.jabatan.value === 'STU' || formGuru.jabatan.value === 'pembina umum') ? [] : formGuru.bidangStudi.value,
        tanggalSK: formGuru.status.value !== 'GT' ? '' : formGuru.tanggalSK.value,
        email: formGuru.email.value,
        nik: formGuru.nik.value,
        author: this.props.userProfile.email,
        authorId: this.props.userProfile.author,
      }
    }
    await HTTP_SERVICE.inputFb(request).then(res => {
      this.daftarAccount(formGuru.email.value, formGuru.nik.value, formGuru.jabatan.value);
      this.props.onSetAlert({
        open: true,
        message: 'Data berhasil diinput',
        type: 'success'
      });
      window.location.hash = '#/school/data_staff';
    }).catch(err => {
      this.props.onSetAlert({
        open: true,
        message: 'Data gagal diinput',
        type: 'warning'
      });
      this.props.onLoading(false);
    });
  }
  
  daftarAccount = (email, password, role) => {
    HTTP_SERVICE.registerAcc({
      email: email,
      password: password,
      role: role,
    })
    this.props.onLoading(false);
  }

  render() {
    const {
      formGuru,
      isSubmit,
      optBidangStudi
    } = this.state;
    const {
      optPendidikanTerakhir,
      optJabatan,
      optStatus
    } = this.props;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 5 }}>
          <div>
            <h1 style={{
              textAlign: 'center',
              paddingBottom: 10
            }}>
              Form Pendaftaran Guru
            </h1>
          </div>
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='nama' label='Nama Lengkap' required={true} type="text" value={formGuru.nama.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
              <InputField id='tempatLahir' label='Tempat Lahir' required={true} type="text" value={formGuru.tempatLahir.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
              <Selects name='pendidikanTerakhir' id='pendidikanTerakhir' label='Pendidikan Terakhir' variant='outlined' options={optPendidikanTerakhir} value={formGuru.pendidikanTerakhir.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
              {(formGuru.jabatan.value !== 'KTU' && formGuru.jabatan.value !== 'STU' && formGuru.jabatan.value !== 'pembina umum') &&
                <SelectMultiple name='bidangStudi' id='bidangStudi' label='Bidang Studi' variant='outlined' options={optBidangStudi} value={formGuru.bidangStudi.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
              }
              {
                formGuru.status.value === 'GT' &&
                <DatePicker id='tanggalSK' label='Tanggal SK' required={true} value={formGuru.tanggalSK.value} onChange={this.inputOnChange} isSubmit={isSubmit} />
              }
              <InputField id='nik' label='NIP' required={true} type="text" value={formGuru.nik.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
            </Grid>
            <Grid item xs>
              <SelectMultiple name='jabatan' id='jabatan' label='Tugas tambahan' variant='outlined' options={optJabatan} value={formGuru.jabatan.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
              <DatePicker id='tanggalLahir' label='Tanggal Lahir' required={true} value={formGuru.tanggalLahir.value} onChange={this.inputOnChange} isSubmit={isSubmit} />
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <InputField id='jurusan' label='Jurusan' required={true} type="text" value={formGuru.jurusan.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
                </Grid>
                <Grid item xs>
                  <InputField id='tahun' label='Tahun' required={true} type="text" value={formGuru.tahun.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <InputField id='masaKerja' label='Masa Kerja' required={true} type="number" value={formGuru.masaKerja.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
                </Grid>
                <Grid item xs>
                  <Selects name='status' id='status' label='Status' variant='outlined' options={optStatus} value={formGuru.status.value} onChange={this.inputOnChange} isSubmit={isSubmit} disable={false} required={true} />
                </Grid>
              </Grid>
              <InputField id='email' label='Email' required={true} type="email" value={formGuru.email.value} disabled={false} onBlur={this.inputOnChange} isSubmit={isSubmit} variant='outlined' setFocus={true} />
            </Grid>
          </Grid>
          <div style={{ margin: 10 }}>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item xs={2}>
                <div style={{ display: 'flex', marginTop: 10 }}>
                  <div style={{ flexGrow: 1 }}></div>
                  <Button type='default' disabled={false} text='Selesai' onClick={() => { this.onSubmit() }} />
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Fade>
    )
  }
}

const mapStateToProps = state => {
  // console.log(state);
  return {
    optPendidikanTerakhir: state.layout.resMasterData.pendidikan,
    optJabatan: [
      { value: 'none', text: 'Tidak Ada' },
      { value: 'kepsek', text: 'Kepala Sekolah' },
      { value: 'kurikulum', text: 'Sie. Kurikulum' },
      { value: 'KTU', text: 'Kepala TU' },
      { value: 'STU', text: 'Staff TU' },
      { value: 'PU', text: 'Pembina Umum' },
      { value: 'kesiswaan', text: 'Sie. Kesiswaan' },
      { value: 'BK', text: 'BK / BP' },
      { value: 'humas', text: 'Humas' },
    ],
    optStatus: [
      { value: 'GT', text: 'Tetap' },
      { value: 'GTT', text: 'Tidak Tetap' },
    ],
    userProfile: state.layout.resAuth,
  }
}

const mapDispatchToProps = dispatch => ({
  onLoading: value => dispatch(pushLoading(value)),
  onSetAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputStaff);