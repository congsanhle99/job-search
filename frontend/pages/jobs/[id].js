import axios from "axios";
import Layout from "../../components/layout/Layout";

export default function JobDetailsPage({ job, candidates }) {
  console.log("job==", job, candidates);
  return (
    <Layout>
      <h1>JobDetailsPage</h1>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  // 'id' parameter in url
  const res = await axios.get(`${process.env.API_URL}/api/jobs/${params.id}/`);
  const job = res.data.job;
  const candidates = res.data.candidates;
  return {
    props: {
      job,
      candidates,
    },
  };
}
