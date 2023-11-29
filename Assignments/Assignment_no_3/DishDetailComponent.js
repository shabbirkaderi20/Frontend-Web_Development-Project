/* eslint-disable react/jsx-pascal-case */
import React, {Component} from 'react';
import {Card, CardImg, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, CardText, 
    Button, Modal, ModalHeader, ModalBody, Label, Col, Row} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required= (val) => val && val.length;
const maxLength= (len) => (val) => !(val) || (val.length <= len);
const minLength= (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state= {
            isModalOpen: false
        };

        this.toggleModal= this.toggleModal.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    
    
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current values are: "+ JSON.stringify(values));
        alert("Current values are: "+ JSON.stringify(values));
        this.setState({
            isModalOpen: !this.state.isModalOpen
          });
    }

    render() {
        return (<div>
        
        <Button className= "btn btn-outline-dark btn-rounded" online onClick= {this.toggleModal}>
          <span className='fa fa-pencil fa-lg'></span> Submit comment
        </Button>
        
        <Modal isOpen= {this.state.isModalOpen} toggle= {this.toggleModal}>
            <ModalHeader toggle= {this.toggleModal}>Submit comment</ModalHeader>
            <ModalBody>
              
                <LocalForm onSubmit= {(values)=> this.handleSubmit(values)}>
                    <Row className= "form-group">
                        <Col>
                        <Label htmlFor= "rating">Rating</Label>
                            <Control.select model= ".rating" 
                            name= "rating" 
                            className= "form-control">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                        </Col>
                    </Row> 
                    <Row className= "form-group">
                        <Col>
                        <Label htmlFor= "author">Your Name</Label>
                            <Control.text model= ".author" 
                            id= "author" 
                            name= "author" 
                            className= "form-control" 
                            placeholder= "Name"
                            validators={{
                                required, minLength: minLength(3), maxLength: maxLength(20)
                            }}/>
                            <Errors className= "text-danger" 
                                        model= ".author" 
                                        show= "touched" 
                                        messages= {{
                                            required: "Required",
                                            minLength: "Must be greater than 2 characters",
                                            maxLength: "Must be less than 20 characters"
                                    }}/>
                        </Col>
                    </Row>
                    <Row className= "form-group">
                        <Col>
                        <Label htmlFor= "comment">Comment</Label>
                            <Control.textarea model= ".comment" id= "comment" name= "comment" rows= "6" className= "form-control" placeholder= "type your comment here"/> 
                        </Col>
                    </Row>
                    <Button type= "submit" value= "submit" color= "primary">Submit</Button>
                </LocalForm>
             
            </ModalBody>
        </Modal>
        </div>);
  }
}

    function RenderComments({comments}){
        return <div className='col-12 col-md-5 m-1'>
            <h4>Comments</h4>
            <ul className='list-unstyled'>
                {
                    comments.map((comment) => {
                        return (
                            <li key= {comment.id}>
                                <p>{comment.comment}</p>
                                <p>--{comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </li>
                        );
                    })
                }
            </ul><br/>
            <CommentForm/>
        </div>
    }

    function RenderDish({dish}) {
            return (<div className='col-12 col-md-5 m-1'>
                <Card>
                    <CardImg width= "100%" src= {dish.image} alt= {dish.name}/>
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>
                </Card>
            </div>);
    }

    const DishDetail = (props) => {
    if(props.dish !== null) {    
        return <div className='container'>
             <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments}/>
                </div>
        </div>;
    }else {
        return null;
    }
  }

  export default DishDetail;