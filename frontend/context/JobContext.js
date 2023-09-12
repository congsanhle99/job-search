import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [applied, setApplied] = useState(false);
  const router = useRouter();

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
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export default JobContext;
