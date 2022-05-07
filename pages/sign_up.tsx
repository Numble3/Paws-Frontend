
import AuthLayout from 'components/auth/authLayout';
import SignUpForm from 'components/auth/signUpForm';
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