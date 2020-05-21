import { IState } from "../../reducers";
import { newUserAction } from "../../actions/new-user-action"
import { connect } from "react-redux";
import NewUserComponent from "./NewUserComponent";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        newUser: state.newUser.newUser,
        errorMessage: state.update.errorMessage
          
    }
}

const mapDispatchToProps = {
    newUserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserComponent);