import React ,{Component} from "react";
import { BarChart , CartesianGrid,XAxis ,YAxis ,Tooltip ,Legend ,Bar  } from 'recharts';
import {connect} from "react-redux";

class TikTokAudienceAges extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
        <BarChart width={400} height={250} className='audienceAgeGraph m-auto' data={this.props.audienceAgeGenderValue}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Men" fill="#7e2e8c" />
          <Bar dataKey="Women" fill="#F31854" />
        </BarChart>
    )
  }
}

const mapStateToProps = state => {
    return {
        audienceAgeGenderValue  : state.InfluencerProfileReducer.audienceAgeGenderValue,
    };
};

export default connect(mapStateToProps, null)(TikTokAudienceAges);