import React, { Component } from 'react';
import { pushLoading } from '../../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Fade } from 'react-reveal';
import { Grid, withStyles, Paper, Stepper, StepLabel, StepContent, Step } from '@material-ui/core';
import InputField from '../../../../components/input_field/InputField';
import Selects from '../../../../components/select/Select';
import Button from '../../../../components/button/Button';
import DatePicker from '../../../../components/date_picker/DatePicker';
import { HTTP_SERVICE } from '../../../../services/HttpServices';

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
        emailOrtu: { value: '', isValid: false },
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
      agama: [],
      jenisKelamin: [],
      kebutuhanKhusus: [],
      tempatTinggal: [],
      transportasi: [],
      pendidikan: [],
      pekerjaan: [],
      penghasilan: [],
      keluarKarena: [],
      punyaKIP: [],
      alasanPIP: [],
      jarak: [],
      jenisPrestasi: [],
      tingkatPrestasi: [],
      jenisBeasiswa: [],
      jenisPendaftaran: [],
      penerimaKPS: [],
      active: false,
      serverStep: 0
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
    this.props.setLoading(true);
    this.newSteps = this.state.steps;
    if (this.idSiswa === '0') {
      this.newSteps.pop();
      this.setState({ steps: this.newSteps });
      this.props.setLoading(false);
      this.setState({ pageLoaded: true });
    } else {
      this.getData();
    }
    this.newFormSiswa = this.state.formSiswa;
  }

  getData = async () => {
    const request = {
      collection: 'datasiswa',
      doc: this.idSiswa
    }
    await HTTP_SERVICE.getFb(request).then(res => {
      const data = res.data();
      this.newFormSiswa['nama'].value = data.dataPribadi.nama;
      this.newFormSiswa['jenisKelamin'].value = data.dataPribadi.jenisKelamin;
      this.newFormSiswa['nisn'].value = data.dataPribadi.nisn;
      this.newFormSiswa['nik'].value = data.dataPribadi.nik;
      this.newFormSiswa['tempatLahir'].value = data.dataPribadi.tempatLahir;
      this.newFormSiswa['tglLahir'].value = data.dataPribadi.tglLahir;
      this.newFormSiswa['noAkta'].value = data.dataPribadi.noAkta;
      this.newFormSiswa['agama'].value = data.dataPribadi.agama;
      this.newFormSiswa['kewarganegaraan'].value = data.dataPribadi.kewarganegaraan;
      this.newFormSiswa['kebutuhanKhusus'].value = data.dataPribadi.kebutuhanKhusus;
      this.newFormSiswa['alamat'].value = data.dataPribadi.alamat;
      this.newFormSiswa['rt'].value = data.dataPribadi.rt;
      this.newFormSiswa['rw'].value = data.dataPribadi.rw;
      this.newFormSiswa['kelurahan'].value = data.dataPribadi.kelurahan;
      this.newFormSiswa['kecamatan'].value = data.dataPribadi.kecamatan;
      this.newFormSiswa['kodePos'].value = data.dataPribadi.kodePos;
      this.newFormSiswa['tempatTinggal'].value = data.dataPribadi.tempatTinggal;
      this.newFormSiswa['transportasi'].value = data.dataPribadi.transportasi;
      this.newFormSiswa['nomorKKS'].value = data.dataPribadi.nomorKKS;
      this.newFormSiswa['anakKe'].value = data.dataPribadi.anakKe;
      this.newFormSiswa['penerimaKPS'].value = data.dataPribadi.penerimaKPS;
      this.newFormSiswa['noKPS'].value = data.dataPribadi.noKPS;
      this.newFormSiswa['punyaKIP'].value = data.dataPribadi.punyaKIP;
      this.newFormSiswa['noKIP'].value = data.dataPribadi.noKIP;
      this.newFormSiswa['namaKIP'].value = data.dataPribadi.namaKIP;
      this.newFormSiswa['alasanPIP'].value = data.dataPribadi.alasanPIP;
      this.newFormSiswa['nama'].isValid = data.dataPribadi.nama !== '' && data.dataPribadi.nama !== undefined;
      this.newFormSiswa['jenisKelamin'].isValid = data.dataPribadi.jenisKelamin !== '' && data.dataPribadi.jenisKelamin !== undefined;
      this.newFormSiswa['nisn'].isValid = data.dataPribadi.nisn !== '' && data.dataPribadi.nisn !== undefined;
      this.newFormSiswa['nik'].isValid = data.dataPribadi.nik !== '' && data.dataPribadi.nik !== undefined;
      this.newFormSiswa['tempatLahir'].isValid = data.dataPribadi.tempatLahir !== '' && data.dataPribadi.tempatLahir !== undefined;
      this.newFormSiswa['tglLahir'].isValid = data.dataPribadi.tglLahir !== '' && data.dataPribadi.tglLahir !== undefined;
      this.newFormSiswa['noAkta'].isValid = data.dataPribadi.noAkta !== '' && data.dataPribadi.noAkta !== undefined;
      this.newFormSiswa['agama'].isValid = data.dataPribadi.agama !== '' && data.dataPribadi.agama !== undefined;
      this.newFormSiswa['kewarganegaraan'].isValid = data.dataPribadi.kewarganegaraan !== '' && data.dataPribadi.kewarganegaraan !== undefined;
      this.newFormSiswa['kebutuhanKhusus'].isValid = data.dataPribadi.kebutuhanKhusus !== '' && data.dataPribadi.kebutuhanKhusus !== undefined;
      this.newFormSiswa['alamat'].isValid = data.dataPribadi.alamat !== '' && data.dataPribadi.alamat !== undefined;
      this.newFormSiswa['rt'].isValid = data.dataPribadi.rt !== '' && data.dataPribadi.rt !== undefined;
      this.newFormSiswa['rw'].isValid = data.dataPribadi.rw !== '' && data.dataPribadi.rw !== undefined;
      this.newFormSiswa['kelurahan'].isValid = data.dataPribadi.kelurahan !== '' && data.dataPribadi.kelurahan !== undefined;
      this.newFormSiswa['kecamatan'].isValid = data.dataPribadi.kecamatan !== '' && data.dataPribadi.kecamatan !== undefined;
      this.newFormSiswa['kodePos'].isValid = data.dataPribadi.kodePos !== '' && data.dataPribadi.kodePos !== undefined;
      this.newFormSiswa['tempatTinggal'].isValid = data.dataPribadi.tempatTinggal !== '' && data.dataPribadi.tempatTinggal !== undefined;
      this.newFormSiswa['transportasi'].isValid = data.dataPribadi.transportasi !== '' && data.dataPribadi.transportasi !== undefined;
      this.newFormSiswa['nomorKKS'].isValid = data.dataPribadi.nomorKKS !== '' && data.dataPribadi.nomorKKS !== undefined;
      this.newFormSiswa['anakKe'].isValid = data.dataPribadi.anakKe !== '' && data.dataPribadi.anakKe !== undefined;
      this.newFormSiswa['penerimaKPS'].isValid = data.dataPribadi.penerimaKPS !== '' && data.dataPribadi.penerimaKPS !== undefined;
      this.newFormSiswa['noKPS'].isValid = data.dataPribadi.noKPS !== '' && data.dataPribadi.noKPS !== undefined;
      this.newFormSiswa['punyaKIP'].isValid = data.dataPribadi.punyaKIP !== '' && data.dataPribadi.punyaKIP !== undefined;
      this.newFormSiswa['noKIP'].isValid = data.dataPribadi.noKIP !== '' && data.dataPribadi.noKIP !== undefined;
      this.newFormSiswa['namaKIP'].isValid = data.dataPribadi.namaKIP !== '' && data.dataPribadi.namaKIP !== undefined;
      this.newFormSiswa['alasanPIP'].isValid = data.dataPribadi.alasanPIP !== '' && data.dataPribadi.alasanPIP !== undefined;

      if (data.dataAyah) {
        this.newFormSiswa['ayah']['nama'].value = data.dataAyah.nama;
        this.newFormSiswa['ayah']['nik'].value = data.dataAyah.nik;
        this.newFormSiswa['ayah']['tglLahir'].value = data.dataAyah.tglLahir;
        this.newFormSiswa['ayah']['pendidikan'].value = data.dataAyah.pendidikan;
        this.newFormSiswa['ayah']['pekerjaan'].value = data.dataAyah.pekerjaan;
        this.newFormSiswa['ayah']['penghasilan'].value = data.dataAyah.penghasilan;
        this.newFormSiswa['ayah']['kebutuhanKhusus'].value = data.dataAyah.kebutuhanKhusus;
        this.newFormSiswa['ayah']['nama'].isValid = data.dataAyah.nama !== '' && data.dataAyah.nama !== undefined;
        this.newFormSiswa['ayah']['nik'].isValid = data.dataAyah.nik !== '' && data.dataAyah.nik !== undefined;
        this.newFormSiswa['ayah']['tglLahir'].isValid = data.dataAyah.tglLahir !== '' && data.dataAyah.tglLahir !== undefined;
        this.newFormSiswa['ayah']['pendidikan'].isValid = data.dataAyah.pendidikan !== '' && data.dataAyah.pendidikan !== undefined;
        this.newFormSiswa['ayah']['pekerjaan'].isValid = data.dataAyah.pekerjaan !== '' && data.dataAyah.pekerjaan !== undefined;
        this.newFormSiswa['ayah']['penghasilan'].isValid = data.dataAyah.penghasilan !== '' && data.dataAyah.penghasilan !== undefined;
        this.newFormSiswa['ayah']['kebutuhanKhusus'].isValid = data.dataAyah.kebutuhanKhusus !== '' && data.dataAyah.kebutuhanKhusus !== undefined;
      }
      if (data.dataIbu) {
        this.newFormSiswa['ibu']['nama'].value = data.dataIbu.nama;
        this.newFormSiswa['ibu']['nik'].value = data.dataIbu.nik;
        this.newFormSiswa['ibu']['tglLahir'].value = data.dataIbu.tglLahir;
        this.newFormSiswa['ibu']['pendidikan'].value = data.dataIbu.pendidikan;
        this.newFormSiswa['ibu']['pekerjaan'].value = data.dataIbu.pekerjaan;
        this.newFormSiswa['ibu']['penghasilan'].value = data.dataIbu.penghasilan;
        this.newFormSiswa['ibu']['kebutuhanKhusus'].value = data.dataIbu.kebutuhanKhusus;
        this.newFormSiswa['ibu']['nama'].isValid = data.dataIbu.nama !== '' && data.dataIbu.nama !== undefined;
        this.newFormSiswa['ibu']['nik'].isValid = data.dataIbu.nik !== '' && data.dataIbu.nik !== undefined;
        this.newFormSiswa['ibu']['tglLahir'].isValid = data.dataIbu.tglLahir !== '' && data.dataIbu.tglLahir !== undefined;
        this.newFormSiswa['ibu']['pendidikan'].isValid = data.dataIbu.pendidikan !== '' && data.dataIbu.pendidikan !== undefined;
        this.newFormSiswa['ibu']['pekerjaan'].isValid = data.dataIbu.pekerjaan !== '' && data.dataIbu.pekerjaan !== undefined;
        this.newFormSiswa['ibu']['penghasilan'].isValid = data.dataIbu.penghasilan !== '' && data.dataIbu.penghasilan !== undefined;
        this.newFormSiswa['ibu']['kebutuhanKhusus'].isValid = data.dataIbu.kebutuhanKhusus !== '' && data.dataIbu.kebutuhanKhusus !== undefined;
      }
      if (data.dataWali) {
        this.newFormSiswa['wali']['nama'].value = data.dataWali.nama;
        this.newFormSiswa['wali']['nik'].value = data.dataWali.nik;
        this.newFormSiswa['wali']['tglLahir'].value = data.dataWali.tglLahir;
        this.newFormSiswa['wali']['pendidikan'].value = data.dataWali.pendidikan;
        this.newFormSiswa['wali']['pekerjaan'].value = data.dataWali.pekerjaan;
        this.newFormSiswa['wali']['penghasilan'].value = data.dataWali.penghasilan;
        this.newFormSiswa['wali']['kebutuhanKhusus'].value = data.dataWali.kebutuhanKhusus;
        this.newFormSiswa['wali']['nama'].isValid = data.dataWali.nama !== '' && data.dataWali.nama !== undefined;
        this.newFormSiswa['wali']['nik'].isValid = data.dataWali.nik !== '' && data.dataWali.nik !== undefined;
        this.newFormSiswa['wali']['tglLahir'].isValid = data.dataWali.tglLahir !== '' && data.dataWali.tglLahir !== undefined;
        this.newFormSiswa['wali']['pendidikan'].isValid = data.dataWali.pendidikan !== '' && data.dataWali.pendidikan !== undefined;
        this.newFormSiswa['wali']['pekerjaan'].isValid = data.dataWali.pekerjaan !== '' && data.dataWali.pekerjaan !== undefined;
        this.newFormSiswa['wali']['penghasilan'].isValid = data.dataWali.penghasilan !== '' && data.dataWali.penghasilan !== undefined;
        this.newFormSiswa['wali']['kebutuhanKhusus'].isValid = data.dataWali.kebutuhanKhusus !== '' && data.dataWali.kebutuhanKhusus !== undefined;
      }

      if (data.kontak) {
        this.newFormSiswa['noTelp'].value = data.kontak.noTelp;
        this.newFormSiswa['noHp'].value = data.kontak.noHp;
        this.newFormSiswa['emailOrtu'].value = data.kontak.emailOrtu;
        this.newFormSiswa['email'].value = data.kontak.email;
        this.newFormSiswa['noTelp'].isValid = data.kontak.noTelp !== '' && data.kontak.noTelp !== undefined;
        this.newFormSiswa['noHp'].isValid = data.kontak.noHp !== '' && data.kontak.noHp !== undefined;
        this.newFormSiswa['emailOrtu'].isValid = data.kontak.emailOrtu !== '' && data.kontak.emailOrtu !== undefined;
        this.newFormSiswa['email'].isValid = data.kontak.email !== '' && data.kontak.email !== undefined;
      }

      if (data.dataPriodik) {
        this.newFormSiswa['tinggiBadan'].value = data.dataPriodik.tinggiBadan;
        this.newFormSiswa['beratBadan'].value = data.dataPriodik.beratBadan;
        this.newFormSiswa['jumlahSaudara'].value = data.dataPriodik.jumlahSaudara;
        this.newFormSiswa['jarak'].value = data.dataPriodik.jarak;
        this.newFormSiswa['waktuTempuh']['jam'].value = data.dataPriodik.waktuTempuh.jam;
        this.newFormSiswa['waktuTempuh']['menit'].value = data.dataPriodik.waktuTempuh.menit;
        this.newFormSiswa['tinggiBadan'].isValid = data.dataPriodik.tinggiBadan !== '';
        this.newFormSiswa['beratBadan'].isValid = data.dataPriodik.beratBadan !== '';
        this.newFormSiswa['jumlahSaudara'].isValid = data.dataPriodik.jumlahSaudara !== '';
        this.newFormSiswa['jarak'].isValid = data.dataPriodik.jarak !== '';
        this.newFormSiswa['waktuTempuh']['jam'].isValid = data.dataPriodik.waktuTempuh.jam !== '';
        this.newFormSiswa['waktuTempuh']['menit'].isValid = data.dataPriodik.waktuTempuh.menit !== '';
      }

      if (data.prestasi && data.prestasi.length > 0) {
        this.newFormSiswa.jumlahPrestasi = data.prestasi.length;
        for (let i = 0; i < data.prestasi.length; i++) {
          this.newFormSiswa['prestasi'].push({
            jenis: { value: data.prestasi[i].jenis, isValid: true },
            tingkat: { value: data.prestasi[i].tingkat, isValid: true },
            namaPrestasi: { value: data.prestasi[i].namaPrestasi, isValid: true },
            tahun: { value: data.prestasi[i].tahun, isValid: true },
            penyelenggara: { value: data.prestasi[i].penyelenggara, isValid: true },
            peringkat: { value: data.prestasi[i].peringkat, isValid: true },
          });
        }
      }

      if (data.beasiswa && data.beasiswa.length > 0) {
        for (let i = 0; i < data.beasiswa.length; i++) {
          this.newFormSiswa['beasiswa'][i].jenis.value = data.beasiswa[i].jenis;
          this.newFormSiswa['beasiswa'][i].keterangan.value = data.beasiswa[i].keterangan;
          this.newFormSiswa['beasiswa'][i].tahunMulai.value = data.beasiswa[i].tahunMulai;
          this.newFormSiswa['beasiswa'][i].tahunSelesai.value = data.beasiswa[i].tahunSelesai;
        }
      }

      if (data.regisPesertaDidik) {
        this.newFormSiswa['kompetensiKeahlian'].value = data.regisPesertaDidik.kompetensiKeahlian;
        this.newFormSiswa['nis'].value = data.regisPesertaDidik.nis;
        this.newFormSiswa['asalSekolah'].value = data.regisPesertaDidik.asalSekolah;
        this.newFormSiswa['noIjazah'].value = data.regisPesertaDidik.noIjazah;
        this.newFormSiswa['nomorPesertaUjian'].value = data.regisPesertaDidik.nomorPesertaUjian;
        this.newFormSiswa['jenisPendaftaran'].value = data.regisPesertaDidik.jenisPendaftaran;
        this.newFormSiswa['tglMasuk'].value = data.regisPesertaDidik.tglMasuk;
        this.newFormSiswa['noSKHUS'].value = data.regisPesertaDidik.noSKHUS;
        this.newFormSiswa['nis'].isValid = true;
        this.newFormSiswa['asalSekolah'].isValid = true;
        this.newFormSiswa['noIjazah'].isValid = true;
        this.newFormSiswa['nomorPesertaUjian'].isValid = true;
        this.newFormSiswa['jenisPendaftaran'].isValid = true;
        this.newFormSiswa['tglMasuk'].isValid = true;
        this.newFormSiswa['noSKHUS'].isValid = true;
      }

      this.props.setLoading(false);
      for (let i = 0; i <= data.step; i++) {
        this.newSteps[i].isComplete = true;
        this.newSteps[i].submited = true;
      }
      if (!data.activeStudent) {
        this.newSteps.pop();
        this.setState({ active: false });
      }
      this.setState({
        formSiswa: this.newFormSiswa,
        pageLoaded: true,
        steps: this.newSteps,
        activeStep: data.step + 1,
        serverStep: data.step,
      }, () => {
        this.getStatusFinish();
      });
    }).catch(err => {
      // console.log(err)
    });
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
    // console.log(this.newbeasiswa)
  }

  changeBeasiswaSelect = (name, value, isValid) => {
    let newName = name.split('-');
    this.newFormSiswa.beasiswa[newName[1]][newName[0]].value = value;
    this.newFormSiswa.beasiswa[newName[1]][newName[0]].isValid = isValid;
    this.setState({ formSiswa: this.newFormSiswa });
    // console.log(this.newbeasiswa)
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
    // console.log(this.state.formSiswa);
  }

  stepClicked = (index) => {
    this.setState({ activeStep: index });
  }

  nextStep = async (index) => {
    this.props.setLoading(true);
    const {
      formSiswa,
      serverStep,
    } = this.state;
    const {
      wali,
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
            const requestDataSiswa = {
              collection: 'datasiswa',
              doc: formSiswa.nik.value.toString(),
              data: {
                dataPribadi: {
                  nama: formSiswa.nama.value,
                  jenisKelamin: formSiswa.jenisKelamin.value,
                  nisn: formSiswa.nisn.value.toString(),
                  nik: formSiswa.nik.value.toString(),
                  tempatLahir: formSiswa.tempatLahir.value,
                  tglLahir: formSiswa.tglLahir.value,
                  noAkta: formSiswa.noAkta.value.toString(),
                  agama: formSiswa.agama.value,
                  kewarganegaraan: formSiswa.kewarganegaraan.value,
                  kebutuhanKhusus: formSiswa.kebutuhanKhusus.value,
                  alamat: formSiswa.alamat.value,
                  rt: formSiswa.rt.value,
                  rw: formSiswa.rw.value,
                  kelurahan: formSiswa.kelurahan.value,
                  kecamatan: formSiswa.kecamatan.value,
                  kodePos: formSiswa.kodePos.value,
                  tempatTinggal: formSiswa.tempatTinggal.value,
                  transportasi: formSiswa.transportasi.value,
                  nomorKKS: formSiswa.nomorKKS.value.toString(),
                  anakKe: formSiswa.anakKe.value,
                  penerimaKPS: formSiswa.penerimaKPS.value,
                  noKPS: '',
                  punyaKIP: formSiswa.punyaKIP.value,
                  noKIP: '',
                  namaKIP: '',
                  alasanPIP: formSiswa.alasanPIP.value,
                },
                step: serverStep >= index ? serverStep : index,
                lulus: false,
                author: this.props.userProfile.email,
                authorId: this.props.userProfile.author,
              }
            }
            if (this.idSiswa === '0') {
              await HTTP_SERVICE.inputFb(requestDataSiswa).then(res => {
                isValid = true;
              }).catch(err => {
                isValid = false;
              });
            } else {
              await HTTP_SERVICE.updateFB(requestDataSiswa).then(res => {
                isValid = true;
              }).catch(err => {
                isValid = false;
              });
            }
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
        if (
          ayah.nama.isValid && ayah.nik.isValid && ayah.tglLahir.isValid &&
          ayah.pendidikan.isValid && ayah.pekerjaan.isValid && ayah.penghasilan.isValid &&
          ayah.kebutuhanKhusus.isValid
        ) {
          const requestDataAyah = {
            collection: 'datasiswa',
            doc: formSiswa.nik.value.toString(),
            data: {
              dataAyah: {
                nama: ayah.nama.value,
                nik: ayah.nik.value,
                tglLahir: ayah.tglLahir.value,
                pendidikan: ayah.pendidikan.value,
                pekerjaan: ayah.pekerjaan.value,
                penghasilan: ayah.penghasilan.value,
                kebutuhanKhusus: ayah.kebutuhanKhusus.value,
              },
              step: serverStep >= index ? serverStep : index,
              author: this.props.userProfile.email,
              authorId: this.props.userProfile.author,
            }
          }
          await HTTP_SERVICE.updateFB(requestDataAyah).then(res => {
            isValid = true;
          }).catch(err => {
            isValid = false;
          });
        }
        break;

      case 2:
        isValid = (
          ibu.nama.isValid && ibu.nik.isValid && ibu.tglLahir.isValid &&
          ibu.pendidikan.isValid && ibu.pekerjaan.isValid && ibu.penghasilan.isValid &&
          ibu.kebutuhanKhusus.isValid
        );
        if (
          ibu.nama.isValid && ibu.nik.isValid && ibu.tglLahir.isValid &&
          ibu.pendidikan.isValid && ibu.pekerjaan.isValid && ibu.penghasilan.isValid &&
          ibu.kebutuhanKhusus.isValid
        ) {
          const requestDataIbu = {
            collection: 'datasiswa',
            doc: formSiswa.nik.value.toString(),
            data: {
              dataIbu: {
                nama: ibu.nama.value,
                nik: ibu.nik.value,
                tglLahir: ibu.tglLahir.value,
                pendidikan: ibu.pendidikan.value,
                pekerjaan: ibu.pekerjaan.value,
                penghasilan: ibu.penghasilan.value,
                kebutuhanKhusus: ibu.kebutuhanKhusus.value,
              },
              step: serverStep >= index ? serverStep : index,
              author: this.props.userProfile.email,
              authorId: this.props.userProfile.author,
            }
          }
          await HTTP_SERVICE.updateFB(requestDataIbu).then(res => {
            isValid = true;
          }).catch(err => {
            isValid = false;
          });
        }
        break;

      case 3:
        const requestDataWali = {
          collection: 'datasiswa',
          doc: formSiswa.nik.value.toString(),
          data: {
            dataWali: {
              nama: wali.nama.value,
              nik: wali.nik.value,
              tglLahir: wali.tglLahir.value,
              pendidikan: wali.pendidikan.value,
              pekerjaan: wali.pekerjaan.value,
              penghasilan: wali.penghasilan.value,
              kebutuhanKhusus: wali.kebutuhanKhusus.value,
            },
            step: serverStep >= index ? serverStep : index,
            author: this.props.userProfile.email,
            authorId: this.props.userProfile.author,
          }
        }
        await HTTP_SERVICE.updateFB(requestDataWali).then(res => {
          isValid = true;
        }).catch(err => {
          isValid = false;
        });
        break;

      case 4:
        isValid = (formSiswa.email.isValid && formSiswa.noHp.isValid);
        if (formSiswa.email.isValid && formSiswa.noHp.isValid && formSiswa.emailOrtu.isValid) {
          const requestDataKontak = {
            collection: 'datasiswa',
            doc: formSiswa.nik.value.toString(),
            data: {
              kontak: {
                noTelp: formSiswa.noTelp.value,
                noHp: formSiswa.noHp.value,
                email: formSiswa.email.value,
                emailOrtu: formSiswa.emailOrtu.value
              },
              step: serverStep >= index ? serverStep : index,
              author: this.props.userProfile.email,
              authorId: this.props.userProfile.author,
            }
          }
          await HTTP_SERVICE.updateFB(requestDataKontak).then(res => {
            isValid = true;
          }).catch(err => {
            isValid = false;
          });
        }
        break;

      case 5:
        isValid = (
          formSiswa.tinggiBadan.isValid && formSiswa.beratBadan.isValid &&
          waktuTempuh.jam.isValid && waktuTempuh.menit.isValid &&
          formSiswa.jumlahSaudara.isValid && formSiswa.jarak.isValid
        )
        if (
          formSiswa.tinggiBadan.isValid && formSiswa.beratBadan.isValid &&
          waktuTempuh.jam.isValid && waktuTempuh.menit.isValid &&
          formSiswa.jumlahSaudara.isValid && formSiswa.jarak.isValid
        ) {
          const requestDataPriodik = {
            collection: 'datasiswa',
            doc: formSiswa.nik.value.toString(),
            data: {
              dataPriodik: {
                tinggiBadan: formSiswa.tinggiBadan.value,
                beratBadan: formSiswa.beratBadan.value,
                waktuTempuh: {
                  jam: waktuTempuh.jam.value,
                  menit: waktuTempuh.menit.value
                },
                jumlahSaudara: formSiswa.jumlahSaudara.value,
                jarak: formSiswa.jarak.value,
              },
              step: serverStep >= index ? serverStep : index,
              author: this.props.userProfile.email,
              authorId: this.props.userProfile.author,
            }
          }
          await HTTP_SERVICE.updateFB(requestDataPriodik).then(res => {
            isValid = true;
          }).catch(err => {
            isValid = false;
          });
        }
        break;

      case 6:
        let dataPrestasi = [];
        if (formSiswa.prestasi.length > 0) {
          for (let i = 0; i < formSiswa.prestasi.length; i++) {
            dataPrestasi.push({
              jenis: formSiswa.prestasi[i].jenis.value,
              tingkat: formSiswa.prestasi[i].tingkat.value,
              namaPrestasi: formSiswa.prestasi[i].namaPrestasi.value,
              tahun: formSiswa.prestasi[i].tahun.value,
              penyelenggara: formSiswa.prestasi[i].penyelenggara.value,
              peringkat: formSiswa.prestasi[i].peringkat.value,
            });
          }
        }
        const requestDataPrestasi = {
          collection: 'datasiswa',
          doc: formSiswa.nik.value.toString(),
          data: {
            prestasi: dataPrestasi,
            step: serverStep >= index ? serverStep : index,
            author: this.props.userProfile.email,
            authorId: this.props.userProfile.author,
          },
        }
        await HTTP_SERVICE.updateFB(requestDataPrestasi).then(res => {
          isValid = true;
        }).catch(err => {
          isValid = false;
        });
        break;

      case 7:
        let dataBeasiswa = [];
        for (let i = 0; i < formSiswa.beasiswa.length; i++) {
          if (formSiswa.beasiswa[i].jenis.value !== '') {
            dataBeasiswa.push({
              jenis: formSiswa.beasiswa[i].jenis.value,
              keterangan: formSiswa.beasiswa[i].keterangan.value,
              tahunMulai: formSiswa.beasiswa[i].tahunMulai.value,
              tahunSelesai: formSiswa.beasiswa[i].tahunSelesai.value,
            });
          }
        }
        const requestDataBeasiswa = {
          collection: 'datasiswa',
          doc: formSiswa.nik.value.toString(),
          data: {
            beasiswa: dataBeasiswa,
            step: serverStep >= index ? serverStep : index,
            author: this.props.userProfile.email,
            authorId: this.props.userProfile.author,
          },
        }
        await HTTP_SERVICE.updateFB(requestDataBeasiswa).then(res => {
          isValid = true;
        }).catch(err => {
          isValid = false;
        });
        break;

      case 8:
        if (
          formSiswa.nis.isValid && formSiswa.asalSekolah.isValid &&
          formSiswa.nomorPesertaUjian.isValid && formSiswa.noIjazah.isValid &&
          formSiswa.jenisPendaftaran.isValid && formSiswa.tglMasuk.isValid &&
          formSiswa.noSKHUS.isValid
        ) {
          let splitTgl = formSiswa.tglMasuk.value.split('-');
          const requestRegis = {
            collection: 'datasiswa',
            doc: formSiswa.nik.value.toString(),
            data: {
              regisPesertaDidik: {
                kompetensiKeahlian: formSiswa.kompetensiKeahlian.value,
                nis: formSiswa.nis.value,
                asalSekolah: formSiswa.asalSekolah.value,
                noIjazah: formSiswa.noIjazah.value,
                nomorPesertaUjian: formSiswa.nomorPesertaUjian.value,
                jenisPendaftaran: formSiswa.jenisPendaftaran.value,
                tglMasuk: formSiswa.tglMasuk.value,
                noSKHUS: formSiswa.noSKHUS.value,
                thnMasuk: splitTgl[0],
              },
              step: serverStep >= index ? serverStep : index,
              activeStudent: true,
              author: this.props.userProfile.email,
              authorId: this.props.userProfile.author,
              kelas: '',
            },
          }
          await HTTP_SERVICE.updateFB(requestRegis).then(async res => {
            await HTTP_SERVICE.registerAcc({ email: formSiswa.email.value, password: 'Password123' })
            await HTTP_SERVICE.registerAcc({ email: formSiswa.emailOrtu.value, password: 'Password123' })
            isValid = true;
          }).catch(err => {
            isValid = false;
          });
        }
        break;

      case 9:
        if (
          formSiswa.keluarKarena.isValid && formSiswa.tanggalKeluar.isValid
        ) {
          const requestKeluar = {
            collection: 'datasiswa',
            doc: formSiswa.nik.value.toString(),
            data: {
              pendaftaranKeluar: {
                keluarKarena: formSiswa.keluarKarena.value,
                tanggalKeluar: formSiswa.tanggalKeluar.value,
                alasan: formSiswa.alasan.value,
              },
              step: serverStep >= index ? serverStep : index,
              activeStudent: false,
              author: this.props.userProfile.email,
              authorId: this.props.userProfile.author,
            },
          }
          await HTTP_SERVICE.updateFB(requestKeluar).then(res => {
            isValid = true;
          }).catch(err => {
            isValid = false;
          });
        }
        break;

      default:
        break;
    }
    if (isValid) {
      this.newSteps[index].isComplete = true;
      this.setState({ activeStep: serverStep >= index ? serverStep : index + 1, steps: this.newSteps });
    }
    this.props.setLoading(false);
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
              <InputField id='noTelp' label='No telepon Rumah' required={false} type="tel" value={formSiswa.noTelp.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' setFocus={true} />
              <InputField id='email' label='email' required={true} type="email" value={formSiswa.email.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
            </Grid>
            <Grid item xs>
              <InputField id='noHp' label='No HP Anak' required={true} type="tel" value={formSiswa.noHp.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
              <InputField id='emailOrtu' label='Email Orang tua / Wali' required={true} type="email" value={formSiswa.emailOrtu.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
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
              <DatePicker id='tglMasuk' label='Tanggal Masuk Sekolah' required={true} value={formSiswa.tglMasuk.value} onChange={this.dateChange} isSubmit={steps[index].submited} />
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
              <InputField id='alasan' label='Alasan Keluar' required={false} type="text" value={formSiswa.alasan.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={steps[index].submited} variant='outlined' />
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
      (this.idSiswa === '0' || !this.state.active ? !this.state.active : steps[9].isComplete)
    );
    this.setState({ finished: finish });
  }

  sendData = async () => {
    window.history.back();
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
                      Semua form sudah di isi. Silahkan periksa kembali data yang sudah anda input atau click finish jika data sudah benar.
                    </p>
                  </Grid>
                  <Grid item xs>
                    <div style={{ display: 'flex', marginTop: 30 }}>
                      <div style={{ flexGrow: 1 }}></div>
                      <Button type='default' disabled={false} text='Finish' onClick={() => { this.sendData() }} />
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

const mapStateToProps = state => {
  const {
    jenisKelamin,
    agama,
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
  } = state.layout.resMasterData;
  return {
    jenisKelamin: jenisKelamin,
    agama: agama,
    kebutuhanKhusus: kebutuhanKhusus,
    tempatTinggal: tempatTinggal,
    transportasi: transportasi,
    pendidikan: pendidikan,
    pekerjaan: pekerjaan,
    penghasilan: penghasilan,
    keluarKarena: keluarKarena,
    punyaKIP: punyaKIP,
    alasanPIP: alasanPIP,
    jarak: jarak,
    jenisPrestasi: jenisPrestasi,
    tingkatPrestasi: tingkatPrestasi,
    jenisBeasiswa: jenisBeasiswa,
    jenisPendaftaran: jenisPendaftaran,
    penerimaKPS: penerimaKPS,
    userProfile: state.layout.resAuth,
  }
};

const useStyles = (theme) => ({
  titleHeader: {
    background: theme.palette.secondary.main
  }
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
});

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(FormSiswa));