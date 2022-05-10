
import AuthLayout from 'components/auth/auth-layout';
import SignUpForm from 'components/auth/sign-up-form';
import { NextPageWithLayout } from 'types/common';

const SignUpPage : NextPageWithLayout = () => {
  return (
    <AuthLayout>
      <SignUpForm/>
    </AuthLayout>
  )
};

SignUpPage.noNav=true;

export default SignUpPage;