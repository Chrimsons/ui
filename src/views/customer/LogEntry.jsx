const LogEntry = (props) => {
  let e = props.entry;
  return (
    <>
      <div className="tile2">
        <label>Start : {new Date(e.start).toLocalString()}</label>
        <br />
        <label>End : {new Date(e.end).toLocalString()}</label>
        <br />
        <label>
          Hours : {e.duration.hours} Minutes : {e.duration.minutes}
        </label>
        <br />
        <label>Instructor : {e.instructor ? "Yes" : "No"}</label>
        <br />
        {e.instructor && (
          <div>
            <label>
              Instructor Bonus: Hours: {e.bonus.hours} Minutes:{" "}
              {e.bonus.minutes}
            </label>
            <br />
            <label>
              Hours: {e.total.hours} Minutes: {e.total.minutes}
            </label>
            <br />
          </div>
        )}
      </div>
    </>
  );
};
export default LogEntry;
