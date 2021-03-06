import React, {Component} from 'react';
import {Card, CardImg,CardBody, CardTitle, CardText,Breadcrumb, BreadcrumbItem, Modal , Button, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

import {FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

function RenderDish({dish}){
    console.log("inside dish detail component"+JSON.stringify(dish.image))
    console.log(baseUrl+ JSON.stringify(dish.image))
    if (dish != null){
        return (
            <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <div>
                <Card>
                    <CardImg  src={baseUrl+dish.image}  alt={baseUrl+dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            </FadeTransform>
        )
    }
    else{
        return(
            <div></div>
        );
    }
}


function RenderComments({comments, postComment, dishId}) {
    console.log("comments is:"+JSON.stringify(comments))
    if(comments != null) {
        console.log("dish is "+postComment)
        const commentsList = comments.map((comment) => {
            console.log("Menu  page  comments"+JSON.stringify(comment))
            return (
                     <Stagger in>
                        <Fade in> 
                        <ul key={comment} >
                            <li className="no-bullet">{comment.comment}</li>
                            <li className="no-bullet">--{comment.author}, {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(comment.date))}</li>
                        </ul>
                        </Fade>
                    </Stagger>                     
                
            )
        });
        return(
            <div >
                <Stagger in>
                    {commentsList}
                    <CommentForm dishId={dishId} postComment={postComment}  />
                </Stagger>
                
            </div>
        )   
    }
    else {
        return (
        <div></div>
        );
    }
    }


class CommentForm extends Component{
    constructor(props){
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isNavOpen: false,
            isModalOpenL: false
        };
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        
        // console.log(this.props.dishId)
        console.log("Current state is"+ JSON.stringify(values));
        alert("current state is" + JSON.stringify(values));
    }
    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span >Submit Button</span></Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating"
                                            className="form-control" name="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                        </Control.select>
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="author" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".author" className="form-control"
                                            id="author" name="author" placeholder="Your Name"
                                            validators={{
                                                required,
                                                minLength: minLength(3),
                                                maxLength: maxLength(15),
                                            }}
                                        />
                                        <Errors
                                            className="text-danger"
                                            model=".author"
                                            show="touched"
                                            messages={{
                                                required: "Required",
                                                minLength: "Must be greater than 2 characters",
                                                maxLength: "Must be 15 characters or less",
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Label htmlFor="comment" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comment" className="form-control"
                                            id="comment" name="comment" rows="6" />
                                    </Col>
                                </Row>
                                <Row className="form-group">
                                    <Col md={12}>
                                        <Button type="submit" color="primary">Submit</Button>
                                    </Col>
                                </Row>
                            </LocalForm>
                        </ModalBody>
                    </Modal>
            </div>
        )
    }
}

const DishDetail = (props) =>{
    console.log("props comments is.."+props.comments)
    if(props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        )
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }
    else if (!props.dish){
        return null;
    }
    return(
        <div className="container">
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <p>{props.test}</p>
                    <hr/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                    postComment={props.postComment}
                    dishId={props.dish.id}
                    />
                </div>
                </div>
        </div>    
    )
}
      
        
    
      
export default DishDetail;