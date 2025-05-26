
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
        <div className="container px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-red-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle size={40} className="text-red-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">
              Oops! We couldn't find the page you're looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Home size={18} />
                Back to Home
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-outline flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
