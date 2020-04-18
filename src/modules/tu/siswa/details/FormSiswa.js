import React, { Component } from 'react';
import { pushLoading } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { Grid, withStyles, Paper, Stepper, StepLabel, StepContent, Step } from '@material-ui/core';
import InputField from '../../../components/input_field/InputField';
import Selects from '../../../components/select/Select';
import Button from '../../../components/button/Button';
import DatePicker from '../../../components/date_picker/DatePicker';

class FormSiswa extends Component {
  newFormSiswa;
  idSiswa = this.props.match.params.idSiswa;
  newSteps;
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      steps: [
        { text: 'Data Pribadi', isComplete: false, submited: false },
        { text: 'Data Ayah Kandung', isComplete: false, submited: false },
        { text: 'Data Ibu Kandung', isComplete: false, submited: false },
        { text: 'Data Wali', isComplete: false, submited: false },
        { text: 'Kontak', isComplete: false, submited: false },
        { text: 'Data Priodik', isComplete: false, submited: false },
        { text: 'Prestasi', isComplete: false, submited: false },
        { text: 'Beasiswa', isComplete: false, submited: false },
        { text: 'Registrasi Peserta Didik', isComplete: false, submited: false },
        { text: 'Pendaftaran Keluar', isComplete: false, submited: false },
      ],
      activeStep: 0,
      pageLoaded: false,
      formSiswa: {
        // datasiswa
        nama: { value: '', isValid: false },
        jenisKelamin: { value: '', isValid: false },
        nisn: { value: '', isValid: false },
        nik: { value: '', isValid: false },
        tempatLahir: { value: '', isValid: false },
        tglLahir: { value: '', isValid: false },
        noAkta: { value: '', isValid: false },
        agama: { value: '', isValid: false },
        kewarganegaraan: { value: '', isValid: false },
        kebutuhanKhusus: { value: '', isValid: false },
        alamat: { value: '', isValid: false },
        rt: { value: '', isValid: false },
        rw: { value: '', isValid: false },
        kelurahan: { value: '', isValid: false },
        kecamatan: { value: '', isValid: false },
        kodePos: { value: '', isValid: false },
        tempatTinggal: { value: '', isValid: false },
        transportasi: { value: '', isValid: false },
        nomorKKS: { value: '', isValid: false },
        anakKe: { value: '', isValid: false },
        penerimaKPS: { value: '', isValid: false },
        noKPS: { value: '', isValid: false },
        punyaKIP: { value: '', isValid: false },
        noKIP: { value: '', isValid: false },
        namaKIP: { value: '', isValid: false },
        alasanPIP: { value: '', isValid: false },
        // data ayah
        ayah: {
          nama: { value: '', isValid: false },
          nik: { value: '', isValid: false },
          tglLahir: { value: '', isValid: false },
          pendidikan: { value: '', isValid: false },
          pekerjaan: { value: '', isValid: false },
          penghasilan: { value: '', isValid: false },
          kebutuhanKhusus: { value: '', isValid: false },
        },
        ibu: {
          nama: { value: '', isValid: false },
          nik: { value: '', isValid: false },
          tglLahir: { value: '', isValid: false },
          pendidikan: { value: '', isValid: false },
          pekerjaan: { value: '', isValid: false },
          penghasilan: { value: '', isValid: false },
          kebutuhanKhusus: { value: '', isValid: false },
        },
        wali: {
          nama: { value: '', isValid: false },
          nik: { value: '', isValid: false },
          tglLahir: { value: '', isValid: false },
          pendidikan: { value: '', isValid: false },
          pekerjaan: { value: '', isValid: false },
          penghasilan: { value: '', isValid: false },
          kebutuhanKhusus: { value: '', isValid: false },
        },
        noTelp: { value: '', isValid: false },
        noHp: { value: '', isValid: false },
        email: { value: '', isValid: false },
        // data rincian peserta didik
        tinggiBadan: { value: '', isValid: false },
        beratBadan: { value: '', isValid: false },
        jarak: { value: '', isValid: false },
        waktuTempuh: {
          jam: { value: '', isValid: false },
          menit: { value: '', isValid: false },
        },
        jumlahSaudara: { value: '', isValid: false },
        jumlahPrestasi: 0,
        prestasi: [],
        beasiswa: [
          {
            jenis: { value: '', isValid: false },
            keterangan: { value: '', isValid: false },
            tahunMulai: { value: '', isValid: false },
            tahunSelesai: { value: '', isValid: false },
          },
          {
            jenis: { value: '', isValid: false },
            keterangan: { value: '', isValid: false },
            tahunMulai: { value: '', isValid: false },
            tahunSelesai: { value: '', isValid: false },
          },
        ],
        // registrasi peserta didik
        kompetensiKeahlian: { value: '', isValid: false }, //khusus smk
        jenisPendaftaran: { value: '', isValid: false },
        nis: { value: '', isValid: false },
        tglMasuk: { value: '', isValid: false },
        asalSekolah: { value: '', isValid: false },
        nomorPesertaUjian: { value: '', isValid: false },
        noIjazah: { value: '', isValid: false },
        noSKHUS: { value: '', isValid: false },
        // bagian ini diisi jika peserta didik keluar
        keluarKarena: { value: '', isValid: false },
        tanggalKeluar: { value: '', isValid: false },
        alasan: { value: '', isValid: false },
      },
      isSubmit: false,
      jumlahPrestasi: 0,
      idSiswa: this.idSiswa,
      buttonDisable: false,
    }
    this.inputFormOnBlur = this.inputFormOnBlur.bind(this);
    this.changeSelect = this.changeSelect.bind(this);
    this.changeBeasiswaSelect = this.changeBeasiswaSelect.bind(this);
    this.changePrestasiSelect = this.changePrestasiSelect.bind(this);
    this.changePrestasi = this.changePrestasi.bind(this);
    this.inputBeasiswaOnBlur = this.inputBeasiswaOnBlur.bind(this);
    this.inputPrestasiOnBlur = this.inputPrestasiOnBlur.bind(this);
    this.dateChange = this.dateChange.bind(this);
    this.saveData = this.saveData.bind(this);
    this.stepClicked = this.stepClicked.bind(this);
    this.getContent = this.getContent.bind(this);
  }

  componentDidMount() {
    this.newSteps = this.state.steps;
    if (this.idSiswa === '0') {
      this.newSteps.pop();
      this.setState({ steps: this.newSteps });
    }
    this.newFormSiswa = this.state.formSiswa;
    this.props.setLoading(false);
    this.setState({ pageLoaded: true });
  }

  inputFormOnBlur = (id, value, isValid) => {
    let newId = id.split('-');
    if (newId.length > 1) {
      this.newFormSiswa[newId[1]][newId[0]].value = value;
      this.newFormSiswa[newId[1]][newId[0]].isValid = isValid;
    } else {
      this.newFormSiswa[id].value = value;
      this.newFormSiswa[id].isValid = isValid;
    }
    this.setState({ formSiswa: this.newFormSiswa });
  }

  changeSelect = (name, value, isValid) => {
    let newName = name.split('-');
    if (newName.length > 1) {
      this.newFormSiswa[newName[1]][newName[0]].value = value;
      this.newFormSiswa[newName[1]][newName[0]].isValid = isValid;
    } else {
      this.newFormSiswa[name].value = value;
      this.newFormSiswa[name].isValid = isValid;
    }
    this.setState({ formSiswa: this.newFormSiswa });
  }

  inputBeasiswaOnBlur = (id, value, isValid) => {
    let newId = id.split('-');
    this.newFormSiswa.beasiswa[newId[1]][newId[0]].value = value;
    this.newFormSiswa.beasiswa[newId[1]][newId[0]].isValid = isValid;
    this.setState({ formSiswa: this.newFormSiswa });
    console.log(this.newbeasiswa)
  }

  changeBeasiswaSelect = (name, value, isValid) => {
    let newName = name.split('-');
    this.newFormSiswa.beasiswa[newName[1]][newName[0]].value = value;
    this.newFormSiswa.beasiswa[newName[1]][newName[0]].isValid = isValid;
    this.setState({ formSiswa: this.newFormSiswa });
    console.log(this.newbeasiswa)
  }

  inputPrestasiOnBlur = (id, value, isValid) => {
    let newId = id.split('-');
    this.newFormSiswa.prestasi[newId[1]][newId[0]].value = value;
    this.newFormSiswa.prestasi[newId[1]][newId[0]].isValid = isValid;
    this.setState({ formSiswa: this.newFormSiswa });
  }

  changePrestasiSelect = (name, value, isValid) => {
    let prestasi = name.split('-');
    this.newFormSiswa.prestasi[prestasi[1]][prestasi[0]].value = value;
    this.newFormSiswa.prestasi[prestasi[1]][prestasi[0]].isValid = isValid;
    this.setState({ formSiswa: this.newFormSiswa });
  }

  changePrestasi = (id, value) => {
    let pushTemplate = value - this.newFormSiswa.prestasi.length;
    this.newFormSiswa.jumlahPrestasi = value;
    if (pushTemplate > 0) {
      for (let i = 0; i < pushTemplate; i++) {
        this.newFormSiswa['prestasi'].push({
          jenis: { value: '', isValid: false },
          tingkat: { value: '', isValid: false },
          namaPrestasi: { value: '', isValid: false },
          tahun: { value: '', isValid: false },
          penyelenggara: { value: '', isValid: false },
          peringkat: { value: '', isValid: false },
        });
      }
    } else {
      for (let i = 0; i < 0 - pushTemplate; i++) {
        this.newFormSiswa.prestasi.pop();
      }
    }
    this.setState({ formSiswa: this.newFormSiswa });
  }

  dateChange = (id, value, isValid) => {
    let newId = id.split('-');
    if (newId.length > 1) {
      this.newFormSiswa[newId[1]][newId[0]].value = value;
      this.newFormSiswa[newId[1]][newId[0]].isValid = isValid;
    } else {
      this.newFormSiswa[id].value = value;
      this.newFormSiswa[id].isValid = isValid;
    }
    this.setState({ formSiswa: this.newFormSiswa });
  }

  saveData = () => {
    this.setState({ isSubmit: true });
    console.log(this.state.formSiswa);
  }

  stepClicked = (index) => {
    this.setState({ activeStep: index });
  }

  nextStep = (index) => {
    const {
      formSiswa,
    } = this.state;
    const {
      ayah,
      ibu,
      waktuTempuh,
    } = this.state.formSiswa;
    this.newSteps[index].submited = true;
    this.setState({ steps: this.newSteps });
    let isValid = false;
    switch (index) {
      case 0:
        if (
          formSiswa.nama.isValid && formSiswa.jenisKelamin.isValid && formSiswa.nisn.isValid &&
          formSiswa.nik.isValid && formSiswa.tempatLahir.isValid && formSiswa.tglLahir.isValid &&
          formSiswa.noAkta.isValid && formSiswa.agama.isValid && formSiswa.kewarganegaraan.isValid &&
          formSiswa.kebutuhanKhusus.isValid && formSiswa.alamat.isValid && formSiswa.rt.isValid &&
          formSiswa.rw.isValid && formSiswa.kodePos.isValid && formSiswa.kelurahan.isValid &&
          formSiswa.kecamatan.isValid && formSiswa.tempatTinggal.isValid && formSiswa.transportasi.isValid &&
          formSiswa.anakKe.isValid && formSiswa.penerimaKPS.isValid && formSiswa.punyaKIP.isValid
        ) {
          if (formSiswa.penerimaKPS.value === 'tidak' && formSiswa.punyaKIP.value === 'tidak') {
            isValid = true;
          } else {
            isValid = (formSiswa.noKPS.isValid) || (formSiswa.noKIP.isValid && formSiswa.namaKIP.isValid);
          }
        }
        break;

      case 1:
        isValid = (
          ayah.nama.isValid && ayah.nik.isValid && ayah.tglLahir.isValid &&
          ayah.pendidikan.isValid && ayah.pekerjaan.isValid && ayah.penghasilan.isValid &&
          ayah.kebutuhanKhusus.isValid
        );
        break;

      case 2:
        isValid = (
          ibu.nama.isValid && ibu.nik.isValid && ibu.tglLahir.isValid &&
          ibu.pendidikan.isValid && ibu.pekerjaan.isValid && ibu.penghasilan.isValid &&
          ibu.kebutuhanKhusus.isValid
        );
        break;

      case 3:
        isValid = true;
        break;

      case 4:
        isValid = (formSiswa.email.isValid && formSiswa.noHp.isValid);
        break;

      case 5:
        isValid = (
          formSiswa.tinggiBadan.isValid && formSiswa.beratBadan.isValid &&
          waktuTempuh.jam.isValid && waktuTempuh.jam.isValid &&
          formSiswa.jumlahSaudara.isValid && formSiswa.jarak.isValid
        )
        break;

      case 6:
        isValid = true;
        break;

      case 7:
        isValid = true;
        break;

      case 8:
        isValid = (
          formSiswa.nis.isValid && formSiswa.asalSekolah.isValid &&
          formSiswa.asalSekolah.isValid && formSiswa.noIjazah.isValid &&
          formSiswa.jenisPendaftaran.isValid && formSiswa.tglMasuk.isValid &&
          formSiswa.noSKHUS.isValid
        );
        break;

      case 9:
        isValid = (
          formSiswa.keluarKarena.isValid && formSiswa.tanggalKeluar.isValid &&
          formSiswa.alasan.isValid
        )
        break;

      default:
        break;
    }
    if (isValid) {
      this.newSteps[index].isComplete = true;
      this.setState({ activeStep: index + 1, steps: this.newSteps });
    }
    this.getStatusFinish();
  }

  getContent = (index) => {
    const {
      formSiswa,
      steps
    } = this.state;
    const {
      ayah,
      ibu,
      wali,
      waktuTempuh,
      beasiswa,
      prestasi,
    } = this.state.formSiswa;
    const {
      agama,
      jenisKelamin,
      kebutuhanKhusus,
      tempatTinggal,
      transportasi,
      pendidikan,
      pekerjaan,
      penghasilan,
      keluarKarena,
      punyaKIP,
      alasanPIP,
      jarak,
      jenisPrestasi,
      tingkatPrestasi,
      jenisBeasiswa,
      jenisPendaftaran,
      penerimaKPS,
    } = this.props;
    switch (index) {
      case 0:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='nama' label='Nama Lengkap' required={true} type="text" value={formSiswa.nama.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              <InputField id='nisn' label='NISN' required={true} type="number" value={formSiswa.nisn.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='tempatLahir' label='Tempat Lahir' required={true} type="text" value={formSiswa.tempatLahir.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='noAkta' label='No. Akta' required={true} type="number" value={formSiswa.noAkta.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='kewarganegaraan' label='Kewarganegaraan' required={true} type="text" value={formSiswa.kewarganegaraan.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='alamat' label='Alamat' required={true} type="text" value={formSiswa.alamat.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='kelurahan' label='Kelurahan / Desa' required={true} type="text" value={formSiswa.kelurahan.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <Selects name='tempatTinggal' id='tempatTinggal' label='Tempat Tinggal' variant='outlined' options={tempatTinggal} value={formSiswa.tempatTinggal.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <InputField id='nomorKKS' label='Nomor KKS' required={false} type="number" value={formSiswa.nomorKKS.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <Selects name='penerimaKPS' id='penerimaKPS' label='Penerima KPS/PKH' variant='outlined' options={penerimaKPS} value={formSiswa.penerimaKPS.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <Selects name='punyaKIP' id='punyaKIP' label='Apakah punya KIP?' variant='outlined' options={punyaKIP} value={formSiswa.punyaKIP.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
                </Grid>
                <Grid item xs={4}>
                  {formSiswa.punyaKIP.value === 'ya' &&
                    <InputField id='noKIP' label='No. KIP' required={true} type="number" value={formSiswa.noKIP.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                  }
                </Grid>
              </Grid>
              {formSiswa.punyaKIP.value === 'ya' &&
                <InputField id='namaKIP' label='Nama tertera di KIP' required={true} type="text" value={formSiswa.namaKIP.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              }
            </Grid>
            <Grid item xs>
              <Selects name='jenisKelamin' id='jenisKelamin' label='Jenis Kelamin' variant='outlined' options={jenisKelamin} value={formSiswa.jenisKelamin.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <InputField id='nik' label='NIK' required={true} type="number" value={formSiswa.nik.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <DatePicker id='tglLahir' label='Tanggal Lahir' required={true} value={formSiswa.tglLahir.value} onChange={this.dateChange} isSubmit={steps[index].submited} />
              <Selects name='agama' id='agama' label='Agama' variant='outlined' options={agama} value={formSiswa.agama.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <Selects name='kebutuhanKhusus' id='kebutuhanKhusus' label='Kebutuhan Khusus' variant='outlined' options={kebutuhanKhusus} value={formSiswa.kebutuhanKhusus.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <InputField id='rt' label='RT' required={true} type="number" value={formSiswa.rt.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                </Grid>
                <Grid item xs={3}>
                  <InputField id='rw' label='RW' required={true} type="number" value={formSiswa.rw.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                </Grid>
                <Grid item xs={3}>
                  <InputField id='kodePos' label='Kode Pos' required={true} type="number" value={formSiswa.kodePos.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                </Grid>
              </Grid>
              <InputField id='kecamatan' label='Kecamatan' required={true} type="text" value={formSiswa.kecamatan.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <Selects name='transportasi' id='transportasi' label='Moda Transportasi' variant='outlined' options={transportasi} value={formSiswa.transportasi.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <InputField id='anakKe' label='Anak-ke' required={true} type="number" value={formSiswa.anakKe.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              {formSiswa.penerimaKPS.value === 'ya' &&
                <InputField id='noKPS' label='No. KPS/PKH' required={true} type="number" value={formSiswa.noKPS.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              }
              <Selects name='alasanPIP' id='alasanPIP' label='Alasan layak PIP' variant='outlined' options={alasanPIP} value={formSiswa.alasanPIP.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      case 1:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='nama-ayah' label='Nama' required={true} type="text" value={ayah.nama.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              <DatePicker id='tglLahir-ayah' label='Tanggal Lahir' required={true} value={ayah.tglLahir.value} onChange={this.dateChange} isSubmit={steps[index].submited} />
              <Selects name='pekerjaan-ayah' id='pekerjaan-ayah' label='Pekerjaan' variant='outlined' options={pekerjaan} value={ayah.pekerjaan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <Selects name='kebutuhanKhusus-ayah' id='kebutuhanKhusus-ayah' label='Kebutuhan Khusus' variant='outlined' options={kebutuhanKhusus} value={ayah.kebutuhanKhusus.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
            </Grid>
            <Grid item xs>
              <InputField id='nik-ayah' label='NIK' required={true} type="number" value={ayah.nik.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <Selects name='pendidikan-ayah' id='pendidikan-ayah' label='Pendidikan' variant='outlined' options={pendidikan} value={ayah.pendidikan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <Selects name='penghasilan-ayah' id='penghasilan-ayah' label='Penghasilan' variant='outlined' options={penghasilan} value={ayah.penghasilan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      case 2:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='nama-ibu' label='Nama' required={true} type="text" value={ibu.nama.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              <DatePicker id='tglLahir-ibu' label='Tanggal Lahir' required={true} value={ibu.tglLahir.value} onChange={this.dateChange} isSubmit={steps[index].submited} />
              <Selects name='pekerjaan-ibu' id='pekerjaan-ibu' label='Pekerjaan' variant='outlined' options={pekerjaan} value={ibu.pekerjaan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <Selects name='kebutuhanKhusus-ibu' id='kebutuhanKhusus-ibu' label='Kebutuhan Khusus' variant='outlined' options={kebutuhanKhusus} value={ibu.kebutuhanKhusus.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
            </Grid>
            <Grid item xs>
              <InputField id='nik-ibu' label='NIK' required={true} type="number" value={ibu.nik.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <Selects name='pendidikan-ibu' id='pendidikan-ibu' label='Pendidikan' variant='outlined' options={pendidikan} value={ibu.pendidikan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <Selects name='penghasilan-ibu' id='penghasilan-ibu' label='Penghasilan' variant='outlined' options={penghasilan} value={ibu.penghasilan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      case 3:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='nama-wali' label='Nama' required={false} type="text" value={wali.nama.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              <DatePicker id='tglLahir-wali' label='Tanggal Lahir' required={false} value={wali.tglLahir.value} onChange={this.dateChange} isSubmit={steps[index].submited} />
              <Selects name='pekerjaan-wali' id='pekerjaan-wali' label='Pekerjaan' variant='outlined' options={pekerjaan} value={wali.pekerjaan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={false} />
              <Selects name='kebutuhanKhusus-wali' id='kebutuhanKhusus-wali' label='Kebutuhan Khusus' variant='outlined' options={kebutuhanKhusus} value={wali.kebutuhanKhusus.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={false} />
            </Grid>
            <Grid item xs>
              <InputField id='nik-wali' label='NIK' required={false} type="number" value={wali.nik.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <Selects name='pendidikan-wali' id='pendidikan-wali' label='Pendidikan' variant='outlined' options={pendidikan} value={wali.pendidikan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={false} />
              <Selects name='penghasilan-wali' id='penghasilan-wali' label='Penghasilan' variant='outlined' options={penghasilan} value={wali.penghasilan.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={false} />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      case 4:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='noTelp' label='No telepon Rumah' required={false} type="number" value={formSiswa.noTelp.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              <InputField id='email' label='email' required={true} type="email" value={formSiswa.email.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
            </Grid>
            <Grid item xs>
              <InputField id='noHp' label='No Hand Phone' required={true} type="number" value={formSiswa.noHp.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      case 5:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <InputField id='tinggiBadan' label='Tinggi Badan' required={true} type="number" value={formSiswa.tinggiBadan.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
                </Grid>
                <Grid item xs={3}>
                  <InputField id='beratBadan' label='Berat Badan' required={true} type="number" value={formSiswa.beratBadan.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <h4>Waktu Tempuh ke Sekolah</h4>
                </Grid>
                <Grid item xs={3}>
                  <InputField id='jam-waktuTempuh' label='Jam' required={true} type="number" value={waktuTempuh.jam.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                </Grid>
                <Grid item xs={3}>
                  <InputField id='menit-waktuTempuh' label='Menit' required={true} type="number" value={waktuTempuh.menit.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Selects name='jarak' id='jarak' label='Jarak Penerima KPS/PKH ke Sekolah' variant='outlined' options={jarak} value={formSiswa.jarak.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <InputField id='jumlahSaudara' label='Jumlah Saudara' required={true} type="number" value={formSiswa.jumlahSaudara.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      case 6:
        return (
          <div>
            <Grid container spacing={0}>
              <Grid item xs={3}>
                <InputField id='jumlahPrestasi' label='Jumlah Prestasi' required={false} type="number" value={formSiswa.jumlahPrestasi} disabled={false} onChange={this.changePrestasi} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              </Grid>
              {
                formSiswa.jumlahPrestasi === 0 &&
                <Grid item xs>
                  <div style={{ display: 'flex', marginTop: 30 }}>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
                  </div>
                </Grid>
              }
            </Grid>
            {formSiswa.jumlahPrestasi > 0
              ?
              prestasi.map((val, i) => {
                let jenis = `jenis-${i}`;
                let tingkat = `tingkat-${i}`;
                let nama = `namaPrestasi-${i}`;
                let penyelenggara = `penyelenggara-${i}`;
                let tahun = `tahun-${i}`;
                let peringkat = `peringkat-${i}`;
                return (
                  <Grid container spacing={5} key={i}>
                    <Grid item xs>
                      <Selects name={jenis} id={jenis} label='Jenis Prestasi' variant='outlined' options={jenisPrestasi} value={prestasi[i].jenis.value} onChange={this.changePrestasiSelect} isSubmit={steps[index].submited} disable={false} required={false} />
                      <InputField id={nama} label='Nama Prestasi' required={false} type="text" value={prestasi[i].namaPrestasi.value} disabled={false} onBlur={this.inputPrestasiOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                      <Grid container spacing={1}>
                        <Grid item xs={3}>
                          <InputField id={tahun} label='Tahun' required={false} type="number" value={prestasi[i].tahun.value} disabled={false} onBlur={this.inputPrestasiOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                        </Grid>
                        <Grid item xs={3}>
                          <InputField id={peringkat} label='Peringkat ke-' required={false} type="number" value={prestasi[i].peringkat.value} disabled={false} onBlur={this.inputPrestasiOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <Selects name={tingkat} id={tingkat} label='Jenis Prestasi' variant='outlined' options={tingkatPrestasi} value={prestasi[i].tingkat.value} onChange={this.changePrestasiSelect} isSubmit={steps[index].submited} disable={false} required={false} />
                      <InputField id={penyelenggara} label='Penyelenggara' required={false} type="text" value={prestasi[i].penyelenggara.value} disabled={false} onBlur={this.inputPrestasiOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                      {i === prestasi.length - 1 &&
                        <div style={{ display: 'flex', marginTop: 30 }}>
                          <div style={{ flexGrow: 1 }}></div>
                          <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
                        </div>
                      }
                    </Grid>
                  </Grid>
                )
              })
              :
              <div></div>
            }
          </div>
        )

      case 7:
        return beasiswa.map((val, i) => {
          let jenis = `jenis-${i}`;
          let keterangan = `keterangan-${i}`;
          let tahunMulai = `tahunMulai-${i}`;
          let tahunSelesai = `tahunSelesai-${i}`;
          return (
            <Grid container spacing={5} key={i}>
              <Grid item xs>
                <Selects name={jenis} id={jenis} label='Jenis Beasiswa' variant='outlined' options={jenisBeasiswa} value={beasiswa[i].jenis.value} onChange={this.changeBeasiswaSelect} isSubmit={steps[index].submited} disable={false} required={false} />
                <Grid container spacing={1}>
                  <Grid item xs={4}>
                    <InputField id={tahunMulai} label='Tahun Mulai' required={false} type="number" value={beasiswa[i].tahunMulai.value} disabled={false} onBlur={this.inputBeasiswaOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                  </Grid>
                  <Grid item xs={4}>
                    <InputField id={tahunSelesai} label='Tahun Selesai' required={false} type="number" value={beasiswa[i].tahunSelesai.value} disabled={false} onBlur={this.inputBeasiswaOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs>
                <InputField id={keterangan} label='Keterangan' required={false} type="text" value={beasiswa[i].keterangan.value} disabled={false} onBlur={this.inputBeasiswaOnBlur} isSubmit={steps[index].submited} variant='outlined' />
                {i === beasiswa.length - 1 &&
                  <div style={{ display: 'flex', marginTop: 30 }}>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
                  </div>
                }
              </Grid>
            </Grid>
          )
        });

      case 8:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <InputField id='kompetensiKeahlian' label='Kompetensi Keahlian (SMK)' required={false} type="text" value={formSiswa.kompetensiKeahlian.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              <InputField id='nis' label='NIS' required={true} type="number" value={formSiswa.nis.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='asalSekolah' label='Asal Sekolah' required={true} type="text" value={formSiswa.asalSekolah.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='noIjazah' label='No. Seri Ijazah' required={true} type="number" value={formSiswa.noIjazah.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
            </Grid>
            <Grid item xs>
              <Selects name='jenisPendaftaran' id='jenisPendaftaran' label='Jenis Pendaftaran' variant='outlined' options={jenisPendaftaran} value={formSiswa.jenisPendaftaran.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <InputField id='tglMasuk' label='Tanggal Masuk Sekolah' required={true} type="text" value={formSiswa.tglMasuk.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='nomorPesertaUjian' label='Nomor Peserta Ujian' required={true} type="number" value={formSiswa.nomorPesertaUjian.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='noSKHUS' label='No. Seri SKHUS' required={true} type="number" value={formSiswa.noSKHUS.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      case 9:
        return (
          <Grid container spacing={5}>
            <Grid item xs>
              <Selects name='keluarKarena' id='keluarKarena' label='Keluar Karena' variant='outlined' options={keluarKarena} value={formSiswa.keluarKarena.value} onChange={this.changeSelect} isSubmit={steps[index].submited} disable={false} required={true} />
              <DatePicker id='tanggalKeluar' label='Tanggal Keluar' required={true} value={formSiswa.tanggalKeluar.value} onChange={this.dateChange} isSubmit={steps[index].submited} />
            </Grid>
            <Grid item xs>
              <InputField id='alasan' label='Alasan Keluar' required={true} type="text" value={formSiswa.alasan.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Lanjut' onClick={() => { this.nextStep(index) }} />
              </div>
            </Grid>
          </Grid>
        )

      default:
        break;
    }
  }

  getStatusFinish = () => {
    const { steps } = this.state;
    let finish = (
      steps[0].isComplete && steps[1].isComplete &&
      steps[2].isComplete && steps[3].isComplete &&
      steps[4].isComplete && steps[5].isComplete &&
      steps[6].isComplete && steps[7].isComplete &&
      steps[8].isComplete &&
      (steps[9].isComplete || this.idSiswa === '0')
    );
    this.setState({ finished: finish });
  }

  render() {
    const {
      pageLoaded,
      activeStep,
      steps,
      finished
    } = this.state;
    return (
      <Paper style={{ padding: 5 }}>
        <Fade right opposite when={pageLoaded} duration={500}>
          <div>
            <h1 style={{
              textAlign: 'center',
              paddingBottom: 10
            }}>
              Form Pendaftaran Siswa
          </h1>
            <Stepper activeStep={activeStep} orientation='vertical'>
              {
                steps.map((step, index) => {
                  return (
                    <Step key={step.text}>
                      <StepLabel
                        onClick={() => this.stepClicked(index)}
                        completed={step.isComplete}
                      >
                        <h3>{step.text}</h3>
                      </StepLabel>
                      <StepContent>
                        {this.getContent(index)}
                      </StepContent>
                    </Step>
                  )
                })
              }
            </Stepper>
            {
              finished &&
              <div style={{ margin: 20 }}>
                <Grid container>
                  <Grid item xs>
                    <p>
                      Semua form sudah di isi. Silahkan check kembali data yang sudah anda input atau click finish jika data sudah benar.
              </p>
                  </Grid>
                  <Grid item xs>
                    <div style={{ display: 'flex', marginTop: 30 }}>
                      <div style={{ flexGrow: 1 }}></div>
                      <Button type='default' disabled={false} text='Selesai' onClick={() => { console.log('finish') }} />
                    </div>
                  </Grid>
                </Grid>
              </div>
            }
          </div>
        </Fade>
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  jenisKelamin: [
    { value: 'l', text: 'Laki - laki' },
    { value: 'p', text: 'Perempuan' },
  ],
  agama: [
    { value: 1, text: 'Islam' },
    { value: 2, text: 'Kristen / Protestan' },
    { value: 3, text: 'Khatolik' },
    { value: 4, text: 'Hindu' },
    { value: 5, text: 'Budha' },
    { value: 6, text: 'Kong hu chu' },
    { value: 7, text: 'Kepercayaan Kepada Tuhan YME' },
  ],
  kebutuhanKhusus: [
    { value: 1, text: 'Tidak' },
    { value: 2, text: 'Netra' },
    { value: 3, text: 'Rungu' },
    { value: 4, text: 'Grahita Ringan' },
    { value: 5, text: 'Grahita Sedang' },
    { value: 6, text: 'Daksa Ringan' },
    { value: 7, text: 'Daksa Sedang' },
    { value: 8, text: 'Laras' },
    { value: 9, text: 'Wicara' },
    { value: 10, text: 'Tuna Ganda' },
    { value: 11, text: 'Hiperaktif' },
    { value: 12, text: 'Cerdas Istimewa' },
    { value: 13, text: 'Bakat Istimewa' },
    { value: 14, text: 'Kesulitan Belajar' },
    { value: 15, text: 'Indigo' },
    { value: 16, text: 'Down Sindrome' },
    { value: 17, text: 'Autis' },
  ],
  tempatTinggal: [
    { value: 1, text: 'Bersama Orang Tua' },
    { value: 2, text: 'Wali' },
    { value: 3, text: 'Kos' },
    { value: 4, text: 'Asrama' },
    { value: 5, text: 'Panti Asuhan' },
    { value: 99, text: 'Lainnya' },
  ],
  transportasi: [
    { value: 1, text: 'Jalan Kaki' },
    { value: 2, text: 'Kendaraan Pribadi' },
    { value: 3, text: 'Kendaraan Umum / Angkot / Pete-pete' },
    { value: 4, text: 'Jemputan Sekolah' },
    { value: 5, text: 'Kereta Api' },
    { value: 6, text: 'Ojek' },
    { value: 7, text: 'Andong / Bendi / Sado / Dokar / Delman / Beca' },
    { value: 8, text: 'Perahu Penyebrangan / Rakit / Getek' },
    { value: 99, text: 'Lainnya' },
  ],
  pendidikan: [
    { value: 1, text: 'Tidak Sekolah' },
    { value: 2, text: 'Putus SD' },
    { value: 3, text: 'SD Sederajat' },
    { value: 4, text: 'SMP Sederajat' },
    { value: 5, text: 'SMA Sederajat' },
    { value: 6, text: 'D1' },
    { value: 7, text: 'D2' },
    { value: 8, text: 'D3' },
    { value: 9, text: 'D4 / S1' },
    { value: 10, text: 'S2' },
    { value: 11, text: 'S3' },
  ],
  pekerjaan: [
    { value: 1, text: 'Tidak Bekerja' },
    { value: 2, text: 'Nelayan' },
    { value: 3, text: 'Petani' },
    { value: 4, text: 'Peternak' },
    { value: 5, text: 'PNS / TNI / Polri' },
    { value: 6, text: 'Karyawan Swasta' },
    { value: 7, text: 'Pedagang Kecil' },
    { value: 8, text: 'Pedagang Besar' },
    { value: 9, text: 'Wiraswasta' },
    { value: 10, text: 'Wirausaha' },
    { value: 11, text: 'Buruh' },
    { value: 12, text: 'Pensiunan' },
    { value: 13, text: 'Tenaga Kerja Indonesia' },
    { value: 14, text: 'Tidak dapat diterapkan' },
    { value: 15, text: 'Sudah Meninggal' },
    { value: 99, text: 'Lainnya' },
  ],
  penghasilan: [
    { value: 1, text: 'Kurang dari Rp. 1.000.000' },
    { value: 2, text: 'Rp. 1.000.000 - Rp. 2.000.000' },
    { value: 3, text: 'Lebih dari Rp. 2.000.000' },
    { value: 4, text: 'Kurang dari Rp. 500.000' },
    { value: 5, text: 'Rp. 500.000 - Rp. 999.999' },
    { value: 6, text: 'Rp. 1.000.000 - Rp. 1.999.999' },
    { value: 7, text: 'Rp. 2.000.000 - Rp. 4.999.999' },
    { value: 8, text: 'Rp. 5.000.000 - Rp. 20.000.000' },
    { value: 9, text: 'Lebih dari Rp. 20.000.000' },
    { value: 10, text: 'Tidak Berpenghasilan' },
    { value: 99, text: 'Lainnya' },
  ],
  keluarKarena: [
    { value: 1, text: 'Lulus' },
    { value: 2, text: 'Mutasi' },
    { value: 3, text: 'Dikeluarkan' },
    { value: 4, text: 'Mengundurkan Diri' },
    { value: 5, text: 'Putus Sekolah' },
    { value: 6, text: 'Wafat' },
    { value: 7, text: 'Hilang' },
    { value: 8, text: 'Lainnya' },
  ],
  punyaKIP: [
    { value: 'ya', text: 'Ya' },
    { value: 'tidak', text: 'Tidak' },
  ],
  alasanPIP: [
    { value: 1, text: 'Daerah Konflik' },
    { value: 2, text: 'Dampak Bencana Alam' },
    { value: 3, text: 'Kelainan Fisik' },
    { value: 4, text: 'Pernah Drop Out' },
    { value: 5, text: 'Keluarga Pidana / Berada di LAPAS' },
    { value: 6, text: 'Pemegang PKH/PKS/KKS' },
    { value: 7, text: 'Siswa Miskin / Rentan Miskin' },
    { value: 8, text: 'Yatim Piatu / Panti Asuhan / Panti Sosial' },
  ],
  jarak: [
    { value: 'Kurang Dari 1 Km', text: 'Kurang Dari 1 Km' },
    { value: 'Lebih Dari 1 Km', text: 'Lebih Dari 1 Km' }
  ],
  jenisPrestasi: [
    { value: 'Sains', text: 'Sains' },
    { value: 'Seni', text: 'Seni' },
    { value: 'Olahraga', text: 'Olahraga' },
    { value: 'Lain - lain', text: 'Lain - lain' },
  ],
  tingkatPrestasi: [
    { value: 'Sekolah', text: 'Sekolah' },
    { value: 'Kecamatan', text: 'Kecamatan' },
    { value: 'Kabupaten', text: 'Kabupaten' },
    { value: 'Provinsi', text: 'Provinsi' },
    { value: 'Nasional', text: 'Nasional' },
    { value: 'International', text: 'International' },
  ],
  jenisBeasiswa: [
    { value: 'Anak berprestasi', text: 'Anak berprestasi' },
    { value: 'Anak kurang mampu', text: 'Anak kurang mampu' },
    { value: 'Pendidikan', text: 'Pendidikan' },
    { value: 'Unggulan', text: 'Unggulan' },
    { value: 'Lain - lain', text: 'Lain - lain' },
  ],
  jenisPendaftaran: [
    { value: 'Siswa Baru', text: 'Siswa Baru' },
    { value: 'Pindahan', text: 'Pindahan' },
    { value: 'Kembali Bersekolah', text: 'Kembali Bersekolah' },
  ],
  penerimaKPS: [
    { value: 'tidak', text: 'Tidak' },
    { value: 'ya', text: 'Ya' },
  ]
});

const useStyles = (theme) => ({
  titleHeader: {
    background: theme.palette.secondary.main
  }
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(FormSiswa));