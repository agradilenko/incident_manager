import React, { Component } from "react";
import { ColumnsType } from "antd/es/table";
import { Link, Route } from "react-router-dom";
import { RouteComponentProps } from "react-router";
import { GET_INCIDENTS } from "../../actions/types";

import { Table } from "antd";
import { connect } from "react-redux";

interface IncidentListProps {
  incidents: [{}]
}

interface IncidentListState {
  hasData: boolean;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Assignee",
    dataIndex: "assignee",
    key: "assignee",
  },
  {
    title: "Area",
    dataIndex: "area",
    key: "area",
  },
  {
    title: "StartDate",
    dataIndex: "dateCreated",
    key: "dateCreated",
  },
  {
    title: "DueDate",
    dataIndex: "dateDue",
    key: "dateDue",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
  },
  {
    title: "Icon",
    dataIndex: "icon",
    key: "icon",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

class IncidentList extends Component<IncidentListProps, IncidentListState> {
  constructor(props: IncidentListProps) {
    super(props);
    this.state = {
      hasData: true,
    };
  }

  render() {
    // @ts-ignore
    const { incidents } = this.props.incidents;
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.state.hasData ? incidents : null}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: { incidents: [{}] }) => ({
  incidents: state.incidents,
});

export default connect(mapStateToProps, {})(IncidentList);
