import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
 
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
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.dish.comments}/>
                        </div>
                    </div>
            )


        }
      
        
    
      
export default DishDetail;