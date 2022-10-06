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
           Hours : {(e.nightTime) ? e.nightDuration.hours : e.total.hours} Minutes : {(e.nightTime) ? e.nightDuration.hours : e.total.minutes}
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
              Total Hours: {e.total.hours} Minutes: {e.total.minutes}
            </label>
            <br />
          </div>
        )}
      </div>
    </>
  );
};
export default LogEntry;
