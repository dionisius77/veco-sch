import React, { Component } from 'react';
import { Fade } from 'react-reveal';
import { connect } from 'react-redux';
import { pushLoading } from '../../components/layout/ActionLayout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modals from '../../components/modal/Modal';
import InputField from '../../components/input_field/InputField';
import DatePicker from '../../components/date_picker/DatePicker';
import { Paper } from '@material-ui/core';

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
    this.clickedCalendar = this.clickedCalendar.bind(this);
    this.newEvents = this.state.events;
  }

  componentDidMount() {
  }

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

  submitModal = () => {
    let events = this.newEvents;
    let hasRegistered;
    events.map((value, index) => {
      if (value.id === this.state.id) {
        hasRegistered = index;
      }
      return index;
    });
    if (hasRegistered !== undefined) {
      events[hasRegistered].title = this.state.title;
    } else {
      let _newEvent = {
        id: this.state.id,
        start: this.state.start,
        end: this.state.end,
        title: this.state.title,
      };
      events.push(_newEvent);
    }
    this.setState({
      events: events,
      openModal: false
    });
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

  render() {
    const { start, end, title, events } = this.state;
    return (
      <Fade right duration={500}>
        <Paper style={{ height: 600, padding: 5 }}>
          <Calendar
            events={events}
            views={['month']}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            onNavigate={this.onNext}
            onSelectSlot={this.clickedCalendar}
            selectable={true}
            style={{ color: '#fff' }}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(InputLibur);