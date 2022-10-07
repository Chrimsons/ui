const LogEntry = (props) => {
  let e = props.entry;
  return (
    <>
      <div className="tile2 bg-purple-300">
        <div className="border-[3px] border-black mt-5 mx-9 my-3 pb-4 bg-purple-200">
          <div className="flex flex-column justify-center mt-5 mb-3">
            <div className="mr-4">
              <label>Start : {new Date(e.start).toLocalString()}</label>
            </div>
            <div>
              <label>End : {new Date(e.end).toLocalString()}</label>
            </div>
          </div>
          <div className="border-[3px] border-gray-600 border-dotted mx-28">
            <label>
              {e.nightTime ? `${e.nightDuration.hours} night` : e.total.hours}{" "}
              Hour/s : {e.nightTime ? e.nightDuration.hours : e.total.minutes}{" "}
              Minute/s
            </label>
          </div>
        </div>

        <div className="flex flex-column justify-center mt-3">
          <div className="mr-5">
            <label>Night Time : {e.nightTime ? "Yes" : "No"}</label>
          </div>
          <div className="ml-5">
            <label>Instructor : {e.instructor ? "Yes" : "No"}</label>
          </div>
        </div>
        <div className="mt-3 mb-5 ">
          {e.instructor && (
            <div>
              <div>
                <label>
                  Instructor Bonus:
                  <div className="mt-2">
                    {e.bonus.hours} Hours : {e.bonus.minutes} Minutes
                  </div>
                </label>
              </div>
              <div className="text-2xl border-[3px] border-gray-600 border-dotted mx-16 bg-purple-200 py- mt-2">
                <label>
                  Total with Instructor Bonus:
                  <div className="text-center mt-2 ">
                    {e.total.hours} Hours : {e.total.minutes} Minutes
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default LogEntry;
