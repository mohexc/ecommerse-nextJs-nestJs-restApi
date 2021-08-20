import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { FC } from "react";

const SignUpBtn: FC = () => {
  const route = useRouter();
  return (
    <Button onClick={() => route.push("/signup")} type="link">
      Sign Up
    </Button>
  );
};

export default SignUpBtn;
