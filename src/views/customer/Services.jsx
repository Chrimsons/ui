import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLicencesAsync } from "../../web-services";

const Services = () => {
  const [licences, setLicences] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLicencesAsync().then((j) => setLicences(j));
  }, []);

  return (
    <div className="mt-10 ml-72 text-2xl font-semibold">
      {licences.map((l) => (
        <div key={l._id} className="tile">
          <p class="mt-10">Licence: {l._id}</p>
          <p class="my-10">
            Total: {`Hours: ${l.total.hours} Minutes: ${l.total.minutes}`}
          </p>
          <button
            class="rounded-full px-10 py-3 text-center"
            onClick={() => navigate(`/customer/licence/${l._id}/logbook`)}
          >
            New Entry
          </button>
        </div>
      ))}
    </div>
  );
};
export default Services;
