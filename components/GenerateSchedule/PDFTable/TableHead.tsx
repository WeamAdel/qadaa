function TableHead({ title }: { title?: string }) {
  return (
    <thead>
      {title ? (
        <tr style={{ backgroundColor: "white", color: "black" }}>
          <td style={{ textAlign: "left", border: "none", marginBottom: "2px" }}>{title}</td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
          <td style={{ border: "none" }}></td>
        </tr>
      ) : null}
      <tr style={{ backgroundColor: "black", color: "white" }}>
        <td>N</td>
        <td></td>
        <td>Prayer</td>
        <td>Done</td>
      </tr>
    </thead>
  );
}

export default TableHead;
