import React, {Component} from 'react';
import {connect} from 'react-redux';
import history from "./history";

export default function Hoc(HocComponent){
    return class extends Component{
    	constructor(props){
    		super(props);
    	}
    	componentWillMount() {
    		// if (this.props.isPlanSubscribed === false) {
	     //        history.replace('/billing');
	     //    }
    	}

        render(){
            return (
                <div>
                    <HocComponent history={history} isPlanSubscribed={this.props.isPlanSubscribed}></HocComponent>
                </div>

            );
        }
    } 
}


// const Hoc = MainComponent =>
// class extends Component {
//     render() {
//     	console.log('sdsdsdsd');
//     	return (
//     		<div>
// 	          <MainComponent />
// 	       </div>
//     	);
//     }
// };

// const mapStateToProps = state => {
// 	console.log(state.HeaderReducer.isPlanSubscribed);
//   return {
//       isPlanSubscribed : state.HeaderReducer.isPlanSubscribed,
//     }
// };
// const mapDispatchToProps = dispatch => {
//     return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Hoc(CustomRoutes));