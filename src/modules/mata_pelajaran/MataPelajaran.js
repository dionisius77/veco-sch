import React, { Component } from "react";
import { connect } from "react-redux";
import { pushLoading } from "../../components/layout/ActionLayout";
import Button from "../../components/button/Button";
import Select from "../../components/select/Select";
import InputField from "../../components/input_field/InputField";
import DataTables from "../../components/data_tables/DataTables";

class MataPelajaran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pilihan: '',
      onSubmit: false,
      nama: ''
    }
    this.onSelectChange = this.onSelectChange.bind(this);
    this.clicked = this.clicked.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.props.setLoading(false);
  }

  onSelectChange = (name, value) => {
    console.log(name, ' : ', value);
  }

  onInputChange = (id, nama) => {
    console.log(id, ' : ', nama);
  }

  clicked = () => {
    this.setState({ onSubmit: true });
  }

  onChangePage = (page, limit) => {
    console.log('page : ', page);
    console.log('limit : ', limit);
  }

  onSearch = (value) => {
    console.log(value);
  }

  render() {
    return (
      <div>
        <h2>STUFF</h2>
        <p>Mauris sem velit, vehicula eget sodales vitae,
          rhoncus eget sapien:</p>
        <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
        <Button type="negative" disabled={false} text="Test" onClick={this.clicked} />
        <br />
        <Select name='urutan' id='urutan' label='Urutan' options={this.props.selectOption} value={this.state.pilihan} onChange={this.onSelectChange} isSubmit={this.state.onSubmit} disable={false} required={true} />
        <br />
        <InputField id='nama' label='Nama' required={true} type="text" value={this.state.nama} disabled={false} onChange={this.onInputChange} isSubmit={this.state.onSubmit} />
        <br />
        <DataTables
          tableName='Nutrisi'
          page={0}
          dataLength={this.props.dataTables.length}
          headCells={this.props.headCells}
          data={this.props.dataTables}
          orderConfig={false}
          handleChangePage={this.onChangePage}
          handleSearch={this.onSearch}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectOption: [
    {
      value: '1',
      text: '1'
    },
    {
      value: '2',
      text: '2'
    },
    {
      value: '3',
      text: '3'
    },
    {
      value: '4',
      text: '4'
    },
    {
      value: '5',
      text: '5'
    },
  ],
  dataTables: [
    { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
    { name: 'Donut', calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
    { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
    { name: 'Frozen yoghurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
    { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    { name: 'Honeycomb', calories: 408, fat: 3.2, carbs: 87, protein: 6.5 },
    { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
    { name: 'Jelly Bean', calories: 375, fat: 0.0, carbs: 94, protein: 0.0 },
    { name: 'KitKat', calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
    { name: 'Lollipop', calories: 392, fat: 0.2, carbs: 98, protein: 0.0 },
    { name: 'Marshmallow', calories: 318, fat: 0, carbs: 81, protein: 2.0 },
    { name: 'Nougat', calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
    { name: 'Oreo', calories: 437, fat: 18.0, carbs: 63, protein: 4.0 },
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