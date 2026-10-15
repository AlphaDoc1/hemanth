import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <main className="error-page page-width">
      <p className="eyebrow">Portfolio / Page not found</p>
      <span className="error-code" aria-hidden="true">
        404
      </span>
      <h1>Oops! Page not found</h1>
      <Link to="/" className="action action-primary">
        Return to Home <span aria-hidden="true">↗</span>
      </Link>
    </main>
  );
};
export default NotFound;
