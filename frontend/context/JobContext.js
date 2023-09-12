import axios from "axios";
import { createContext, useState } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [applied, setApplied] = useState(false);
  const [stats, setStats] = useState(null);

  // apply to job
  const applyToJob = async (id, access_token) => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.API_URL}/api/jobs/${id}/apply/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (res.data.applied === true) {
        setLoading(false);
        setApplied(true);
      }
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  };

  // check job applied
  const checkJobApplied = async (id, access_token) => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.API_URL}/api/jobs/${id}/check/`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      setLoading(false);
      setApplied(res.data);
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  };

  // get topic stats
  const getTopicStats = async (topic) => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.API_URL}/api/stats/${topic}/`);

      setLoading(false);
      setStats(res.data);
    } catch (error) {
      setLoading(false);
      setError(error.response && (error.response.data.detail || error.response.data.error));
    }
  };

  //
  const clearErrors = () => {
    setError(null);
  };

  return (
    <JobContext.Provider
      value={{
        loading,
        error,
        clearErrors,
        updated,
        setUpdated,
        applied,
        setApplied,
        applyToJob,
        checkJobApplied,
        stats,
        setStats,
        getTopicStats,
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
