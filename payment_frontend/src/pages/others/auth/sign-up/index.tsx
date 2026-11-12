import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import SignUpHeader from "./header";
import SocialButton from "./social-button";
import { socialProviders } from "./data";
import { useState } from "react";


export default function SignUp() {

  const [accountId, setAccountId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [check, setCheck] = useState(false);

  const signUp = () => {

    if (!accountId)
      return;

    if (!password)
      return;

    if (!name)
      return;

    if (!phone)
      return;

    if (!check)
      return;

  }

  const oauthSignUp = () => {

  }

  return (
    <div className="flex h-screen pb-50">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <SignUpHeader />

          <div className="flex flex-col gap-y-5 mb-5">
            <div>
              <FieldLabel className="mb-1.5 block">
                아이디 <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                placeholder="아이디를 입력해주세요"
                onChange={(e) => setAccountId(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5 block">
                비밀번호 <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5 block">
                이름 <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                placeholder="이름을 입력해주세요"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <FieldLabel className="mb-1.5 block">
                번호 <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                type="text"
                placeholder="번호를 입력해주세요 ex)01012341234"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <Field
                orientation="horizontal"
                className="items-start gap-3">
                <Checkbox
                  id="terms"
                  className="mt-0.5"
                  onCheckedChange={(checked) => setCheck(checked)}
                />
                <FieldLabel
                  htmlFor="terms"
                  className="inline-block cursor-pointer text-sm font-normal text-gray-500 dark:text-gray-400"
                >
                  By creating an account means you agree to the{" "}
                  <span className="text-gray-800 dark:text-white/90">
                    Terms and Conditions,
                  </span>{" "}
                  and our{" "}
                  <span className="text-gray-800 dark:text-white">
                    Privacy Policy
                  </span>
                </FieldLabel>
              </Field>
            </div>
            <div>
              <Button
                className="w-full" size="lg"
                onClick={() => signUp()}
              >
                Sign Up
              </Button>
            </div>
            <div>
              <p className="text-center text-sm font-normal text-gray-700 sm:text-start dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          <SocialButton
            className="w-full"
            key={socialProviders[0].id}
            provider={socialProviders[0]}
            onClick={() => oauthSignUp()}
          />
        </div>
      </div>
    </div>
  );
}