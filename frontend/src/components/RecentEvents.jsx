function RecentEvents({ logs }) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)"
      }}
    >

      <h2>Recent Security Events</h2>

      <table width="100%">

        <thead>

          <tr>

            <th>Email</th>

            <th>Status</th>

            <th>Time</th>

          </tr>

        </thead>

        <tbody>

          {logs.slice(0, 10).map(log => (

            <tr key={log.id}>

              <td>{log.email}</td>

              <td>{log.status}</td>

              <td>{log.event_time}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default RecentEvents;