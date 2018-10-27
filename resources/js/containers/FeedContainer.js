import { fetchMorePolls } from "../actions";
import FeedComponent from "../components/FeedComponent";
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
    return {
        loadMoreItems: fetchMorePolls(dispatch)
    };
};

const mapStateToProps = state => {
    return {
        polls: state.polls,
        currentUserId: state.user.id
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedComponent);
