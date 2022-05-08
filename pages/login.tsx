
import AuthLayout from 'components/auth/authLayout';
import LoginForm from 'components/auth/loginForm';
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
