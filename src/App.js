import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      empDetails: [],
      formDetails: {id:0, name: '', salary: ''},
    };
  }

  componentDidMount = () => {
    this.getEmpDetails();
  }

  getEmpDetails = () => {
    axios.get('http://localhost:7000/employees').then(res=>{
      this.setState({empDetails: res.data, formDetails: {id:0, name: '', salary: ''}});
    }).catch(error=>{
      console.log(error);
    })
  }

  textHandler = (e) => {
    let updatedState = {...this.state};
    updatedState.formDetails[e.target.id] = e.target.value;
    this.setState(updatedState);
  }

  submitReq = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/employees',this.state.formDetails).then(res=>{
      console.log(res.data);
      this.getEmpDetails();
    }).catch(error=>{
      console.log(error);
    })
  }

  render(){
    const tableDataJSX = this.state.empDetails.map(e=>{
      return(
        <tr key={e.id}>
          <th>{e.id}</th>
          <th>{e.name}</th>
          <th>{e.salary}</th>
        </tr>
      );
    });
    return (
      <div className="App">
        <table className={'table table-responsive'}>
          <thead>
            <tr>
              <th>{'Emp Id'}</th>
              <th>{'Name'}</th>
              <th>{'Salary'}</th>
            </tr>
          </thead>
          <tbody>
            {tableDataJSX}
          </tbody>
        </table>
        <form onSubmit={(e)=>this.submitReq(e)}>
              <input id='id' type='number' onChange={(e)=>this.textHandler(e)} value={this.state.formDetails.id} />
              <input id='name' type='text' onChange={(e)=>this.textHandler(e)} value={this.state.formDetails.name} />
              <input id='salary' type='number' onChange={(e)=>this.textHandler(e)} value={this.state.formDetails.salary} />
              <button className={'btn btn-primary'} type={'submit'}>Submit</button>
        </form>
      </div>
    );
  }

}

export default App;
