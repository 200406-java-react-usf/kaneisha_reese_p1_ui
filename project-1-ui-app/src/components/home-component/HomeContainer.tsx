import { IState } from "../../reducers";
import HomeComponent from "./HomeComponent";
import { connect } from "react-redux";

const mapStateToProps = (state: IState) => {
    return {
        authUser: state.login.authUser,
        
    }
}

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);