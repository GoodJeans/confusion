import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import Contact from './ContactComponent';
import About from './AboutusComponent';
import {connect} from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  console.log("leaders inside map state to props"+JSON.stringify(state.leaders))
  return{
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }    
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => { dispatch(fetchDishes()) },
  resetFeedbackForm:() => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders())
});
class Main extends Component {
  constructor(props) {
    super(props);
  }
  
componentDidMount(){
  this.props.fetchDishes();
  this.props.fetchComments();
  this.props.fetchPromos();
  this.props.fetchLeaders();
}

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
  }

  render() {
    const HomePage = () => {
    return(
        <Home 
        dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
        dishErrMess={this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
        promoLoading={this.props.promotions.isLoading}
        promoErrMess={this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
    />
      );
    }
    const AboutUs = () => {
      console.log("see here 123"+JSON.stringify(this.props.leaders.leaders.name))
      return(
        <div>
         <About leaders={this.props.leaders.leaders}/>
        </div>
      )
    }
    const DishWithId = ({match}) => {
      return(
        <DishDetail value="test"
        dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}
      />
      );
    };

    return (
      <div>
        <Header/>
        <TransitionGroup >
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
              <Switch location={this.props.location}>
                <Route path="/home" component={HomePage}/>
                <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>}/>
                <Route path="/menu/:dishId" component={DishWithId} />
                <Route path="/aboutus" component={AboutUs} />
                <Route exact path="/contactus" component={()=> <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                <Redirect to="/home" />
              </Switch>
          </CSSTransition>
         </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}
export default withRouter((connect(mapStateToProps, mapDispatchToProps)(Main)));