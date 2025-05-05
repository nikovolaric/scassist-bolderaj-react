import AuthLogo from "../../features/auth/components/AuthLogo";
import SignUpEndForm from "../../features/auth/components/SignUpEndForm";

function SignUpEnd() {
  return (
    <main className="my-16 flex flex-col gap-12 lg:mx-auto lg:mt-9 lg:w-2/5">
      <div className="w-5/6 lg:w-1/3">
        <AuthLogo />
      </div>
      <SignUpEndForm />
    </main>
  );
}

export default SignUpEnd;
