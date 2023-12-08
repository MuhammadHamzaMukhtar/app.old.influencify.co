import {FETCH_INFLUENCERS} from "./types";

export const fetchInfluencers = () => dispatch => {
    dispatch({
        type: FETCH_INFLUENCERS,
        payload: [
            {id: 1, name: 'Ameer Hamza', followers: '1.1 million'},
            {id: 2, name: 'Yasir Naeem', followers: '2.4 million'},
            {id: 3, name: 'Asad Minhas', followers: '4.1 million'},
            {id: 4, name: 'Umer Yahya', followers: '1.0 million'},
            {id: 5, name: 'Waqar Sabir', followers: '3.7 million'}
        ]
    });
};