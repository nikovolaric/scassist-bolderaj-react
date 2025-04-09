import AuthLogo from "../features/auth/components/AuthLogo";
import SignupForm from "../features/auth/components/SignupForm";

function SignUp() {
  return (
    <main className="my-16 flex flex-col gap-12 lg:mt-9">
      <div className="w-5/6 lg:w-1/4">
        <AuthLogo />
      </div>
      <SignupForm />
    </main>
  );
}

export default SignUp;
