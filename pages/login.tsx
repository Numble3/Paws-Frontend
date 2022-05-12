import AuthLayout from "components/auth/auth-layout";
import LoginForm from "components/auth/login-form";
import { NextPageWithLayout } from "types/common";

const LoginPage: NextPageWithLayout = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};

LoginPage.noNav = true;
LoginPage.back = { color: "gray" };
export default LoginPage;
