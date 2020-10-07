import React, { useState, useEffect } from "react";

/**
 * React Charts
 */
import { Chart } from "react-charts";

/**
 * Bootstrap
 */
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Stats() {
  const [server1RamMetrics, setServer1RamMetrics] = useState([]);
  const [server2RamMetrics, setServer2RamMetrics] = useState([]);
  const [server1CpuMetrics, setServer1CpuMetrics] = useState([]);
  const [server2CpuMetrics, setServer2CpuMetrics] = useState([]);

  /**
   * Getting data from API
   */
  function getServer1Data() {
    fetch("http://18.188.146.17:5000/usage")
      .then((results) => results.json())
      .then((results) => {
        setServer1RamMetrics((prevState) => {
          if (prevState.length > 0) {
            const tmp = [...prevState];
            if (prevState.length === 10) {
              for (let i = 0; i < tmp.length - 1; i++) {
                tmp[i][1] = tmp[i + 1][1];
              }
              tmp[9] = [9, parseInt(results.ram)];
            } else {
              tmp.push([tmp.length, parseInt(results.ram)]);
            }
            return tmp;
          } else {
            return [[0, parseInt(results.ram)]];
          }
        });
        setServer1CpuMetrics((prevState) => {
          if (prevState.length > 0) {
            const tmp = [...prevState];
            if (prevState.length === 10) {
              for (let i = 0; i < tmp.length - 1; i++) {
                tmp[i][1] = tmp[i + 1][1];
              }
              tmp[9] = [9, parseInt(results.cpu)];
            } else {
              tmp.push([tmp.length, parseInt(results.cpu)]);
            }
            return tmp;
          } else {
            return [[0, parseInt(results.cpu)]];
          }
        });
      })
      .catch((err) => console.log(err));
  }
  function getServer2Data() {
    fetch("http://52.15.159.171:5000/usage")
      .then((results) => results.json())
      .then((results) => {
        setServer2RamMetrics((prevState) => {
          if (prevState.length > 0) {
            const tmp = [...prevState];
            if (prevState.length === 10) {
              for (let i = 0; i < tmp.length - 1; i++) {
                tmp[i][1] = tmp[i + 1][1];
              }
              tmp[9] = [9, parseInt(results.ram)];
            } else {
              tmp.push([tmp.length, parseInt(results.ram)]);
            }
            return tmp;
          } else {
            return [[0, parseInt(results.ram)]];
          }
        });
        setServer2CpuMetrics((prevState) => {
          if (prevState.length > 0) {
            const tmp = [...prevState];
            if (prevState.length === 10) {
              for (let i = 0; i < tmp.length - 1; i++) {
                tmp[i][1] = tmp[i + 1][1];
              }
              tmp[9] = [9, parseInt(results.cpu)];
            } else {
              tmp.push([tmp.length, parseInt(results.cpu)]);
            }
            return tmp;
          } else {
            return [[0, parseInt(results.cpu)]];
          }
        });
      })
      .catch((err) => console.log(err));
  }

  /**
   * Start setup
   */
  useEffect(() => {
    getServer1Data();
    getServer2Data();
    setInterval(getServer1Data, 1000);
    setInterval(getServer2Data, 1000);
  }, []);

  /**
   * RAM Graph
   */
  const ramData = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: server1RamMetrics,
      },
      {
        label: "Series 2",
        data: server2RamMetrics,
      },
    ],
    [server1RamMetrics, server2RamMetrics]
  );
  const ramAxes = React.useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom",
        hardMin: 0,
        hardMax: 9.1,
        show: false,
      },
      { type: "linear", position: "left", hardMin: 0, hardMax: 100 },
    ],
    []
  );
  const ramChart = (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <Chart data={ramData} axes={ramAxes} />
    </div>
  );

  /**
   *CPU Graph
   */
  const cpuData = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: server1CpuMetrics,
      },
      {
        label: "Series 2",
        data: server2CpuMetrics,
      },
    ],
    [server1CpuMetrics, server2CpuMetrics]
  );
  const cpuAxes = React.useMemo(
    () => [
      {
        primary: true,
        type: "linear",
        position: "bottom",
        hardMin: 0,
        hardMax: 9.1,
        show: false,
      },
      { type: "linear", position: "left", hardMin: 0, hardMax: 100 },
    ],
    []
  );
  const cpuChart = (
    <div
      style={{
        width: "400px",
        height: "300px",
      }}
    >
      <Chart data={cpuData} axes={cpuAxes} />
    </div>
  );

  return (
    <Row className="m-4">
      <Col sm>
        <h3>RAM</h3>
        <div>{ramChart}</div>
        <p>
          <strong style={{ color: "#6ab4e9" }}>Server A:</strong>
          {server1RamMetrics.length > 0 &&
            " " + server1RamMetrics[server1RamMetrics.length - 1][1] + "%"}
        </p>
        <p>
          <strong style={{ color: "#e2756c" }}>Server B:</strong>
          {server2RamMetrics.length > 0 &&
            " " + server2RamMetrics[server2RamMetrics.length - 1][1] + "%"}
        </p>
      </Col>
      <Col sm>
        <h3>CPU</h3>
        <div>{cpuChart}</div>
        <p>
          <strong style={{ color: "#6ab4e9" }}>Server A:</strong>
          {server1CpuMetrics.length > 0 &&
            " " + server1CpuMetrics[server1CpuMetrics.length - 1][1] + "%"}
        </p>
        <p>
          <strong style={{ color: "#e2756c" }}>Server B:</strong>
          {server2CpuMetrics.length > 0 &&
            " " + server2CpuMetrics[server2CpuMetrics.length - 1][1] + "%"}
        </p>
      </Col>
    </Row>
  );
}

export default Stats;
