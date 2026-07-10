function StatCard({ title, value, color, icon }) {

  return (

    <div
      style={{
        background: "#fff",
        borderRadius: "14px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,.08)",
        flex: 1,
        textAlign: "center"
      }}
    >

      <div
        style={{
          fontSize: "42px",
          color
        }}
      >
        {icon}
      </div>

      <h1
        style={{
          margin: "10px 0"
        }}
      >
        {value}
      </h1>

      <p
        style={{
          color: "#555"
        }}
      >
        {title}
      </p>

    </div>

  );

}

export default StatCard;