import { IState } from "../../reducers";
import UserComponent from "./UserComponent";
import { connect } from "react-redux";
import { userAction } from "../../actions/user-actions"
const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: state.user.errorMessage
    }
}

const mapDispatchToProps = {
    userAction
}

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);