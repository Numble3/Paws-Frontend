import AuthLayout from 'components/auth/AuthLayout';
import SignUpForm from 'components/auth/SignUpForm';
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