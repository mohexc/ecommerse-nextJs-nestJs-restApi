import { Button } from "antd";
import React, { useRef } from "react";
import SignIn from "../../auth/sign-in";

const SignInBtn = () => {
  const signinModalRef = useRef(null);
  return (
    <>
      <SignIn ref={signinModalRef} />
      <Button onClick={() => signinModalRef.current.showModal()} type="link">
        Sign In
      </Button>
    </>
  );
};

export default SignInBtn;
