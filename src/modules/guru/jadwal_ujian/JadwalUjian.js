import React, { Component, Children } from 'react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { pushLoading } from '../../../components/layout/ActionLayout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modals from '../../../components/modal/Modal';
import InputField from '../../../components/input_field/InputField';
import DatePicker from '../../../components/date_picker/DatePicker';
import { Paper, withStyles, Grid } from '@material-ui/core';
import Selects from '../../../components/select/Select';

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
    }
    this.clickedCalendar = this.clickedCalendar.bind(this);
    this.customEvent = this.customEvent.bind(this);
    this.customCells = this.customCells.bind(this);
    this.newEvents = this.state.events;
  }

  componentDidMount() {
    this.props.onPushLoading(false);
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
    let data = event.title.split('_');
    this.setState({
      start: event.start,
      end: event.end,
      title: event.title,
      id: event.id,
      jenis: data[0],
      kegiatan: data[1],
      kelas: data[2],
      openModal: true
    });
  }

  closeModal = () => {
    this.setState({ openModal: false });
  }

  submitModal = () => {
    let events = this.newEvents;
    let hasRegistered;
    events.map((value, index) => {
      if (value.id === this.state.id) {
        hasRegistered = index;
      }
      return index;
    });
    let titleForSave = this.state.jenis + '_' + this.state.kegiatan + '_' + this.state.kelas;
    if (hasRegistered !== undefined) {
      events[hasRegistered].title = titleForSave;
      this.state.jenis === 'Tugas' ? events[hasRegistered].end = this.state.end : events[hasRegistered].end = this.state.start;
      events[hasRegistered].start = this.state.start;
    } else {
      let _newEvent = {
        id: this.state.id,
        start: this.state.start,
        end: this.state.end,
        title: titleForSave,
      };
      events.push(_newEvent);
    }
    this.setState({
      events: events,
      openModal: false
    });
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

  customEvent = (e) => {
    return (
      <div
        tabIndex={e.event.id}
        style={{
          border: 'none',
          boxSizing: 'border-box',
          boxShadow: 'none',
          margin: '0',
          padding: '2px 5px',
          backgroundColor: '#3174ad',
          borderRadius: '5px',
          color: '#fff',
          cursor: 'pointer',
          width: '100 %',
          textAlign: 'left',
        }}
        onContextMenu={(event) => { this.onRightClickEvent(event, e.event.id) }}
      >
        {e.event.title}
      </div >
    )
  }

  onRightClickEvent = async (e, id) => {
    e.preventDefault();
  }

  render() {
    const {
      start,
      end,
      events,
      kegiatan,
      jenis,
      kelas,
      openModal
    } = this.state;
    const {
      optionJenis,
      optionKelas
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
              dateCellWrapper: this.customCells,
            }}
            views={['month']}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            onNavigate={this.onNext}
            onSelectSlot={this.clickedCalendar}
            selectable={true}
            style={{ color: '#fff', height: 600 }}
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
  optionKelas: [
    { value: 'VII-A', text: 'VII-A' },
    { value: 'VII-B', text: 'VII-B' },
    { value: 'VIII-A', text: 'VIII-A' },
    { value: 'VIII-B', text: 'VIII-B' },
    { value: 'X-A', text: 'X-A' },
  ],
  optionJenis: [
    { value: 'Ulangan Harian', text: 'Ulangan Harian' },
    { value: 'Tugas', text: 'Tugas' },
  ],
});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(JadwalUjian));