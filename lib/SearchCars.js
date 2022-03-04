import { useState } from "react";

export default function SearchCars() {
  // change state after getting result from API
  // initiallly set to empty array
  const [hits, setHits] = useState([]);
  const [status, setStatus] = useState("");
  const [latency, setLatency] = useState("");

  // search cars from API
  const searchCars = async (event) => {
    const q = event.target.value;

    // call api only when length of query have more than length 2
    if (q.length > 2) {
      const params = new URLSearchParams({ q });

      const response = await fetch("/api/search?" + params);

      const result = await response.json();
      console.log("This is Form API response:");
      console.log("ResultNow:", result);

      // setHits(result["cars"]);
      setHits(result.data);
      setStatus(result.type);
      setLatency(result.latency);
    }
  };

  return (
    <div className="container mb-4">
      <br />
      {status && (
        <center>
          <h4>
            Loading from: <span style={{ color: "#3DBE29" }}>{status}</span>
          </h4>
        </center>
      )}
      {latency && (
        <center>
          <p>
            <i>
              Latency: <span style={{ color: "#DE4839" }}>{latency}μs</span>
            </i>
          </p>
        </center>
      )}
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 mt-4">
          <div className="card">
            <div className="input-box mb-6">
              <input
                onChange={searchCars}
                type="text"
                className="form-control"
                placeholder="Enter any maker, model, description"
              />
            </div>

            {hits.map((hit) => (
              <div className="list border-bottom">
                <div className="d-flex flex-row">
                  <div className="d-flex flex-column">
                    <div className="p-2">
                      <img
                        src={hit.image}
                        alt="car-image"
                        width={220}
                        height={150}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-column">
                    <div className="p-2">
                      <strong>Maker: </strong>
                      {hit.make}
                    </div>
                    <div className="p-2">
                      <strong>Model: </strong>
                      {hit.model}
                    </div>
                    <div className="p-2">
                      <strong>Description: </strong>
                      {hit.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
