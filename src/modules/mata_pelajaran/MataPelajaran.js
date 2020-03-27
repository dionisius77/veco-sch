import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading } from "../../components/layout/ActionLayout";
import DataTables from "../../components/data_tables/DataTables";

class MataPelajaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(false);
  }

  onChangePage = (page, limit) => {
    console.log('page : ', page);
    console.log('limit : ', limit);
  }

  onSearch = (value) => {
    console.log(value);
  }

  handleAdd = () => {
    console.log("add some data");
  }

  handleDownload = () => {
    console.log("download data excel");
  }

  handleEdit = (checked) => {
    console.log('checked for edit : ', checked);
  }

  handleDelete = (checked) => {
    console.log('checked for delete : ', checked);
  }

  render() {
    return (
      <DataTables
        tableName='Mata Pelajaran'
        page={0}
        dataLength={this.props.dataTables.length}
        headCells={this.props.headCells}
        data={this.props.dataTables}
        orderConfig={false}
        orderBy='name'
        handleDownload={this.handleDownload}
        handleChangePage={this.onChangePage}
        handleSearch={this.onSearch}
        handleAdd={this.handleAdd}
        handleEdit={this.handleEdit}
        handleDelete={this.handleDelete}
      />
    );
  }
}

const mapStateToProps = state => ({
  dataTables: [
    { uniqueId: 'Cupcake', name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { uniqueId: 'Donut', name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    { uniqueId: 'Eclair', name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { uniqueId: 'Frozen yoghurt', name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { uniqueId: 'Gingerbread', name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { uniqueId: 'Honeycomb', name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    { uniqueId: 'Ice cream sandwich', name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { uniqueId: 'Jelly Bean', name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
    { uniqueId: 'KitKat', name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
    { uniqueId: 'Lollipop', name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
    { uniqueId: 'Marshmallow', name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0 },
    { uniqueId: 'Nougat', name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
    { uniqueId: 'Oreo', name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 },
  ],
  headCells: [
    { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
    { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
  ],
});

const mapDispatchToProps = dispatch => ({
  setLoading: value => dispatch(pushLoading(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(MataPelajaran);