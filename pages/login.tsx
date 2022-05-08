
import AuthLayout from 'components/auth/AuthLayout';
import LoginForm from 'components/auth/LoginForm';
import { NextPageWithLayout } from "types/common";

const LoginPage: NextPageWithLayout = () => {
  return (
    <AuthLayout>
      <LoginForm/>
    </AuthLayout>
  );
};

LoginPage.noNav = true;
export default LoginPage;
