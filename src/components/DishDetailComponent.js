import React, {Component} from 'react';
import {Card, CardImg,CardBody, CardTitle, CardText,Breadcrumb, BreadcrumbItem, Modal , Button, ModalHeader, ModalBody, Row, Label, Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

function RenderDish({dish}){
    if (dish != null){
        return (
            <div>
                <Card>
                    <CardImg  src={dish.image}  alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else{
        return(
            <div></div>
        );
    }
}


function RenderComments({comments, addComment, dishId}) {
    
    if(comments != null) {
        console.log("dish is "+addComment)
        const commentsList = comments.map((comment) => {
            return (
                <ul key={comment.id} >
                    <li className="no-bullet">{comment.comment}</li>
                    <li className="no-bullet">--{comment.author}, {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(comment.date))}</li>
                </ul>
            )
        });
        return(
            <div>
                <CommentForm dish={dishId} addComment={addComment}  />
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
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
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
    let c;
    if (!props.dish){
        return null;
    }
    return(
        <div className="container">
                <div className="row">
                <Breadcrumb>
                    {/* <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem> */}
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                    addComment={props.addComment}
                    dishId={props.dish.id}
                    />
                </div>
                </div>
        </div>    
    )
}
      
        
    
      
export default DishDetail;