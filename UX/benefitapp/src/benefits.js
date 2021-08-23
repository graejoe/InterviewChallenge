import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';


class Benefits extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          members: [],
          message: '',
          benefits: [],
          paycheck: {
              gross: '',
              paychecks: ''
          },
          }
        };

addItem(e){
    e.preventDefault();
    const { members } = this.state;
    const newItem = { name: this.newItemName.value,
                        type: this.newItemType.value };
    const isOnTheList = members.filter(buyItem => {
        return buyItem.name === newItem.name;
    })
    const isAlreadyEmployee = newItem.type === "1" && members.filter(buyItem => {
        return buyItem.type === newItem.type;
    })
    console.log(isAlreadyEmployee);
   
    if(isOnTheList.length > 0){
        this.setState({
            message: 'This item is already on the list.'
        })
    } else if (isAlreadyEmployee.length > 0){
        this.setState({
            message: 'Only one employee can be added to the list.'
        })
    } else {
        newItem !== '' && this.setState({
            members: [...this.state.members, newItem],
            message: ''
        })    
    }
    this.addForm.reset();
}
removeItem(item){
    const newmembers = this.state.members.filter(buyItem => {
        return buyItem !== item;
    })
    this.setState({
        members: [...newmembers]
    })
}
calculatePaycheck(){
    console.log(this.state.members);
    const requestOptions = { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(this.state.members)
      };
       // get all entities - GET
      fetch('/api/benefits', requestOptions)
       .then(response => response.json())
       .then(response => { this.setState({benefits: response}) })
       .catch(err => { console.log(err); 
       });
    const getOptions ={
        method:'GET',
        headers: { 'Content-Type': 'application/json'}
    };
    fetch('/api/benefits', getOptions)
        .then(response => response.json())
        .then(response => { this.setState({paycheck: response}) })
        .catch(err => { console.log(err);

    });

}
clearAll(){
    this.setState({members: []

    });
    this.setState({benefits: {
        employeeCost: '',
        employeeDiscount: '', 
        dependentCost: '', 
        dependentDiscount: '', 
        totalCost: ''   

    }});

    this.setState({paycheck: {
        gross: '',
        paychecks: ''

    }});
}

   render() {
        const {members, message} = this.state;
        return (
            <div>
                <header>
                    <h1>Calculate Member Benefit Cost</h1>
                    <form ref={input => this.addForm = input } onSubmit={(e) => {this.addItem(e)}}>
                        <div>
                            <label htmlFor="newItemInput">Add New Item</label>
                            <input ref={input => this.newItemName = input } type="text" placeholder="Bread" id="newItemNameInput"/>
                            <select ref={select => this.newItemType = select } type="text" placeholder="2" id="newItemTypeSelect">
                                <option value="1">Employee</option>
                                <option value="2">Dependant</option>
                            </select>
                        </div>
                        <button className="btn btn-primary" type="submit">Add</button>
                    </form>

                </header>
                <div className="content">
                    {
                        message !== '' && <p className="message text danger">{message}</p>
                    }
                    <table className="table">
                        
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            members.map(item => {
                                return (
                                    <tr key={item.name}>
                                        <th scope="row">1</th>
                                        <td>{item.name}</td>
                                        <td>{item.type}</td>
                                        <td className="text-right">
                                            <button onClick={(e) => this.removeItem(item)} type="button" className="btn btn-danger">Remove</button>
                                        </td>
                                    </tr>
                                    )
                                 })
                            }
                        </tbody>
                    </table>
                    <button onClick={(e) => this.calculatePaycheck()}>Calculate</button>
                    <button onClick={(e) => this.clearAll()}>Clear</button>
                </div>
                <div>
                { this.state.paycheck.gross !== '' && <p>
                <h1>Benefit Cost Calculation</h1>
                <table className="table">
                        <thead>
                            <tr>
                                
                                <th>Cost</th>
                                <th>Value</th>
                                <th>Discounts</th>
                            </tr>
                        </thead>
                        <tr>
                            <td>Employee Costs:</td>
                            <td>${this.state.benefits.employeeCost} / year</td>
                            <td>{this.state.benefits.employeeDiscount}</td>
                        </tr>
                        <tr>
                            <td>Dependent Costs:</td>
                            <td>${this.state.benefits.dependentCost} / year</td>
                            <td>{this.state.benefits.dependentDiscount}</td>
                        </tr>
                        <tr>
                            <td>Total Costs:</td>
                            <td>${this.state.benefits.totalCost} / year</td>
                            
                        </tr>
                    </table>


                    </p>}
                </div>
                <div>
                    { this.state.paycheck.gross !== '' && <p>
                    <h1>Sample Paycheck</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                
                                <th>Item</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tr>
                            <td>Gross Income:</td>
                            <td>${this.state.paycheck.gross}</td>
                        </tr>
                        <tr>
                            <td>Deductions per Paycheck:</td>
                            <td>${(this.state.benefits.totalCost / this.state.paycheck.paychecks).toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Net Income:</td>
                            <td>${(this.state.paycheck.gross - (this.state.benefits.totalCost / this.state.paycheck.paychecks)).toFixed(2)}</td>
                        </tr>
                    </table>
                    </p>
                    }
                </div>
            </div>
        );
    }
  }

  export default Benefits;