import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishDetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect} from 'react-router-dom';
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import Contact from './ContactComponent';
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        selectedDish: null,
        leaders: LEADERS
    };
  }
 
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId});
    console.log("state is.."+dishId)
  }

  render() {
    const HomePage = () => {
      return(
        <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
              promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    }
    return (
      <div>
        <Header/>
        <Switch>
          <Route path="/home" component={HomePage}/>
          <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>}/>
          <Route exact path="/contactus" component={Contact}/>
          <Redirect to="/home" />
          {/* <DishDetail dish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />   */}
        </Switch>
        <Footer/>
      </div>
    );
  }
}
export default Main;