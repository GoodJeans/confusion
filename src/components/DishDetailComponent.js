import React, {Component} from 'react';
import {Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
          }
        }
        renderDish(dish){
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
        
        renderComments(dish) {
            if(dish != null) {
                console.log("dish is "+dish)
               const commentsList = dish.map((comment) => {
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

        render(){
            const selectedDish= this.props.dish;
            let c;
            if (this.props.dish!=null){
                c=this.props.dish.comments;
                console.log("value of c is:"+c)
            }else{
                c=null;
            }
            return(
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(this.props.dish
                                )}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(c)}
                        </div>
                    </div>
            )


        }
      
        
    }
      
export default DishDetail;