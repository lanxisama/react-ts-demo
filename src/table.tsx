// import React from 'react'
import * as React from 'react'
  
 
 interface isState {
  name : string
  age : number,
  editName:string,
  editAge:number,
  data : tableData[]
  old : tableData[]
}
interface tableData{
  name:string,
  age:number,
  edit:boolean
}
export default class Table extends React.Component<any,
isState
> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: 1,
      editName:'',
      editAge:1,
      data: [],
      old: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.InputChange = this.InputChange.bind(this);
    this.click = this.click.bind(this);
    this.search = this.search.bind(this);
    this.reset = this.reset.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.saveRow = this.saveRow.bind(this);
    this.ageChange = this.ageChange
    this.nameChange = this.nameChange
  }
  nameChange(e,idx){
    console.log("名字", e.target.value)
    let obj = [...this.state['data']]
    obj[idx].name = e.target.value;
    this.setState({
      data:obj,
      editName:e.target.value
    })
  }
  ageChange(e,idx){
    console.log("年龄",idx)
      let obj = [...this.state['data']]
      obj[idx].age = e.target.value;
      this.setState({
        data:obj,
        editAge:e.target.value
      })
  }
  handleChange(e) {
    this.setState({ age: e.target.value });
  }
 
  InputChange(e) {
    this.setState({ name: e.target.value });
  }
  click() {
    if (this.state["name"]) {
      let message:tableData = {
        name: this.state["name"],
        age: this.state["age"],
        edit: false
      };
      this.state["data"].push(message);
      this.setState({ data: this.state["data"] });
    }
  }

  search(){
    this.setState({ old: this.state["data"] });
    let filter = this.state["data"].filter(d => {
      if (d.name == this.state["name"]) {
        return d;
      } else {
        return "";
      }
    });
    this.setState({ data: filter });
  }
  reset() {
    this.setState({ data: this.state["old"] });
  }
 
  saveRow(idx:number){
    this.state["data"][idx].edit =false;
    this.setState({ data: this.state["data"] });
  }
  delete(idx: number) {
    this.state["data"].splice(idx, 1);
    this.setState({ data: this.state["data"] });
  }
  edit(idx: number,name:string,age:number) {
    
    this.state["data"][idx].edit = !this.state["data"][idx].edit;
    console.log(this.state['data'][idx])
    this.setState({ data: this.state["data"],editName:name,editAge:age });
  }

  render() {
    const ages: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
      <div>
        <header>
          <form>
            姓名:
            <input
              name="name"
              value={this.state["name"]}
              onChange={this["InputChange"]}
              placeholder="name"
            />
            年龄:
            <select
              name="age"
              value={this.state["age"]}
              onChange={this["handleChange"]}
            >
              {ages.map(i => {
                return <option value={i}>{i}</option>;
              })}
            </select>
            &nbsp;
          </form>
          <div onClick={this.click}>Save</div>&nbsp;
          <div onClick={this.search}>Search</div>&nbsp;
          <div onClick={this.reset}>X</div>
        </header>
        <div className="content">
          {this.state["data"].map((i, idx) => {
            return (
              <div>
                {i.edit ? (
                  <div>
                    <input value={this.state['editName']}
                    onChange={(ev)=>this.nameChange.call(this,ev,idx)}
                    ></input>
                    <select
                    name="age"
                    value={this.state['editAge']}
                    onChange={(ev)=>this.ageChange.call(this,ev,idx)}
                  >
                    {ages.map(i => {
                      return <option value={i}>{i}</option>;
                    })}
                  </select>
                    <div onClick={()=>this.saveRow(idx)}>SaveRow</div>
                  </div>
                ) : (
                  <div>
                    姓名:{i.name} 年龄:{i.age}
                  </div>
                )}
                <span className="btn" onClick={() => this.delete(idx)}>
                  删除
                </span>
                <span className="btn" onClick={() => this.edit(idx,i.name,i.age)}>
                  编辑
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
