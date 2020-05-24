import { IState } from "../../reducers";
import { connect } from "react-redux";
import ManagerReimbComponent from './ManagerReimbComponent';

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        errorMessage: ''

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerReimbComponent);