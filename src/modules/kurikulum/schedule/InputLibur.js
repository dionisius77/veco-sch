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
import { Paper, Grid, withStyles } from '@material-ui/core';
import { HTTP_SERVICE } from '../../../services/HttpServices';

const styles = (theme) => ({
  title: {
    textAlign: 'center',
    marginTop: -5
  },
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

class InputLibur extends Component {
  newEvents;
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      openModal: false,
      id: 0,
      title: '',
      start: '',
      end: '',
    }
    this.onRightClickEvent = this.onRightClickEvent.bind(this);
    this.customEvent = this.customEvent.bind(this);
    this.customCells = this.customCells.bind(this);
    this.clickedCalendar = this.clickedCalendar.bind(this);
    this.newEvents = this.state.events;
  }

  componentDidMount() {
    this.props.onPushLoading(true);
    this.getDataLibur();
  }

  getDataLibur = async () => {
    const current = new Date();
    const localeStringDate = current.toLocaleDateString();
    const temp = localeStringDate.split('/');
    const currentFormated = `${temp[2]}-${temp[0].length === 1 ? '0' + temp[0] : temp[0]}-${temp[1].length === 1 ? '0' + temp[1] : temp[1]}`
    let req = {
      collection: 'datalibur',
      params: 'end',
      operator: '>=',
      value: currentFormated,
      orderBy: 'end',
      directions: 'asc',
      limit: 500,
      lastVisible: '',
    }
    await HTTP_SERVICE.getFBFilter(req)
      .then(res => {
        res.docs.forEach(doc => {
          this.newEvents.push({
            id: doc.id,
            start: doc.data().start,
            end: doc.data().end,
            title: doc.data().title,
          });
        });
        this.setState({ events: this.newEvents });
        this.props.onPushLoading(false);
        this.props.setAlert({
          open: true,
          message: 'Gunakan klik kanan untuk menghapus',
          type: 'warning',
        });
      })
      .catch(err => {
        this.props.onPushLoading(false);
        this.props.setAlert({
          open: true,
          message: 'Data tidak berhasil dimuat',
          type: 'error',
        });
      })
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
      openModal: true
    });
  }

  closeModal = () => {
    this.setState({ openModal: false });
  }

  submitModal = async () => {
    this.props.onPushLoading(true);
    this.setState({ openModal: false });
    let events = this.newEvents;
    let hasRegistered;
    events.map((value, index) => {
      if (value.id === this.state.id) {
        hasRegistered = index;
      }
      return index;
    });
    if (hasRegistered !== undefined) {
      let reqUpdate = {
        collection: 'datalibur',
        doc: events[hasRegistered].id,
        data: {
          title: this.state.title,
          start: this.state.start,
          end: this.state.end,
        }
      }
      await HTTP_SERVICE.updateFB(reqUpdate)
        .then(res => {
          this.props.onPushLoading(false);
          events[hasRegistered].title = this.state.title;
          events[hasRegistered].start = this.state.start;
          events[hasRegistered].end = this.state.end;
        })
        .catch(err => {
          this.props.onPushLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Data gagal di update',
            type: 'error',
          });
        })
    } else {
      let request = {
        collection: 'datalibur',
        data: {
          start: this.state.start,
          end: this.state.end,
          title: this.state.title,
        }
      }
      await HTTP_SERVICE.inputFb(request)
        .then(res => {
          console.log(res);
          let _newEvent = {
            id: res.id,
            start: this.state.start,
            end: this.state.end,
            title: this.state.title,
          };
          events.push(_newEvent);
          this.props.onPushLoading(false)
        })
        .catch(err => {
          this.props.onPushLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Data gagal di input',
            type: 'error',
          });
        });
    }
    this.setState({ events: events });
  }

  onBlurInput = (id, value) => {
    this.setState({ title: value });
  }

  dateChange = (id, value) => {
    if (id === 'start') {
      this.setState({ start: value })
    } else {
      this.setState({ end: value })
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
    this.props.onPushLoading(true);
    let events = this.newEvents;
    let hasRegistered;
    events.map((value, index) => {
      if (value.id === id) {
        hasRegistered = index;
      }
      return index;
    });
    await HTTP_SERVICE.deleteFB({ collection: 'datalibur', doc: id })
      .then(res => {
        events.splice(hasRegistered, 1);
        this.setState({ events: events });
        this.props.onPushLoading(false);
      })
      .catch(err => {
        this.props.setAlert({
          open: true,
          message: 'Data tidak berhasil di hapus',
          type: 'error',
        });
        this.props.onPushLoading(false);
      });
  }

  render() {
    const { start, end, title, events } = this.state;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 5 }}>
          <h2 className={this.props.classes.title}>Input Hari Raya</h2>
          <Calendar
            events={events}
            components={{
              toolbar: this.CustomToolbar,
              dateCellWrapper: this.customCells,
              event: this.customEvent,
            }}
            views={['month']}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            onNavigate={this.onNext}
            onSelectSlot={this.clickedCalendar}
            selectable={true}
            style={{ height: 600, color: '#fff' }}
            onSelectEvent={(event) => this.clickEvent(event)}
            popup={true}
          />
        </Paper>
        <Modals
          modalTitle='Input Hari Libur'
          open={this.state.openModal}
          onCloseModal={() => this.closeModal()}
          onSubmitModal={() => this.submitModal()}
          type="confirm"
        >
          <div style={{
            width: 400,
            height: 300
          }}>
            <DatePicker id='start' label='Tanggal Mulai' required={true} value={start} onChange={this.dateChange} isSubmit={false} />
            <DatePicker id='end' label='Tanggal Selesai' required={true} value={end} onChange={this.dateChange} isSubmit={false} />
            <InputField id='title' label='Libur' variant='outlined' required={false} type="text" value={title} disabled={false} onBlur={(id, value) => this.onBlurInput(id, value)} isSubmit={false} />
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
    {
      id: 15,
      title: 'Puasa',
      start: '2020-04-10',
      end: '2020-04-18',
    },
    {
      id: 14,
      title: 'Lebaran',
      start: '2020-04-10',
      end: '2020-04-18',
    },
  ]
});

const mapDispatchToProps = dispatch => ({
  onPushLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(InputLibur));