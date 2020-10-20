import { IconButton, ListItemIcon, ListItemText, makeStyles, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Tooltip, Typography, withStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import SearchField from "../search_field/SearchField";
import FolderIcon from '@material-ui/icons/Folder';
import FileIcon from '@material-ui/icons/InsertDriveFile';
import PropTypes from 'prop-types';
import MoreIcon from '@material-ui/icons/MoreVert';
import Modals from "../modal/Modal";
import InputField from "../input_field/InputField";
import Uploader from "../uploader/Uploader";
import OpenIcon from '@material-ui/icons/FolderOpen';
import DownloadIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';

const fileManagerStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginTop: 4
  }
}));

function EnhancedTableHead(props) {
  const {
    headCells,
  } = props;

  return (
    <TableHead>
      <TableRow style={{ height: 50 }}>
        <StyledTblCell padding="checkbox"></StyledTblCell>
        {headCells.map(headCell => (
          <StyledTblCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={false}
          >
            <div style={{ fontWeight: 600 }}>
              {headCell.label}
            </div>
          </StyledTblCell>
        ))}
        <StyledTblCell padding="checkbox"></StyledTblCell>
      </TableRow>
    </TableHead>
  );
}

const StyledTblCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function FileManager(props) {
  const classes = fileManagerStyles();
  const [rows, setRows] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalUpload, setOpenModalUpload] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [clickedData, setClickedData] = useState({ uniqueId: '', link: '', fileType: '', fileName: '' });
  const [cache, setCache] = useState([]);

  useEffect(
    () => {
      setCache(props.cache);
    }, [props.cache]
  )

  useEffect(
    () => {
      setRows(props.data)
    }, [props.data]
  )

  const cellClicked = (event, uniqueId, link, fileType, fileName) => {
    props.onCellClicked(uniqueId, link, fileType, fileName);
    setAnchorEl(null);
  }

  const closeModal = () => {
    setOpenModal(false);
  }

  const submitModal = () => {
    props.onCreateFolder(folderName);
    setOpenModal(false);
  }

  const onBlurInput = (id, value) => {
    setFolderName(value);
  }

  const handleUpload = (fileData) => {
    props.handleUpload(fileData);
    setOpenModalUpload(false);
  }

  const handleOpenMore = (event, uniqueId, link, fileType, fileName) => {
    setAnchorEl(event.currentTarget);
    setClickedData({ uniqueId: uniqueId, link: link, fileType: fileType, fileName: fileName });
  }

  const handleCloseMore = () => {
    setAnchorEl(null);
  }

  const handleDelete = (event, uniqueId, fileType, fileName) => {
    setAnchorEl(null);
    props.handleDelete(uniqueId, fileType, fileName);
  }

  return (
    <div>
      <Toolbar className={classes.root}>
        <Typography className={classes.title} variant="h6" id="tableTitle" noWrap>
          {props.title}
        </Typography>
        <SearchField searchHandleChange={(value) => { props.handleSearch(value) }} />
        {cache.length === 0 &&
          <Tooltip className={classes.icon} title="Folder Baru">
            <IconButton aria-label="New Folder" onClick={() => {
              setFolderName('');
              setOpenModal(true);
            }}>
              <CreateNewFolderIcon style={{ color: '#fff' }} />
            </IconButton>
          </Tooltip>
        }
        <Tooltip className={classes.icon} title="File Baru">
          <IconButton aria-label="New File" onClick={() => {
            setOpenModalUpload(true);
          }}>
            <NoteAddIcon style={{ color: '#fff' }} />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size='small'
          aria-label="enhanced table"
        >
          {
            rows.length === 0 &&
            <caption style={{ textAlign: 'center' }}>Belum ada file</caption>
          }
          <EnhancedTableHead
            classes={classes}
            headCells={props.headCells}
          />
          <TableBody>
            {cache.length > 0 &&
              <TableRow
                style={{ height: 40 }}
                hover
                onClick={(event) => { props.backToParent() }}
                key="back"
              >
                <StyledTblCell padding="checkbox"><OpenIcon /></StyledTblCell>
                <StyledTblCell component="th" scope="row" padding="none">../</StyledTblCell>
                <StyledTblCell></StyledTblCell>
                <StyledTblCell></StyledTblCell>
              </TableRow>
            }
            {
              rows.length > 0 &&
              rows.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    style={{ height: 40 }}
                    hover
                    tabIndex={-1}
                    key={index}
                  >
                    <StyledTblCell padding="checkbox">
                      {
                        row.fileType === "folder"
                          ?
                          <FolderIcon />
                          :
                          <FileIcon />
                      }
                    </StyledTblCell>
                    {
                      props.headCells.map((cell, i) =>
                        <StyledTblCell key={i} component="th" onDoubleClick={event => cellClicked(event, row.uniqueId, row.link, row.fileType, row.nama)} id={labelId} scope="row" padding="none">
                          {row[cell.id]}
                        </StyledTblCell>
                      )
                    }
                    <StyledTblCell align='right'>
                      <IconButton onClick={event => { handleOpenMore(event, row.uniqueId, row.link, row.fileType, row.nama) }}>
                        <MoreIcon />
                      </IconButton>
                    </StyledTblCell>
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        id="morem-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
      >
        <MenuItem onClick={(event) => { cellClicked(event, clickedData.uniqueId, clickedData.link, clickedData.fileType, clickedData.fileName) }}>
          <ListItemIcon>{clickedData.fileType === 'file' ? <DownloadIcon /> : <OpenIcon />}</ListItemIcon>
          <ListItemText primary={clickedData.fileType === 'file' ? "Unduh" : "Buka"} />
        </MenuItem>
        <MenuItem onClick={(event) => { handleDelete(event, clickedData.uniqueId, clickedData.fileType, clickedData.fileName) }}>
          <ListItemIcon><DeleteIcon /></ListItemIcon>
          <ListItemText primary="Hapus" />
        </MenuItem>
      </Menu>
      <Modals
        modalTitle='Folder Baru'
        open={openModal}
        onCloseModal={() => { closeModal() }}
        onSubmitModal={() => { submitModal() }}
        type='confirm'
      >
        <InputField id='folderName' label='Nama Folder' variant='outlined' required={true} type="text" value={folderName} disabled={false} onBlur={(id, value) => onBlurInput(id, value)} isSubmit={false} />
      </Modals>
      <Uploader
        handleUpload={(data) => { handleUpload(data) }}
        open={openModalUpload}
        onCloseModal={() => { setOpenModalUpload(false) }}
      />
    </div>
  );
}

FileManager.propTypes = {
  title: PropTypes.string.isRequired,  //='' (string)
  allowEdit: PropTypes.bool,  //={} (boolean)
  headCells: PropTypes.array.isRequired,  //={headCells} (array object (there's an example at the bottom of this tag))
  data: PropTypes.array.isRequired, //={data} (array object)
  handleSearch: PropTypes.func, //={this.onSearch} (function (value))
  handleUpload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  cache: PropTypes.array.isRequired,
  onCreateFolder: PropTypes.func.isRequired,
  backToParent: PropTypes.func.isRequired,
}