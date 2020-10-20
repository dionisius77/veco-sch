import React, { Component } from 'react';
import { pushLoading, pushAlert } from '../../../components/layout/ActionLayout';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import FileManager from '../../../components/file_manager/FileManager';
import ProgressBarCustom from '../../../components/progress/Progress';
import { HTTP_SERVICE } from '../../../services/HttpServices';
class LandingBankMateri extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTables: [],
      fileData: {
        base64file: '',
        fileName: '',
      },
      openProgress: false,
      progress: 0,
      successUpload: false,
      cache: [],
    };
    this.newDataTables = this.state.dataTables;
    this.newCache = this.state.cache;
  }

  componentDidMount() {
    this.props.setLoading(true);
    this.getBankMateri();
  }

  getBankMateri = async () => {
    if (this.state.cache.length === 0) {
      const req = {
        collection: 'bankmateri',
        params: 'author',
        operator: '==',
        value: this.props.userProfile.author,
      }
      await HTTP_SERVICE.getFbFilterOnly(req).then(res => {
        this.newDataTables = [];
        if (!res.empty) {
          res.docs.forEach(doc => {
            this.newDataTables.push({
              uniqueId: doc.id,
              fileType: doc.data().fileType,
              date: doc.data().date,
              link: doc.data().link,
              nama: doc.data().nama
            });
          });
        }
        this.setState({ dataTables: this.newDataTables });
        this.props.setLoading(false);
      }).catch(err => {
        this.props.setLoading(false);
        this.props.setAlert({
          message: err.message,
          open: true,
          type: 'error',
        });
      });
    } else {
      let request = {
        collection: 'bankmateri',
        doc: this.state.cache[0].idDoc,
        subCollection: this.state.cache[0].fileName,
      }
      await HTTP_SERVICE.getFbSubCollection(request).then(res => {
        if (!res.empty) {
          this.newDataTables = [];
          res.docs.forEach(doc => {
            this.newDataTables.push({
              uniqueId: doc.id,
              fileType: doc.data().fileType,
              date: doc.data().date,
              link: doc.data().link,
              nama: doc.data().nama
            });
          });
          this.setState({ dataTables: this.newDataTables });
        } else {
          this.newDataTables = [];
          this.setState({ dataTables: [] });
        }
        this.props.setLoading(false);
      }).catch(err => {
        console.log('error', err);
      })
    }
  }

  handleUpload = (fileData) => {
    let date = new Date();
    let tanggal = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formatedDate = `${tanggal < 10 ? '0' + tanggal : tanggal}-${month < 10 ? '0' + month : month}-${year}`;
    this.setState({
      fileData: fileData,
      openProgress: true
    });
    var uploadTask = HTTP_SERVICE.fileUpload(fileData);
    uploadTask.on('state_changed', (snapshot) => {
      this.setState({ progress: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 });
    }, (error) => {
      this.props.setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then(async (downloadUrl) => {
        let dataMateri = {
          nama: fileData.fileName,
          fileType: 'file',
          date: formatedDate,
          link: downloadUrl,
          author: this.props.userProfile.author,
        }
        if (this.state.cache.length === 0) {
          let request = {
            collection: 'bankmateri',
            data: dataMateri
          }
          await HTTP_SERVICE.inputFb(request).then(res => {
            this.setState({ successUpload: true });
            this.getBankMateri();
          }).catch(err => {
            this.props.setAlert({
              open: true,
              message: err.message,
              type: 'error',
            });
          });
        } else {
          let request = {
            collection: 'bankmateri',
            doc: this.state.cache[0].idDoc,
            subCollection: this.state.cache[0].fileName,
            data: dataMateri
          }
          await HTTP_SERVICE.inputFbSubCollection(request).then(res => {
            this.setState({ successUpload: true });
            this.getBankMateri();
          }).catch(err => {
            this.props.setAlert({
              open: true,
              message: err.message,
              type: 'error',
            });
          });
        }
      });
    });
  }

  closeProgress = () => {
    this.setState({
      fileData: {
        base64file: '',
        fileName: '',
      },
      openProgress: false,
      progress: 0,
    });
  }

  handleCellClicked = (uniqueId, link, fileType, fileName) => {
    if (fileType === 'folder') {
      this.newCache = [];
      this.newCache.push({ idDoc: uniqueId, fileName: fileName });
      this.setState({ cache: this.newCache }, () => {
        this.props.setLoading(true);
        this.getBankMateri();
      });
    } else {
      window.open(link);
    }
  }

  handleDelete = (uniqueId, fileType, fileName) => {
    this.props.setLoading(true);
    if (fileType === 'folder') {
      let request = {
        collection: 'bankmateri',
        doc: uniqueId
      }
      HTTP_SERVICE.deleteFB(request).then(res => {
        this.getBankMateri();
      }).catch(err => {
        this.props.setLoading(false);
        this.props.setAlert({
          open: true,
          message: err.message,
          type: 'error',
        });
      });
    } else {
      this.deleteFile(uniqueId, fileName);
    }
  }

  deleteFile = (uniqueId, fileName) => {
    HTTP_SERVICE.fileDelete(fileName).then(() => {
      if (this.state.cache.length !== 0) {
        let req = {
          collection: 'bankmateri',
          doc: this.state.cache[0].idDoc,
          subCollection: this.state.cache[0].fileName,
          subDoc: uniqueId,
        }
        HTTP_SERVICE.deleteFbSubCollection(req).then(() => {
          this.getBankMateri();
        }).catch(err => {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: err.message,
            type: 'error',
          });
        })
      } else {
        let req = {
          collection: 'bankmateri',
          doc: uniqueId
        }
        HTTP_SERVICE.deleteFB(req).then(() => {
          this.getBankMateri();
        }).catch(err => {
          this.props.setLoading(false);
          this.props.setAlert({
            open: true,
            message: err.message,
            type: 'error',
          });
        })
      }
    }).catch(err => {
      this.props.setLoading(false);
      this.props.setAlert({
        open: true,
        message: err.message,
        type: 'error',
      });
    });
  }

  onCreateFolder = async (folderName) => {
    this.props.setLoading(true);
    let date = new Date();
    let tanggal = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let formatedDate = `${tanggal < 10 ? '0' + tanggal : tanggal}-${month < 10 ? '0' + month : month}-${year}`;
    let dataFolder = {
      nama: folderName,
      fileType: 'folder',
      date: formatedDate,
      link: '',
      author: this.props.userProfile.author,
    }
    let request = {
      collection: 'bankmateri',
      data: dataFolder
    }
    await HTTP_SERVICE.inputFb(request).then(res => {
      this.props.setLoading(false);
      this.getBankMateri();
    }).catch(err => {
      this.props.setAlert({
        open: true,
        message: err.message,
        type: 'error',
      });
    });
  }

  onBackToParent = () => {
    this.props.setLoading(true);
    this.setState({
      cache: []
    }, () => {
      this.getBankMateri();
    });
  }

  handleSearch = (value) => {
    if (value.length === 0) {
      this.setState({ dataTables: this.newDataTables });
    } else {
      var searched = this.newDataTables.filter((data) => {
        return data.nama.includes(value);
      });
      this.setState({ dataTables: searched });
    }
  }

  render() {
    const {
      dataTables,
      fileData,
      openProgress,
      progress,
      successUpload,
      cache
    } = this.state;
    const {
      headCells
    } = this.props;
    return (
      <Paper style={{ padding: 10, margin: -10, minHeight: 550 }}>
        <FileManager title="Bank Materi"
          headCells={headCells}
          data={dataTables}
          allowEdit={true}
          handleSearch={(value) => { this.handleSearch(value) }}
          handleUpload={this.handleUpload}
          onCellClicked={this.handleCellClicked}
          handleDelete={this.handleDelete}
          onCreateFolder={this.onCreateFolder}
          cache={cache}
          backToParent={this.onBackToParent}
        />
        <ProgressBarCustom
          isDone={successUpload}
          open={openProgress}
          progress={progress}
          modalTitle={fileData.fileName}
          onCloseModal={this.closeProgress}
        />
      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  userProfile: state.layout.resAuth,
  headCells: [
    { id: 'nama', disablePadding: true, label: 'Nama Folder / File' },
    { id: 'date', disablePadding: true, label: 'Tanggal Dibuat' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value)),
  setAlert: value => dispatch(pushAlert(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LandingBankMateri);