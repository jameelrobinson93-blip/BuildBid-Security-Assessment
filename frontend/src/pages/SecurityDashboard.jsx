import { useEffect, useState } from "react";
import API_URL from "../config.js";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import StatusCard from "../components/StatusCard";
import ActivityChart from "../components/ActivityChart";
import RecentEvents from "../components/RecentEvents";

import {
  FaCheckCircle,
  FaTimesCircle,
  FaLock,
  FaShieldAlt
} from "react-icons/fa";

function SecurityDashboard() {

  const [logs, setLogs] = useState([]);

  async function loadLogs() {

    try {

      const response = await fetch(
        `${API_URL}/api/security/logs`
      );

      const data = await response.json();

      setLogs(data);

    } catch (error) {

      console.log(error);

    }

  }

  useEffect(() => {

    loadLogs();

    const interval = setInterval(loadLogs, 5000);

    return () => clearInterval(interval);

  }, []);

  const successful = logs.filter(
    log => log.status === "SUCCESS"
  ).length;

  const failed = logs.filter(
    log => log.status === "FAILED"
  ).length;

  const locked = logs.filter(
    log => log.status === "LOCKED"
  ).length;

  const xss = logs.filter(
    log => log.status === "XSS_BLOCKED"
  ).length;

  const chartData = [
    {
      name: "Success",
      events: successful
    },
    {
      name: "Failed",
      events: failed
    },
    {
      name: "Locked",
      events: locked
    },
    {
      name: "XSS",
      events: xss
    }
  ];

  return (

    <div
      style={{
        display: "flex",
        background: "#f4f7fc",
        minHeight: "100vh"
      }}
    >

      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px"
        }}
      >

        <h1
          style={{
            marginBottom: "5px"
          }}
        >
          🛡 BuildBid Security Center
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "35px"
          }}
        >
          Enterprise Security Monitoring Dashboard
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: "20px",
            marginBottom: "30px"
          }}
        >

          <StatCard
            title="Successful Logins"
            value={successful}
            color="#22c55e"
            icon={<FaCheckCircle />}
          />

          <StatCard
            title="Failed Logins"
            value={failed}
            color="#ef4444"
            icon={<FaTimesCircle />}
          />

          <StatCard
            title="Locked Accounts"
            value={locked}
            color="#f59e0b"
            icon={<FaLock />}
          />

          <StatCard
            title="Blocked XSS"
            value={xss}
            color="#8b5cf6"
            icon={<FaShieldAlt />}
          />

        </div>

        <ActivityChart
          data={chartData}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "25px",
            marginTop: "30px"
          }}
        >

          <RecentEvents
            logs={logs}
          />

          <div>

            <StatusCard
              title="Authentication"
              status="🟢 Healthy"
            />

            <StatusCard
              title="JWT Tokens"
              status="🟢 Active"
            />

            <StatusCard
              title="Brute Force Protection"
              status="🟢 Enabled"
            />

            <StatusCard
              title="XSS Protection"
              status="🟢 Enabled"
            />

            <StatusCard
              title="Database"
              status="🟢 Connected"
            />

          </div>

        </div>

      </div>

    </div>

  );

}

export default SecurityDashboard;