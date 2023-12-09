import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const errorPage = useRouteError();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5">
      <h1 className="text-6xl text-cyan-400">ooops!!!</h1>
      <h2 className="text-6xl text-fuchsia-300">
        {errorPage.status || errorPage.message}
      </h2>
      <button className="btn btn-primary">
        <Link to="/">Go Home</Link>
      </button>
    </div>
  );
};

export default ErrorPage;
