// sample data
// data: [
//   { uniqueId: 'Cupcake', name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
//   { uniqueId: 'Donut', name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
//   { uniqueId: 'Eclair', name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
//   { uniqueId: 'Frozen yoghurt', name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
//   { uniqueId: 'Gingerbread', name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
//   { uniqueId: 'Honeycomb', name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
//   { uniqueId: 'Ice cream sandwich', name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
//   { uniqueId: 'Jelly Bean', name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
//   { uniqueId: 'KitKat', name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
//   { uniqueId: 'Lollipop', name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
//   { uniqueId: 'Marshmallow', name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0 },
//   { uniqueId: 'Nougat', name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
//   { uniqueId: 'Oreo', name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 },
// ],
// sample header
// headCells: [
//   { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//   { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//   { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//   { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//   { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ],
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import DownloadIcon from '@material-ui/icons/GetApp';
import SearchField from '../search_field/SearchField';
import ConfigIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close';
import Arrow from '@material-ui/icons/KeyboardArrowRight';
import { Zoom } from 'react-reveal';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
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

function EnhancedTableHead(props) {
  const {
    classes,
    // onSelectAllClick,
    order,
    // numSelected,
    // rowCount,
    onRequestSort,
    headCells,
    orderConfig
  } = props;
  const [orderBy, setOrderBy] = React.useState('')

  React.useEffect(
    () => {
      setOrderBy(props.orderBy)
    }, [props.orderBy]
  )

  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{ height: 50 }}>
        <StyledTblCell padding="checkbox">
          {/* <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          /> */}
        </StyledTblCell>
        {headCells.map(headCell => (
          <StyledTblCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {
              orderConfig
                ?
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
                :
                <div style={{ fontWeight: 600 }}>
                  {headCell.label}
                </div>

            }
          </StyledTblCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    flexGrow: 1
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        transition: 'background-color 0.8s'
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
        transition: 'background-color 0.8s'
      },
  title: {
    flexGrow: 1,
  },
  icon: {
    marginTop: 4
  }
}));

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  const [showConfigs, setShowConfigs] = React.useState(false);
  const [showParent, setShowParent] = React.useState(true);
  const [showChild, setShowChild] = React.useState(false);

  const handleConfigs = () => {
    props.handleConfigs(!showConfigs);
    setShowParent(!showParent);
    setShowChild(!showChild);
    setTimeout(() => {
      setShowConfigs(!showConfigs);
    }, 500);
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: showConfigs,
      })}
    >
      {showConfigs ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {
            (props.handleDelete || props.handleEdit) &&
            <div>{numSelected} selected</div>
          }
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" noWrap>
            {props.label}
          </Typography>
        )}

      {showConfigs ? (
        <Zoom collapse bottom cascade opposite duration={500} when={showChild}>
          <div>
            {props.handleAdd &&
              <Tooltip title="Add Data" className={classes.icon}>
                <IconButton aria-label="add Data" onClick={() => { handleConfigs(); props.handleAdd() }}>
                  <AddIcon style={{ color: '#424242' }} />
                </IconButton>
              </Tooltip>
            }
            {props.handleEdit &&
              <Tooltip title="Edit">
                <IconButton aria-label="edit" onClick={() => { props.handleEdit() }}>
                  <EditIcon style={{ color: '#424242' }} />
                </IconButton>
              </Tooltip>
            }
            {props.handleDelete &&
              <Tooltip title="Delete">
                <IconButton aria-label="delete" onClick={() => { props.handleDelete() }}>
                  <DeleteIcon style={{ color: '#424242' }} />
                </IconButton>
              </Tooltip>
            }
            <Tooltip title="Close">
              <IconButton aria-label="close" onClick={handleConfigs}>
                <CloseIcon style={{ color: '#424242' }} />
              </IconButton>
            </Tooltip>
          </div>
        </Zoom>
      ) : (
          <Zoom collapse bottom cascade opposite duration={500} when={showParent}>
            <div>
              <SearchField searchHandleChange={props.handleSearch} />
              {props.allowEdit &&
                <Tooltip title="Configuration" className={classes.icon}>
                  <IconButton aria-label="configuration" onClick={handleConfigs}>
                    <ConfigIcon style={{ color: '#fff' }} />
                  </IconButton>
                </Tooltip>
              }
              {props.handleDownload &&
                <Tooltip title="Download Excel" className={classes.icon}>
                  <IconButton aria-label="download excel" onClick={() => { props.handleDownload() }}>
                    <DownloadIcon style={{ color: '#fff' }} />
                  </IconButton>
                </Tooltip>
              }
            </div>
          </Zoom>
        )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 500,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));

export default function DataTables(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  // const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [label, setLabel] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [showConfigs, setShowConfigs] = React.useState(false);

  React.useEffect(
    () => {
      setCount(props.dataLength);
    }, [props.dataLength]
  )

  React.useEffect(
    () => {
      setRows(props.data);
    }, [props.data]
  )

  React.useEffect(
    () => {
      setPage(props.page);
    }, [props.page]
  )

  React.useEffect(
    () => {
      setLabel(props.tableName);
    }, [props.tableName]
  )

  // React.useEffect(
  //   () => {
  //     setDense(props.dense);
  //   }, [props.dense]
  // )

  React.useEffect(
    () => {
      setOrderBy(props.orderBy)
    }, [props.orderBy]
  )

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, unique) => {
    const selectedIndex = selected.indexOf(unique);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, unique);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    props.handleChangePage(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    props.handleChangePage(page, parseInt(event.target.value, 10));
  };

  const handleSearch = value => value.length > 3 ? props.handleSearch(value) : null;

  // const handleAdd = () => { props.handleAdd() }

  const isSelected = name => selected.indexOf(name) !== -1;

  // const handleDownload = () => { props.handleDownload() }

  // const handleEdit = () => { props.handleEdit(selected) }

  // const handleDelete = () => { props.handleDelete(selected) }

  // const handleConfigs = (value) => {
  //   setShowConfigs(value);
  //   if (!value) { setSelected([]) }
  // }

  const goToDetail = (event, clicked) => {
    if (props.goToDetail !== undefined && !showConfigs) {
      props.goToDetail(clicked);
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          label={label}
          handleSearch={handleSearch}
          handleAdd={props.handleAdd}
          handleDownload={props.handleDownload}
          handleEdit={props.handleEdit ? () => { props.handleEdit(selected) } : undefined}
          handleDelete={props.handleDelete ? () => { props.handleDelete(selected) } : undefined}
          handleConfigs={(value) => {
            setShowConfigs(value);
            if (!value) { setSelected([]) }
          }}
          allowEdit={props.allowEdit}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size='small'
            aria-label="enhanced table"
          >
            {
              rows.length === 0 &&
              <caption style={{ textAlign: 'center' }}>Data not found</caption>
            }
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={props.headCells}
              orderConfig={props.orderConfig}
            />
            {
              rows.length > 0 &&
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.uniqueId);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        style={{ height: 40 }}
                        hover
                        onClick={event => goToDetail(event, row.uniqueId)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.uniqueId}
                        selected={isItemSelected}
                      >
                        <StyledTblCell padding="checkbox">
                          {showConfigs
                            ?
                            <Checkbox
                              onClick={event => handleClick(event, row.uniqueId)}
                              checked={isItemSelected}
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                            :
                            <Arrow />
                          }
                        </StyledTblCell>
                        {
                          props.headCells.map((cell, i) =>
                            cell.numeric
                              ?
                              <StyledTblCell key={i} align='right'>
                                {row[cell.id]}
                              </StyledTblCell>
                              :
                              <StyledTblCell key={i} component="th" id={labelId} scope="row" padding="none">
                                {row[cell.id]}
                              </StyledTblCell>
                          )
                        }
                      </TableRow>
                    );
                  })}
              </TableBody>
            }
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

DataTables.propTypes = {
  tableName: PropTypes.string.isRequired,  //='' (string)
  allowEdit: PropTypes.bool,  //={} (boolean)
  page: PropTypes.number.isRequired, //={} (int)
  dataLength: PropTypes.number.isRequired, //={} (int)
  headCells: PropTypes.array.isRequired,  //={headCells} (array object (there's an example at the bottom of this tag))
  data: PropTypes.array.isRequired, //={data} (array object)
  orderConfig: PropTypes.bool,  //={} (boolean)
  orderBy: PropTypes.string,  //='' (string)
  handleDownload: PropTypes.func, //={this.handleDownload} (function ())
  handleChangePage: PropTypes.func, //={this.onChangePage} (function (page, limit))
  handleSearch: PropTypes.func, //={this.onSearch} (function (value))
  handleAdd: PropTypes.func,  //={this.handleAdd} (function ())
  handleEdit: PropTypes.func, //={this.handleEdit} (function (checked))
  handleDelete: PropTypes.func, //={this.handleDelete} (function (checked))
  goToDetail: PropTypes.func, //={} (function (checked))
}