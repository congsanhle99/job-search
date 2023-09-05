import Search from "../components/layout/Search";
import Layout from "../components/layout/Layout";
import axios from "axios";

export default function Index({ data }) {
  return (
    <Layout title="Search your job">
      <Search />
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
