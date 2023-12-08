import React from 'react';
import {browserHistory} from 'react-router';
import {connect} from "react-redux";

function RequireAdmin(ComposedComponent){

  class Authenticated extends React.Component {

    componentWillMount(){
      if(this.state.isAlumno)
        browserHistory.push('/brand/campaigns');
    }

    render(){
      return <ComposedComponent />;
    }
  }

   const mapStateToProps = state => {
    return {
            currentLoggedUser   : state.HeaderReducer.currentLoggedUser,
        };
    };

    export default connect(mapStateToProps, null)(Authenticated);
   return Authenticated;
}