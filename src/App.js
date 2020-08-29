import React, { Component } from "react";
import './App.css';

// Regular expression used to validate email address format
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({formErrors, ...rest }) => {
    let valid=true;
    //check each field and verify it's not blank
    Object.values(formErrors).forEach( val => {
      val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
      val=== null && (valid = false)
    });

    return valid;
}

class App extends Component {
  constructor (props) {
    super(props);
    // set the initial contents of the fields
    this.state = {
      firstName: "",
      lastName: "",
      npiNumber: "",
      businessAddress: "",
      telephone: "",
      email: "",
      // set the initial contents of the error values for each field
      formErrors: {
        firstName: "",
        lastName: "",
        npiNumber: "",
        businessAddress: "",
        telephone: "",
        email: ""
      }
    }
  }

  //stay on this page if there are no values entered
  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

    //console.log("Name: ", name);
    //console.log("value: ", value);

    switch (name) {
      case 'firstName':
        formErrors.firstName = value.length < 3 
          ? "minimum 3 characters required"
          : "";
        break;
      case 'lastName':
        formErrors.lastName = value.length < 3 
          ? "minimum 3 characters required"
          : "";
        break;
      case 'npiNumber':
        formErrors.npiNumber = value.length < 6 
          ? "minimum 6 characters required"
          : "";
        break;
      case 'businessAddress':
        formErrors.businessAddress = value.length < 6  
          ? "minimum 6 characters required"
          : "";
        break;
      case 'telephone':
        formErrors.telephone = value.length < 10
          ? "minimum 10 characters required"
          : "";
      break;
    case 'email':
      formErrors.email = emailRegex.test(value) 
        ? ""
        : "invalid email address";
      break;
    case 'password':
      formErrors.password = value.length < 6  
        ? "minimum 6 characters required"
        : "";
      break;
    default:
      break;
    }

    this.setState({formErrors, [name]: value}, () => console.log(this.state) );
  }

  render() {
    const {formErrors} = this.state;
  return (
    <div className="wrapper">
     <div className="form-wrapper">
       <h1>Register Account</h1>
       <form  noValidate>
         <div className="firstName">
           <label htmlFor="firstName">First Name</label>
           <input
              className={formErrors.firstName.length > 0 ? "error" : null} 
              placeholder="First Name" 
              type="text" 
              name="firstName" 
              noValidate 
              onChange={this.handleChange}/><br/>
          {formErrors.firstName.length > 0 && (
            <span className="errorMessage">{formErrors.firstName}</span>
          )}
         </div>
         <div className="lastName">
           <label htmlFor="lastName">Last Name</label>
           <input 
              className={formErrors.lastName.length > 0 ? "error" : null}   
              placeholder="Last Name" 
              type="text" 
              name="lastName" 
              noValidate 
              onChange={this.handleChange}/><br/>
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
         </div>
         <br/>
         <div className="npiNumber">
           <label htmlFor="npiNumber">NPI Number</label>
           <input  
              className={formErrors.npiNumber.length > 0 ? "error" : null}  
              placeholder="NPI Number" 
              type="npiNumber" 
              name="npiNumber" 
              noValidate 
              onChange={this.handleChange}/><br/>
              {formErrors.npiNumber.length > 0 && (
                <span className="errorMessage">{formErrors.npiNumber}</span>
              )}
         </div>
         <div className="businessAddress">
           <label htmlFor="businessAddress">Business Address</label>
           <input  
              className={formErrors.businessAddress.length > 0 ? "error" : null}  
              placeholder="Business Address" 
              type="businessAddress" 
              name="businessAddress" 
              noValidate 
              onChange={this.handleChange}/><br/>
              {formErrors.businessAddress.length > 0 && (
                <span className="errorMessage">{formErrors.businessAddress}</span>
              )}
         </div>
         <div className="telephone">
           <label htmlFor="telephone">Telephone</label>
           <input  
              className={formErrors.telephone.length > 0 ? "error" : null}  
              placeholder="Telephone" 
              type="telephone" 
              name="telephone" 
              noValidate 
              onChange={this.handleChange}/><br/>
              {formErrors.telephone.length > 0 && (
                <span className="errorMessage">{formErrors.telephone}</span>
              )}
         </div>
         <div className="email">
           <label htmlFor="email">Email</label>
           <input 
              className={formErrors.email.length > 0 ? "error" : null}   
              placeholder="Email" 
              type="email" 
              name="email" 
              noValidate 
              onChange={this.handleChange}/><br/>
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
         </div>
         <br/>
         <br/>
         <div className="createAccount">
           <button className="buttonbox" type="submit">Register</button>
           <br/>
           <small>Already Have an Account?</small>
         </div>
       </form>
     </div>
    </div>
  );
}
}
export default App;
//--onSubmit={this.handleSubmit}