import React, { FunctionComponent, useState } from "react";
import { Button } from "antd";
import { connect } from "react-redux";
import { createIncident } from "../../actions/incidentsActions";
import { withRouter } from "react-router-dom";
import { CollectionCreateForm, dateFormat } from "./ModalCreateIncident";
import { SimpleMap } from "../../../../simple-map";

interface CollectionsPageProps {
  createIncident: (incident: object) => void;
}

const CollectionsPage: FunctionComponent<any> = (
  props: CollectionsPageProps
) => {
  const [visible, setVisible] = useState(false);

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
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: { incident: object }) => ({
  incident: state.incident,
});

export default connect(mapStateToProps, {
  createIncident,
})(withRouter(CollectionsPage));
