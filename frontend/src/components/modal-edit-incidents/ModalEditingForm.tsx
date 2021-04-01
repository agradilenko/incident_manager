import React, {FunctionComponent, useEffect, useState} from "react";
import {Button} from "antd";
import {connect} from "react-redux";
import {updateIncident, getIncidents} from "../../actions/incidentsActions";
import {withRouter} from "react-router-dom";
import {getUsersList} from "../../actions/authActions";
import {dateFormat, IncidentEditForm} from "./ModalEditIncident";
import {EditOutlined} from "@ant-design/icons";
import moment, {Moment} from "moment";
import {SimpleMap} from "../../utils/simple-map";

type Incident = {
  area: string;
  assignee?: string;
  dateCreated: string;
  dateDue: string | object;
  description: string;
  name: string;
  priority: string;
  status: string;
  __v: number;
  _id: string;
};

interface userListInterface {
  title: string;
  value: string;
}

interface CollectionsPageProps {
  updateIncident: (incident: SimpleMap<any>) => void;
  getIncidents: () => void;
  getUsersList: () => void;
  userList: userListInterface[];
  item: Incident
}

interface authInterface {
  isAuthenticated: boolean;
  userList: userListInterface[];
}

const EditIncidentFormWrapper: FunctionComponent<any> = (
  props: CollectionsPageProps
) => {
  const [visible, setVisible] = useState(false);
  const { getUsersList, userList, item, } = props;

  item.dateDue = moment(item.dateDue, dateFormat);

  useEffect(() => {
    getUsersList();
  }, []);


  const onCreate = (values: any) => {
    const resultData: Incident = {
      ...values,
      _id: item._id,
      dateDue: values.dateDue.format(dateFormat),
    };
    props.updateIncident(resultData);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
        icon={<EditOutlined/>}
      >
      </Button>
      <IncidentEditForm
        initialValues={item}
        userNames={userList}
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: {
  auth: any;
  userList: authInterface;
  incident: Incident;
}) => ({
  incident: state.incident,
  userList: state.auth.usersNames,
});

export default connect(mapStateToProps, {
  updateIncident,
  getUsersList, getIncidents
})(withRouter(EditIncidentFormWrapper));
