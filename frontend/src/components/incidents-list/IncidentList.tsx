import React, { Component } from "react";
import { Table } from "antd";
import { connect } from "react-redux";
import "./IncidentList.css"

type Incident = {
  area: string;
  assignee?: string;
  dateCreated: string;
  dateDue: string;
  description: string;
  name: string;
  priority: string;
  status: string;
  __v: number;
  _id: string;
};

interface IncidentListProps {
  incidents: Incident[];
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
    render: (data: any, item: any) => {
      return <div className={item?.priority}/>;
    },
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
    console.log(incidents);
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

const mapStateToProps = (state: { incidents: Incident[] }) => ({
  incidents: state.incidents,
});

export default connect(mapStateToProps, {})(IncidentList);
