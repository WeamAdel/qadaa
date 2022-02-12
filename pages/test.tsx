import { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Page from "../components/Layout/Page/Page";
import Image from "next/image";

function Test() {
  const [doc, setDoc]: [any, any] = useState();
  const ref: any = useRef();

  useEffect(() => {
    const doc = new jsPDF();

    console.log(doc);
    setDoc(doc);
  }, []);

  async function save() {
    if (doc) {
      doc.autoTable({
        html: "#table",
        useCss: true,
        theme: "grid",
        didDrawCell: addDoneImage,
      });

      doc.save("table.pdf");
    }
  }

  function addDoneImage(data: any) {
    if (data.row.section === "body" && data.cell.raw.dataset.done === "true") {
      console.log(data);
      doc.addImage(
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QA/wD/AP+gvaeTAAACj0lEQVRYhcXXv08VQRAH8E/E2FhoIhBtEEGMJnbGBhIsLAUbNbHSTkoTLGzRhtp/AdEY7fzVGRMjgooWYiKFT40JRmxEGxQQLHYv77Lcg/cej/BNNnu3MzczN7szO0P1aMIE3qCrgN6Fl3geeRuOfqzE8Rtnc7Q+/MzRT22GAQ+j8FKclzEcx3JCe9Bo5W1Ywh+04BIWlP94EVfRjHn8w/56lT3GrLDft3Ad96KikRxfL2bi6M2tj0TeO7iGUYzju+DFdfFD+c/S0ZPw7ogjj541vp9NlW0vMOCT4ObL+IVOdOAjxhLehYLvx4Q/PxhllbALN+L7urgdrb1QDXOVuBhl3kwJ2wqYS3HubKABmaxSSkgNaMfhTTCgI85HFERHk5BIHgrhkx2YoQYaMJSTuyTkib6o23iOOC/sU3raa0GrcBAfJes9QojO5/S9IOT2LIs1b0BxpnwqyhuvwLNHiKgVTBLCZS4uDG5AeQveRTkfsLcC3xXl+yQ7b/qFfL6IE5uovFvIHcs4kxKHo4AZq7PbU7wSXJwi7/apCjyizG+RbzhbLMoDRdiJ43iSKGiNa0fxHieFVF4zTitvQW8BPXXxvoK1Sm7Poxt/JVvQpbpDmLq6GrcXYTB+Nxd1m1R9GOaNqEc5BWH4Qm2JqBWv46hFeVEiGmNrUvF9oW5cFQTtytXPaAMNGFWuktryhNSCL5iOz6uuzg0gK0Sm8XUtA1jj7t4AKtYYRSVZdnfvFiqZfElW7bkYsrokE9fWxZYXpZM4hs/R+pJwa53DgHJh2iscKjiPZ/F5IM53hT3vjOOAELp1oZ7GpL1eZZWQtWZZFitqzTJaw1szamtO+zbDgCah/X6LQwX0rD2fUEN7/h9ulv1+VMzjOAAAAABJRU5ErkJggg==",
        "PNG",
        data.cell.x + 20,
        data.cell.y,
        5,
        5
      );
    }
  }

  const rowsJSX = [];

  for (let i = 0; i < 30; i++) {
    rowsJSX.push(
      <tr>
        <th>{i + 1}</th>
        <td>Fajr</td>
        <td>Count</td>
        <td className="generated__image-cell" style={{ display: "none" }}>
          <Image src="/images/done.png" width="25" height="30" alt="Done" />
        </td>
        <td data-done="true"></td>
      </tr>
    );
  }

  return (
    <Page title="PDF">
      <h1>Test PDF</h1>
      <button onClick={save}>Save</button>
      <div ref={ref}></div>
      <table id="table" style={{ backgroundColor: "violet", textAlign: "center" }}>
        <thead>
          <tr style={{ backgroundColor: "black" }}>
            <td style={{ padding: "10px 12px", height: "36px" }}>N</td>
            <td style={{ padding: "10px 12px", height: "36px" }}>Prayer</td>
            <td style={{ padding: "10px 12px", height: "36px" }}>Count</td>
            <td style={{ padding: "10px 12px", height: "36px" }}>Done</td>
          </tr>
        </thead>
        <tbody>{rowsJSX}</tbody>
      </table>
    </Page>
  );
}

export default Test;
