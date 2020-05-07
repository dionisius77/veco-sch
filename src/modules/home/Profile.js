import React, { Component } from 'react';
import { pushAlert, pushLoading, authSuccess } from '../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Paper, Grid } from '@material-ui/core';
import InputField from '../../components/input_field/InputField';
import imageDefault from '../../shared/people_default.png';
import Button from '../../components/button/Button';
import { HTTP_SERVICE } from '../../services/HttpServices';
import { Fade } from 'react-reveal';

class Profile extends Component {
  newForm;
  constructor(props) {
    super(props);
    this.state = {
      form: {
        displayName: { value: '', isValid: true },
        phoneNumber: { value: '', isValid: true },
        photoUrl: { value: '', blob: '', isValid: true },
        newPassword: { value: '', blob: '', isValid: true },
        retypePassword: { value: '', blob: '', isValid: true },
      }
    }
    this.newForm = this.state.form;
    this.inputFormOnBlur = this.inputFormOnBlur.bind(this);
  }

  componentDidMount() {
    this.newForm.displayName.value = this.props.profile.displayName !== null ? this.props.profile.displayName : '';
    this.newForm.phoneNumber.value = this.props.profile.phoneNumber !== null ? this.props.profile.phoneNumber : '';
    this.newForm.photoUrl.value = this.props.profile.photoUrl !== null ? this.props.profile.photoUrl : '';
    this.setState({ form: this.newForm });
  }

  inputFormOnBlur = (name, value) => {
    this.newForm[name].value = value;
    this.setState({ form: this.newForm });
  }

  filePicker = (e) => {
    this.newForm[e.target.name].value = URL.createObjectURL(e.target.files[0]);
    this.newForm[e.target.name].blob = e.target.files[0];
    this.setState({ form: this.newForm });
  }

  saveProfileData = async () => {
    this.props.setLoading(true);
    const { form } = this.state;
    if (form.newPassword.value !== '') {
      if (form.newPassword.value === form.retypePassword.value) {
        let setPassword = HTTP_SERVICE.getUserInfo();
        setPassword.updatePassword(form.newPassword.value).then(res => {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Password berhasil di update',
            type: 'success',
          });
        }).catch(err => {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: 'Gagal mengganti password',
            type: 'error',
          });
        });
      } else {
        this.props.setLoading(false);
        this.props.setAlert({
          open: true,
          message: 'Password yang di ketik ulang harus sama dengan password baru',
          type: 'error',
        });
      }
    } else {
      if (form.photoUrl.blob !== '') {
        const req = {
          uid: this.props.profile.author,
          file: form.photoUrl.blob,
        }
        let uploadTask = HTTP_SERVICE.profilePicture(req)
        uploadTask.on('state_changed',
          (snapshot) => { },
          (err) => {
            this.props.setLoading(false);
            this.props.setAlert({
              open: true,
              message: 'Upload photo profile gagal',
              type: 'error',
            });
          },
          async (success) => {
            await uploadTask.snapshot.ref.getDownloadURL().then(async res => {
              const user = HTTP_SERVICE.getUserInfo();
              user.updateProfile({ photoURL: res }).then(resp => { });
              this.updateProfile(res);
            });
          }
        )
      } else {
        this.updateProfile('');
      }
    }
  }

  updateProfile = (photoUrl) => {
    const { form } = this.state;
    let profile = this.props.profile;
    const user = HTTP_SERVICE.getUserInfo();
    user.updateProfile({ displayName: form.displayName.value }).then(resp => {
      // user.updatePhoneNumber(form.phoneNumber.value).then(res => console.log(res)).catch(err => { console.log(err) })
      this.props.setLoading(false);
      profile.displayName = form.displayName.value;
      // profile.phoneNumber = form.phoneNumber.value;
      if (photoUrl !== '') {
        profile.photoUrl = photoUrl;
      }
      this.props.setProfile(profile);
      this.props.setAlert({
        open: true,
        message: 'Update profile berhasil',
        type: 'success',
      })
    }).catch(err => {
      this.props.setLoading(false);
      this.props.setAlert({
        open: true,
        message: 'Update profile gagal',
        type: 'error',
      })
    })
  }

  render() {
    const { form } = this.state;
    return (
      <Fade right opposite duration={500}>
        <Paper style={{ padding: 5, width: 800, marginLeft: 'auto', marginRight: 'auto', display: 'block' }} >
          <div>
            <h1 style={{
              textAlign: 'center',
              paddingBottom: 10
            }}>
              Profile
            </h1>
          </div>
          <Grid container spacing={5}>
            <Grid item xs={5}>
              <div style={{ border: '0.5px solid', borderColor: '#fff', padding: 10 }}>
                <img
                  alt="profile pict"
                  style={{
                    width: 200,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginBottom: 20,
                    display: 'block'
                  }}
                  src={form.photoUrl.value === '' ? imageDefault : form.photoUrl.value} />
                <input type="file" id="photoUrl" name="photoUrl" accept="image/png, image/jpeg" onChange={(e) => { this.filePicker(e) }}></input>
              </div>
            </Grid>
            <Grid item xs={7}>
              <InputField id='displayName' label='Display Name' required={false} type="text" value={form.displayName.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={false} variant='outlined' setFocus={true} />
              <InputField id='newPassword' label='New Password' required={false} type="password" value={form.newPassword.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={false} variant='outlined' setFocus={true} />
              <InputField id='retypePassword' label='Re-type Password' required={false} type="password" value={form.retypePassword.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={false} variant='outlined' setFocus={true} />
              {/* <InputField id='phoneNumber' label='No. HP' required={false} type="tel" value={form.phoneNumber.value} disabled={false} onBlur={this.inputFormOnBlur} isSubmit={false} variant='outlined' setFocus={true} /> */}
              <div style={{ display: 'flex', marginTop: 30 }}>
                <div style={{ flexGrow: 1 }}></div>
                <Button type='default' disabled={false} text='Simpan' onClick={() => { this.saveProfileData() }} />
              </div>
            </Grid>
          </Grid>
        </Paper >
      </Fade>
    )
  }
}

const mapStateToProps = state => {
  return {
    profile: state.layout.resAuth,
  }
}

const mapDispatchToProps = dispatch => ({
  setAlert: value => dispatch(pushAlert(value)),
  setLoading: value => dispatch(pushLoading(value)),
  setProfile: value => dispatch(authSuccess(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);