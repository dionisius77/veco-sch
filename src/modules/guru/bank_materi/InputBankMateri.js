import React, { Component } from "react";
import { connect } from "react-redux";
import { pushAlert, pushLoading } from "../../../components/layout/ActionLayout";
import { Fade } from "react-reveal";
import { Paper, Grid } from "@material-ui/core";
import { HTTP_SERVICE } from "../../../services/HttpServices";
import Selects from "../../../components/select/Select";
import InputField from "../../../components/input_field/InputField";

class InputBankMateri extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionMapel: [],
    }
  }

  componentDidMount() {
    this.props.setLoading(true);
    const mapelList = this.generateMapelList(this.props.userProfile.bidangStudi);
    this.setState({ optionMapel: mapelList });
    this.props.setLoading(false);
  }

  generateMapelList = (list) => {
    let finalList = [];
    list.forEach(item => {
      let splitted = item.split('-');
      finalList.push({ value: item, text: splitted[0] });
    });
    return finalList;
  }

  selectOnChange = (name, value) => {
    console.log('name : ', name);
    console.log('value : ', value);
  }

  render() {
    const {
      optionMapel,
    } = this.state;
    const {
      optionKegiatan,
      optionType,
    } = this.props;
    return (
      <Fade right duration={500}>
        <Paper style={{ padding: 10, margin: -10, minHeight: 600 }}>
          <Grid container>
            <Grid item xs>
              <h2 style={{ textAlign: 'center' }}>Input Materi</h2>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Selects
                name='mataPelajaran'
                id='mataPelajaran'
                label='Mata Pelajaran'
                variant='outlined'
                options={optionMapel}
                value=''
                onChange={(name, value) => { this.selectOnChange(name, value) }}
                isSubmit={false}
                required={false}
                size='small'
              />
            </Grid>
            <Grid item xs={2}>
              <Selects
                name='kegiatan'
                id='kegiatan'
                label='Kegiatan'
                variant='outlined'
                options={optionKegiatan}
                value=''
                onChange={(name, value) => { this.selectOnChange(name, value) }}
                isSubmit={false}
                required={false}
                size='small'
              />
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <Selects
                name='type'
                id='type'
                label='Jenis File'
                variant='outlined'
                options={optionType}
                value=''
                onChange={(name, value) => { this.selectOnChange(name, value) }}
                isSubmit={false}
                required={false}
                size='small'
              />
            </Grid>
            <Grid item xs={2}>
              <InputField
                label
              />
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.layout.resAuth,
  optionKegiatan: [
    { value: 'Materi', text: 'Materi' },
    { value: 'Tugas', text: 'Tugas' },
    { value: 'Ulangan', text: 'Ulangan' },
  ],
  optionType: [
    { value: 'PDF', text: 'PDF' },
    { value: 'Online', text: 'Online' },2
  ]
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InputBankMateri);