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
    const newMember = { name: this.newMemberInput.value,
                        type: this.newMemberTypeSelect.value };
    const isOnTheList = members.filter(member => {
        return member.name === newMember.name;
    })
    const isAlreadyEmployee = newMember.type === "1" && members.filter(member => {
        return member.type === newMember.type;
    })
  
    if(isOnTheList.length > 0){
        this.setState({
            message: 'This item is already on the list.'
        })
    } else if (isAlreadyEmployee.length > 0){
        this.setState({
            message: 'Only one employee can be added to the list.'
        })
    } else {
        newMember !== '' && this.setState({
            members: [...this.state.members, newMember],
            message: ''
        })    
    }
    this.addForm.reset();
}
removeItem(member){
    const newmembers = this.state.members.filter(newMember => {
        return newMember !== member;
    })
    this.setState({
        members: [...newmembers]
    })
}
calculatePaycheck(){
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
                            <label htmlFor="newMemberInput">Add Member</label>
                            <input ref={input => this.newMemberInput = input } type="text" placeholder="Mark" id="newMemberInputInput"/>
                            <select ref={select => this.newMemberTypeSelect = select } type="text" placeholder="2" id="newMemberTypeSelect">
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
                                <th>Member</th>
                                <th>Type</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            members.map(member => {
                                return (
                                    <tr key={member.name}>
                                        <th scope="row">1</th>
                                        <td>{member.name}</td>
                                        <td>{member.type}</td>
                                        <td className="text-right">
                                            <button onClick={(e) => this.removeItem(member)} type="button" className="btn btn-danger">Remove</button>
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