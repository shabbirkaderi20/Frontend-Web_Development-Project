/* eslint-disable react/jsx-pascal-case */
import React, {Component} from "react";
import { Breadcrumb, BreadcrumbItem, Button, Label, Col, Row } from "reactstrap";
import {Control, Form, Errors} from 'react-redux-form';
import { Link } from "react-router-dom";

const required= (val) => val && val.length;
const maxLength= (len) => (val) => !(val) || (val.length <= len);
const minLength= (len) => (val) => (val) && (val.length >= len);
const isNumber= (val) => !isNaN(Number(val))
const validEmail= (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export default class Contact extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit= this.handleSubmit.bind(this);
    }

    handleSubmit(values) {
        this.props.postFeedback(values.firstName, values.lastName, values.telNo, values.email, values.agree, values.contactType, values.message);
        // console.log("Current values are: "+ JSON.stringify(values));
        // alert("Current values are: "+ JSON.stringify(values));
        this.props.resetFeedbackForm();
    }

    render() { 
        return(
            <div className="container">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to= "/home">Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            Contact Us
                        </BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>Contact Us</h3>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                    <h3>Location Information</h3>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                            <h5>Our Address</h5>
                            <address>
                            121, Clear Water Bay Road<br />
                            Clear Water Bay, Kowloon<br />
                            HONG KONG<br />
                            <i className="fa fa-phone"></i>: +852 1234 5678<br />
                            <i className="fa fa-fax"></i>: +852 8765 4321<br />
                            <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                            </address>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <h5>Map of our Location</h5>
                    </div>
                    <div className="col-12 col-sm-11 offset-sm-1">
                        <div className="btn-group" role="group">
                            <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                            <a role="button" className="btn btn-info" href= "*"><i className="fa fa-skype"></i> Skype</a>
                            <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                        </div>
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12">
                        <h3>Send us your feedback</h3>
                    </div>
                    <div className="col-12 col-md-9">
                        <Form model= "feedback" onSubmit= {(values)=> this.handleSubmit(values)}>
                            <Row className= "form-group">
                                <Label htmlFor= "firstName" md= {2}>First name :</Label>
                                <Col md= {10}>
                                    <Control.text model= ".firstName"  
                                    id= "firstName" 
                                    name= "firstName" 
                                    className= "form-control" 
                                    placeholder= "First name"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className= "text-danger" 
                                        model= ".firstName" 
                                        show= "touched" 
                                        messages= {{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be less than 15 characters"
                                    }}/>
                                </Col>
                            </Row>
                            <Row className= "form-group">
                                <Label htmlFor= "lastName" md= {2}>Last name :</Label>
                                <Col md= {10}>
                                    <Control.text model= ".lastName"
                                    id= "lastName" 
                                    name= "lastName" 
                                    placeholder= "Last name" 
                                    className= "form-control" 
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}/>
                                    <Errors className= "text-danger" 
                                        model= ".lastName" 
                                        show= "touched" 
                                        messages= {{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be less than 15 characters"
                                    }}/>
                                </Col>
                            </Row>
                            <Row className= "form-group">
                                <Label htmlFor= "telNo" md= {2}>Tel. no. :</Label>
                                <Col md= {10}>
                                    <Control.text model= ".telNo" 
                                    id= "telNo" 
                                    name= "telNo" 
                                    placeholder= "00000*****" 
                                    className= "form-control"
                                    validators={{
                                        required, minLength: minLength(10), maxLength: maxLength(10), isNumber
                                    }}/>
                                    <Errors className= "text-danger" 
                                        model= ".telNo" 
                                        show= "touched" 
                                        messages= {{
                                            required: "Required ",
                                            minLength: "Must be exactly 10 digits ",
                                            maxLength: "Must be exactly 10 digits ",
                                            isNumber: "Enter only no.s"
                                    }}/>
                                </Col>
                            </Row>
                            <Row className= "form-group">
                                <Label htmlFor= "email" md= {2}>Email Id :</Label>
                                <Col md= {10}>  
                                    <Control.text model= ".email" 
                                    id= "email" 
                                    name= "email" 
                                    placeholder= "abc@xyz.com" 
                                    className= "form-control" 
                                    validators={{
                                        required, validEmail
                                    }}/>
                                    <Errors className= "text-danger" 
                                        model= ".email" 
                                        show= "touched" 
                                        messages= {{
                                            required: "Required",
                                            validEmail: "Invalid email Id"
                                    }}/>
                                </Col>
                            </Row>
                            <Row className= "form-group">
                                <Col md= {{size: 6, offset: 2}}>
                                    <div className= "form-check">
                                        <Label check>
                                            <Control.checkbox model= ".agree" 
                                            className= "form-check-input" 
                                            name= "agree"/> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md= {{size: 3, offset: 1}}>
                                    <Control.select model= ".contactType" 
                                    name= "contactType" 
                                    className= "form-control">
                                        <option>Tel. no.</option>
                                        <option>Email Id</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className= "form-group">
                                <Label htmlFor= "feedback" md= {2}>Your feedback :</Label>
                                <Col md= {10}>
                                    <Control.textarea model= ".message" 
                                    id= "message" 
                                    name= "message" 
                                    placeholder= "Type your message here..." 
                                    rows= "12" 
                                    className= "form-control"
                                    validators={{
                                        required, minLength: minLength(30), maxLength: maxLength(250)
                                    }}/>
                                    <Errors className= "text-danger" 
                                        model= ".message" 
                                        show= "touched" 
                                        messages= {{
                                            required: "Required",
                                            minLength: "We value your feedback. So, we expect it to be greater than 30 characters",
                                            maxLength: "We value your feedback. So, we expect it to be less than 250 characters"
                                    }}/>
                                </Col>
                            </Row>
                            <Row className= "form-group">
                                <Col md= {{size: 10, offset: 2}}>
                                    <Button type= "submit" color= "primary">Send feedback</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}