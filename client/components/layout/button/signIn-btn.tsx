import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";

const SignInBtn = () => {
  const route = useRouter();
  return (
    <Button onClick={() => route.push("/auth/signin")} type="link">
      Sign In
    </Button>
  );
};

export default SignInBtn;
