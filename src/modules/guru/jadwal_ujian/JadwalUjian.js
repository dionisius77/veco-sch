import React, { Component, Children } from 'react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modals from '../../../components/modal/Modal';
import InputField from '../../../components/input_field/InputField';
import DatePicker from '../../../components/date_picker/DatePicker';
import { Paper, withStyles, Grid, Tooltip } from '@material-ui/core';
import Selects from '../../../components/select/Select';
import { HTTP_SERVICE } from '../../../services/HttpServices';

const styles = (theme) => ({
  toolbar: {
    marginBottom: 4
  },
  buttonGroup: {
    display: 'inline-block',
    whiteSpace: 'nowrap'
  },
  buttonToolbar: {
    display: 'inline-block',
    margin: 0,
    textAlign: 'center',
    verticaAlign: 'middle',
    background: 'none',
    backgroundmage: 'none',
    border: '1px solid #ccc',
    padding: '.375rem 1rem',
    borderRadius: '4px',
    lineHeight: 'normal',
    whiteSpace: 'nowrap',
    color: '#fff'
  }
});

class JadwalUjian extends Component {
  newEvents;
  constructor(props) {
    super(props);
    this.state = {
      events: this.props.events,
      openModal: false,
      id: 0,
      title: '',
      start: '',
      end: '',
      kegiatan: '',
      kelas: '',
      jenis: '',
      optionKelas: [],
    }
    this.clickedCalendar = this.clickedCalendar.bind(this);
    this.customEvent = this.customEvent.bind(this);
    this.customCells = this.customCells.bind(this);
    this.newEvents = this.state.events;
    this.customEventWrapper = this.customEventWrapper.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getJadwalKbm();
  }

  getJadwalKbm = async () => {
    const current = new Date().toLocaleDateString();
    const splittedCurrent = current.split('/');
    const formatedDate = `${splittedCurrent[2]}-${splittedCurrent[0].length === 1 ? '0' + splittedCurrent[0] : splittedCurrent[0]}-${splittedCurrent[1].length === 1 ? '0' + splittedCurrent[1] : splittedCurrent[1]}`
    const req = {
      collection: 'jadwalkbm',
      params: 'end', operator: '>=', value: formatedDate,
      params2: 'authorId', operator2: '==', value2: this.props.userProfile.author,
      orderBy: 'end',
      directions: 'asc',
      lastVisible: '',
      limit: 500,
    }
    await HTTP_SERVICE.getFBTwoFilter(req)
      .then(async res => {
        if (!res.empty) {
          res.forEach(doc => {
            this.newEvents.push({ id: doc.id, ...doc.data() });
          });
          this.setState({ events: this.newEvents });
        }
        const req = {
          collection: 'datastaff',
          doc: this.props.userProfile.nik
        }
        await HTTP_SERVICE.getFb(req)
          .then(res => {
            if (res.data().jadwal) {
              const newOptionKelas = this.distinctSelect(res.data().jadwal);
              this.setState({ optionKelas: newOptionKelas });
              this.props.setLoading(false);
            } else {
              this.props.setLoading(false);
              this.props.setAlert({
                open: true,
                message: 'Jadwal belum dibuat',
                type: 'warning'
              });
            }
          });
      })
      .catch(err => {
        this.props.setAlert({
          open: true,
          message: err.message,
          type: 'error',
        });
        this.props.setLoading(false);
      });
  }

  distinctSelect = (array) => {
    const result = [];
    const map = new Map();
    for (const item in array) {
      if (!map.has(`${array[item].text}_${array[item].kelas}`)) {
        map.set(`${array[item].text}_${array[item].kelas}`, true);    // set any value to Map
        result.push({
          value: `${array[item].text}_${array[item].kelas}`,
          text: `${array[item].text} ${array[item].kelas}`
        });
      }
    }
    return result;
  }

  CustomToolbar = (toolbar) => {
    const goToBack = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() - 1);
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.date.setMonth(toolbar.date.getMonth() + 1);
      toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
      const now = new Date();
      toolbar.date.setMonth(now.getMonth());
      toolbar.date.setYear(now.getFullYear());
      toolbar.onNavigate('CURRENT');
    };

    const label = () => {
      const date = toolbar.date;
      return (
        <span><b>{date.toLocaleString('default', { month: 'long' })}</b><span> {date.getFullYear()}</span></span>
      );
    };

    return (
      <Grid container className={this.props.classes.toolbar}>
        <Grid item xs={2}>
          <div className={this.props.classes.buttonGroup}>
            <button className={this.props.classes.buttonToolbar} onClick={goToBack}>&#8249;</button>
            <button className={this.props.classes.buttonToolbar} onClick={goToCurrent}>today</button>
            <button className={this.props.classes.buttonToolbar} onClick={goToNext}>&#8250;</button>
          </div>
        </Grid>
        <Grid item xs={2}>
          <label>{label()}</label>
        </Grid>
      </Grid >
    );
  };

  dateFormater(date) {
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    let dates = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + '-' + dates;
  }

  clickedCalendar = (target) => {
    const { start, end } = target;
    let startDateFormated = this.dateFormater(start);
    let endDateFormated = this.dateFormater(end);
    if (start.getDay() !== 0 && start.getDay() !== 6) {
      this.setState({
        start: startDateFormated,
        end: endDateFormated,
        id: Math.floor(Math.random() * 101),
        title: '',
        jenis: '',
        kegiatan: '',
        kelas: '',
        openModal: true
      });
    }
  }

  clickEvent = (event) => {
    this.setState({
      start: event.start,
      end: event.end,
      title: event.title,
      id: event.id,
      jenis: event.jenis,
      kegiatan: event.title,
      kelas: event.kelas,
      openModal: true
    });
  }

  closeModal = () => {
    this.setState({ openModal: false });
  }

  submitModal = async () => {
    this.setState({ openModal: false });
    this.props.setLoading(true);
    let events = this.newEvents;
    let hasRegistered;
    events.map((value, index) => {
      if (value.id === this.state.id) {
        hasRegistered = index;
      }
      return index;
    });
    if (hasRegistered !== undefined) {
      const req = {
        collection: 'jadwalkbm',
        doc: this.state.id,
        data: {
          start: this.state.start,
          end: this.state.end,
          title: this.state.kegiatan,
          jenis: this.state.jenis,
          kelas: this.state.kelas,
        }
      }
      await HTTP_SERVICE.updateFB(req)
        .then(res => {
          this.props.setLoading(false);
          events[hasRegistered].title = this.state.kegiatan;
          this.state.jenis === 'Tugas' ? events[hasRegistered].end = this.state.end : events[hasRegistered].end = this.state.start;
          events[hasRegistered].start = this.state.start;
          events[hasRegistered].jenis = this.state.jenis;
          events[hasRegistered].kelas = this.state.kelas;
          this.setState({ events: events });
        })
        .catch(err => {
          this.setState({ openModal: true });
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Menyimpan data gagal, terjadi kesalahan.',
            type: 'error',
          });
        })
    } else {
      const splittedKelas = this.state.kelas.split('_');
      const req = {
        collection: 'jadwalkbm',
        data: {
          start: this.state.start,
          end: this.state.end,
          title: this.state.kegiatan,
          jenis: this.state.jenis,
          kelas: this.state.kelas,
          rawKelas: splittedKelas[1],
          author: this.props.userProfile.email,
          authorId: this.props.userProfile.author,
        }
      }
      await HTTP_SERVICE.inputFb(req)
        .then(res => {
          let _newEvent = {
            id: res.id,
            start: this.state.start,
            end: this.state.end,
            title: this.state.kegiatan,
            jenis: this.state.jenis,
            kelas: this.state.kelas,
          };
          events.push(_newEvent);
          this.setState({ events: events });
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Data berhasil disimpan',
            type: 'success',
          });
        })
        .catch(err => {
          this.props.setLoading(false);
          this.setState({ openModal: true });
          this.props.setAlert({
            open: true,
            message: 'Menyimpan data gagal, terjadi kesalahan.',
            type: 'error',
          });
        })
    }
  }

  onBlurInput = (id, value) => {
    this.setState({ kegiatan: value });
  }

  selectOnChange = (name, value) => {
    if (name === 'kelas') {
      this.setState({ kelas: value });
    } else {
      this.setState({ jenis: value });
    }
  }

  dateOnChange = (id, value) => {
    if (id === 'start') {
      this.setState({ start: value });
    } else {
      this.setState({ end: value });
    }
  }

  customCells = ({ children, value }) => {
    return (
      React.cloneElement(Children.only(children), {
        style: {
          ...children.style,
          backgroundColor: value.toLocaleDateString() === new Date().toLocaleDateString() ? '#ff5b92' : '#424242',
        },
      })
    )
  }

  customEventWrapper = (e) => {
    return (
      React.cloneElement(Children.only(e.children), {
        style: {
          ...e.children.style,
          backgroundColor: e.event.jenis === 'Tugas' ? '#3174ad' : '#ffc107',
          borderColor: e.event.jenis === 'Tugas' ? '#3174ad' : '#ffc107',
        }
      })
    )
  }

  customEvent = (e) => {
    return (
      <Tooltip title={`${e.event.jenis} ${e.event.title} ${e.event.kelas}`} placement='top' arrow={true}>
        <div
          tabIndex={e.event.id}
          style={{
            border: 'none',
            boxSizing: 'border-box',
            boxShadow: 'none',
            margin: '0',
            padding: '2px 5px',
            backgroundColor: e.event.jenis === 'Tugas' ? '#3174ad' : '#ffc107',
            borderColor: e.event.jenis === 'Tugas' ? '#3174ad' : '#ffc107',
            borderRadius: '5px',
            color: '#fff',
            cursor: 'pointer',
            width: '100 %',
            textAlign: 'left',
          }}
          onContextMenu={(event) => { this.onRightClickEvent(event, e.event.id) }}
          onClick={() => { this.clickEvent(e.event) }}
        >
          {`${e.event.jenis} ${e.event.title} ${e.event.kelas}`}
        </div >
      </Tooltip>
    )
  }

  onRightClickEvent = async (e, id) => {
    this.props.setLoading(true);
    e.preventDefault();
    let events = this.newEvents;
    let hasRegistered;
    events.map((value, index) => {
      if (value.id === id) {
        hasRegistered = index;
      }
      return index;
    });
    const req = {
      collection: 'jadwalkbm',
      doc: id,
    }
    await HTTP_SERVICE.deleteFB(req)
      .then(res => {
        events.splice(hasRegistered, 1);
        this.setState({ events: events });
        this.props.setLoading(false);
      })
      .catch(err => {
        this.props.setAlert({
          open: true,
          message: 'Terjadi kesalahan saat menghapus data, silahkan coba lagi.',
          type: 'error',
        });
      });
  }

  render() {
    const {
      start,
      end,
      events,
      kegiatan,
      jenis,
      kelas,
      openModal,
      optionKelas,
    } = this.state;
    const {
      optionJenis,
    } = this.props;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: '0px 5px 5px 5px', marginTop: -20 }}>
          <h2 style={{ textAlign: 'center' }}>Jadwal Kegiatan Belajar</h2>
          <Calendar
            events={events}
            components={{
              toolbar: this.CustomToolbar,
              event: this.customEvent,
              eventWrapper: this.customEventWrapper,
              dateCellWrapper: this.customCells,
            }}
            views={['month']}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            onNavigate={this.onNext}
            onSelectSlot={this.clickedCalendar}
            selectable={true}
            style={{ color: '#fff', minHeight: 600 }}
            onSelectEvent={(event) => this.clickEvent(event)}
            popup={true}
          />
        </Paper>
        <Modals
          modalTitle='Input Jadwal Kegiatan'
          open={openModal}
          onCloseModal={() => { this.closeModal() }}
          onSubmitModal={() => { this.submitModal() }}
          type='confirm'
        >
          <div style={{
            width: 400,
            height: jenis === 'Tugas' ? 400 : 350
          }}>
            <Selects name='jenis' id='jenis' label='Jenis Kegiatan' variant='outlined' options={optionJenis} value={jenis} onChange={(name, value) => { this.selectOnChange(name, value) }} isSubmit={false} disable={false} required={true} />
            <InputField id='kegiatan' label='Nama Kegiatan' variant='outlined' required={false} type="text" value={kegiatan} disabled={false} onBlur={(id, value) => this.onBlurInput(id, value)} isSubmit={false} />
            <DatePicker id='start' label='Tanggal' required={true} value={start} onChange={(id, value) => { this.dateOnChange(id, value) }} isSubmit={false} />
            {jenis === 'Tugas' &&
              <DatePicker id='end' label='Dikumpulkan' required={true} value={end} onChange={(id, value) => { this.dateOnChange(id, value) }} isSubmit={false} />
            }
            <Selects name='kelas' id='kelas' label='Kelas' variant='outlined' options={optionKelas} value={kelas} onChange={(name, value) => { this.selectOnChange(name, value) }} isSubmit={false} disable={false} required={true} />
          </div>
        </Modals>
      </Fade>
    )
  }
}

const locales = {
  'en-US': require('date-fns/locale/en-US')
}
const localizer = dateFnsLocalizer({
  format, parse, startOfWeek, getDay, locales
})

const mapStateToProps = state => ({
  events: [
  ],
  optionJenis: [
    { value: 'Ulangan Harian', text: 'Ulangan Harian' },
    { value: 'Tugas', text: 'Tugas' },
  ],
  userProfile: state.layout.resAuth,
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(JadwalUjian));