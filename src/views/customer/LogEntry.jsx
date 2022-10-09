const LogEntry = (props) => {
  let e = props.entry;
  return (
    <>
      <div className="log-entry-box">
        <div className="log-entry-box-top">
          <div className="log-entry-box-top-content">
            <div>
              <label>Start : {new Date(e.start).toLocalString()}</label>
            </div>
            <div>
              <label>End : {new Date(e.end).toLocalString()}</label>
            </div>
          </div>
          <div className="log-entry-box-top-total">
            <label>
              {e.nightTime ? `${e.nightDuration.hours} night` : e.total.hours} 
              Hour/s : {e.nightTime ? e.nightDuration.hours : e.total.minutes}
              Minute/s
            </label>
          </div>
        </div>

        <div className="log-entry-content">
            <label>Night Time : {e.nightTime ? "Yes" : "No"}</label>
            <label>Instructor : {e.instructor ? "Yes" : "No"}</label>
        </div>
          {e.instructor && (
            <div className="mt-3 mb-5 ">
              <div>
                <label>Instructor Bonus:</label>
                <p className="mt-2">
                  {e.bonus.hours} Hours : {e.bonus.minutes} Minutes
                </p>
              </div>
              <div className="log-entry-bonus">
                <label>Total with Instructor Bonus:</label>
                <p className="text-center mt-2 ">
                  {e.total.hours} Hours : {e.total.minutes} Minutes
                </p>
              </div>
            </div>
          )}
      </div>
    </>
  );
};
export default LogEntry;
