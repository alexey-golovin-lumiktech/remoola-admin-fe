export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const next =
    (Array.isArray(searchParams?.next) ? searchParams?.next[0] : searchParams?.next) || "/";

  return <LoginForm nextPath={next} />;
}

import LoginForm from "./LoginForm";