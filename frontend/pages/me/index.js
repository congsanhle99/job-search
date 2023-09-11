import Layout from "../../components/layout/Layout";
import UpdateProfile from "../../components/user/UpdateProfile";
import { isAuthenticatedUser } from "../../utils/isAuthenticated";

export default function UpdateProfilePage() {
  return (
    <Layout title="Update User Profile">
      <UpdateProfile />
    </Layout>
  );
}
