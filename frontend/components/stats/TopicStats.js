import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import JobContext from "../../context/JobContext";

const TopicStats = () => {
  const [topic, setTopic] = useState("");
  const { loading, error, user, clearErrors } = useContext(JobContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearErrors();
    }
  }, [error]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("topic", topic);
  };

  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> Get Topic Stats </h3>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-chart-line"></i>
                  <input
                    type="text"
                    placeholder="Enter Your Topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? "Fetching..." : "Get Stats"}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="right">
          <div className="rightContentWrapper">
            {loading ? (
              "loader"
            ) : (
              <>
                <h4>Stats of JAVA:</h4>
                <table className="table table-striped mt-4">
                  <tbody>
                    <tr>
                      <th scope="row">Average Positions</th>
                      <td>2</td>
                    </tr>
                    <tr>
                      <th scope="row">Total Jobs</th>
                      <td>5</td>
                    </tr>
                    <tr>
                      <th scope="row">Minimum Salary</th>
                      <td>75000</td>
                    </tr>
                    <tr>
                      <th scope="row">Maximum Salary</th>
                      <td>75000</td>
                    </tr>
                    <tr>
                      <th scope="row">Average Salary</th>
                      <td>75000</td>
                    </tr>
                  </tbody>
                </table>
                <div className="alert alert-danger mt-4">
                  <b>Note:</b> These stats are collected from the jobs that are posted only on Jobbee. Do not compare
                  these stats with other sites.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicStats;
