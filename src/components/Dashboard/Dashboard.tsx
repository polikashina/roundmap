import React from "react";
import { Sidebar } from "../Sidebar/Sidebar";
import { Chart } from "../Chart/Chart";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <h1 className="dashboard__title">roundMap</h1>
      <div className="dashboard__container">
        <Chart className="dashboard__chart" />
        <Sidebar />
      </div>
    </div>
  );
};

export { Dashboard };
