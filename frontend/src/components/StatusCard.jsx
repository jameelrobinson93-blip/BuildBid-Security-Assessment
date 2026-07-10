function StatusCard({ title, status }) {

  return (

    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "15px",
        boxShadow: "0 6px 16px rgba(0,0,0,.08)"
      }}
    >

      <strong>{title}</strong>

      <span
        style={{
          float: "right",
          color: "#22c55e",
          fontWeight: "bold"
        }}
      >
        {status}
      </span>

    </div>

  );

}

export default StatusCard;