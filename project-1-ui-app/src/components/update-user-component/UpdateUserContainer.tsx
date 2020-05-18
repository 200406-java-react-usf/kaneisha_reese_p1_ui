import { IState } from "../../reducers";
import UpdateUserComponent from "./UpdateUserComponent";
import { connect } from "react-redux";
import { updateAction } from '../../actions/update-user-action';

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.login.errorMessage
    }
}

const mapDispatchToProps = {
    updateAction
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserComponent);