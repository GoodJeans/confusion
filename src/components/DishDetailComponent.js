import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';

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
        
function RenderComments({comments}) {
    if(comments != null) {
        console.log("dish is "+comments)
        const commentsList = comments.map((comment) => {
            return (
                <ul>
                    <li className="no-bullet">{comment.comment}</li>
                    <li className="no-bullet">--{comment.author}, {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(comment.date))}</li>
                </ul>
            )
        });
        return(
            <div>
                {commentsList}
            </div>
        )   
    }
    else {
        return (
        <div></div>
        );
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
                            <RenderComments comments={props.comments}/>
                        </div>
                        </div>
                </div>
                 
            )


        }
      
        
    
      
export default DishDetail;