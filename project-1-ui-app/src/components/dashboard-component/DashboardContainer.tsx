import { IState } from "../../reducers";
import DashboardComponent from "./DashboardComponent";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);