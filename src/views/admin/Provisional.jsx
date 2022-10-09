import Main from "../Main";

export default function Provisional() {
  return (
    <div>
      <Main />
      <div className="pl-72">
        {alert("Provisional license has been issued")}
        <label>
          Please inform the customer the license will be sent by post within 10
          business days
        </label>
        <br />
      </div>
    </div>
  );
}
