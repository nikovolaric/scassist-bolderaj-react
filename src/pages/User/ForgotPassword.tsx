import AuthLogo from "../../features/auth/components/AuthLogo";
import ForgotPasswordForm from "../../features/auth/components/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <main className="my-16 flex flex-col gap-12 lg:mx-auto lg:mt-9 lg:w-1/2">
      <div className="w-5/6 lg:w-1/3">
        <AuthLogo />
      </div>
      <ForgotPasswordForm />
    </main>
  );
}

export default ForgotPassword;
