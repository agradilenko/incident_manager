import React, { FunctionComponent, useEffect, useState } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { createIncident } from "../../actions/incidentsActions";
import { withRouter } from "react-router-dom";
import { CollectionCreateForm, dateFormat } from "./ModalCreateIncident";
import { SimpleMap } from "../../../../simple-map";
import { getUsersList } from "../../actions/authActions";

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

interface CollectionsPageProps {
  createIncident: (incident: SimpleMap<any>) => void;
  getUsersList: () => void;
  userList: any[];
}

const CollectionsPage: FunctionComponent<any> = (
  props: CollectionsPageProps
) => {
  const [visible, setVisible] = useState(false);
  const { getUsersList, userList } = props;

  useEffect(() => {
    getUsersList();
    return () => {
      console.log("awd");
    };
  }, []);

  const onCreate = (values: any) => {
    const resultData: SimpleMap<any> = {
      ...values,
      dateDue: values.DateDue.format(dateFormat),
    };
    props.createIncident(resultData);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
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

const mapStateToProps = (state: { userList: any; incident: Incident }) => ({
  incident: state.incident,
// @ts-ignore
  userList: state.auth.usersNames,
});

export default connect(mapStateToProps, {
  createIncident,
  getUsersList,
})(withRouter(CollectionsPage));
