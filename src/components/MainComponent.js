import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
// import { COMMENTS } from '../shared/comments';
// import { LEADERS } from '../shared/leaders';
// import { PROMOTIONS } from '../shared/promotions';
// import { DISHES } from '../shared/dishes';
import Contact from './ContactComponent';
import About from './AboutusComponent';
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';

const mapStateToProps = state => {
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }    
}

const mapDispatchToProps = dispatch => ({
  
  addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment))

});
class Main extends Component {

  constructor(props) {
    super(props);
  }
  


  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
    console.log("state is.."+dishId)
  }

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
              promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
              leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    const AboutUs = () => {
      return(
        <div>
         <About    
          leaders={this.props.leaders}
         />
        </div>
      )
    }
    const DishWithId = ({match}) =>{
      return(
        <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            addComment={this.props.addComment}
            />
            
      );
    }

    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>}/>
          <Route path="/menu/:dishId" component={DishWithId} />
          <Route path="/aboutus" component={AboutUs} />
          <Route exact path="/contactus" component={Contact}/>
          <Redirect to="/home" />
          {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />   */}
        </Switch>
        <Footer/>
      </div>
    );
  }
}
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main)));