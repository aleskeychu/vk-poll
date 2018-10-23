import {createPoll} from '../actions';
import {connect} from 'react-redux';
import NewPollAdderComponent from "../components/NewPollAdderComponent";

const mapStateToProps = state => {
    return {
        creationStatus: state.pollCreationStatus
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createPoll: createPoll(dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewPollAdderComponent);