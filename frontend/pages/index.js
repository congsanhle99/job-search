import Home from "../components/Home";
import Layout from "../components/layout/Layout";
import axios from "axios";

export default function Index({ data }) {
  console.log("data: ", data);
  return (
    <Layout>
      <Home />
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(`${process.env.API_URL}/api/jobs/`);
  const data = res.data;
  return {
    props: {
      data,
    },
  };
}
