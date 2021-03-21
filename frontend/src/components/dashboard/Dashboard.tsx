import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { getIncidents } from "../../actions/incidentsActions";
import IncidentList from "../incidents-list/IncidentList";
import "antd/dist/antd.css";


interface AuthInterface {
  isAuthenticated: boolean;
}

interface IProps {
  logoutUser: () => void
  getIncidents: () => void
}
interface IState {}

class Dashboard extends Component<IProps, IState> {
  onLogoutClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  componentDidMount() {
    this.props.getIncidents();
  }

  render() {
    return (
      <div>
        <IncidentList />

        <button
          style={{
            width: "150px",
            borderRadius: "3px",
            letterSpacing: "1.5px",
            marginTop: "1rem",
          }}
          onClick={this.onLogoutClick}
        >
          Logout
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: { auth: AuthInterface; incidents: [{}] }) => ({
  auth: state.auth,
  incidents: state.incidents,
});

export default connect(mapStateToProps, { logoutUser, getIncidents })(
  Dashboard
);
