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
            {(e.nightTime) ? `${e.nightDuration.hours} night`: e.total.hours} hour/s :  {(e.nightTime) ? e.nightDuration.hours : e.total.minutes} Minute/s
        </label>
        <br />
        <label>Night Time : {e.nightTime ? "Yes" : "No"}</label>
        <br />
        <label>Instructor : {e.instructor ? "Yes" : "No"}</label>
        <br />
        {e.instructor && (
          <div>
            <label>
              Instructor Bonus:  {e.bonus.hours} Hours : {" "} 
              {e.bonus.minutes} Minutes
            </label>
            <br />
            <label>
              Total : {e.total.hours} Hours : {e.total.minutes} Minutes
            </label>
            <br />
          </div>
        )}
      </div>
    </>
  );
};
export default LogEntry;
