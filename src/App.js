import React,{Component} from 'react';
import CardList from './CardList';
import {connect} from 'react-redux'
import {robots} from './robots';
import SearchBox from './SearchBox';
import { render } from '@testing-library/react';
import ErrorBoundry from   './ErrorBoundry'
import './App.css';
import {setSearchField} from './actions.js'

const mapStateToProps =state =>{
    return{
        searchField: state.searchField
    }
}
const mapDispatchToProps =(dispatch)=>{
   return{ onSearchChange: (event)=> dispatch(setSearchField(event.target.value))
}
}


class App extends Component{
    constructor(){
        super()  
        this.state={  

            robots: robots
        
        }
    }
    componentDidMount(){
  
        fetch('https://jsonplaceholder.typicode.com/users')
         .then(response=> response.json())
         .then(users=> {this.setState({robots: users})})

    } 
    render(){
        const {robots} = this.state;
        const {searchField, onSearchChange} =this.props;
        const filteredRobots = robots.filter(robots=>{
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        })
    
        return (
            <div className='tc'>
            <h1 className ='f2s'> ROBOFRIENDS</h1>
             <SearchBox searchChange={onSearchChange}/>
            <CardList robots={filteredRobots}/>
            
                <ErrorBoundry>
                    <CardList robots={filteredRobots}/>
                </ErrorBoundry>          
           
            </div>
    
        );
    
}
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
 