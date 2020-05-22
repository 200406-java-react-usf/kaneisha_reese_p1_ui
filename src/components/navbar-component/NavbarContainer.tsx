import { IState } from "../../reducers";
import NavbarComponent from "./NavbarComponent";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
    return {
        username: state.login.authUser?.username,
        firstName: state.login.authUser?.firstName,
        lastName: state.login.authUser?.lastName
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);