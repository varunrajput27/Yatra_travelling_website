
import { Link } from "react-router-dom";
import useColorMode from "../../../hooks/useColorMode";
import { authImage } from "../../../utils/data";

const AuthLayouts = ({ children, type }) => {
  const [colorMode, setColorMode] = useColorMode();

  const toggleColorMode = () =>
    setColorMode(colorMode === "light" ? "dark" : "light");

  return (
    <div className="flex flex-wrap w-full h-screen dark:bg-gray-900">
      {/* Left Side */}
      <div className="flex flex-col w-full lg:w-1/2">
        {/* Header Logo + Theme Toggle */}
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 relative">
          {/* Absolute SVG Logo */}
          <div className="absolute top-3 md:right-1/2">
            {/* Your long SVG logo here */}
            {/* (Consider moving to a separate component or SVG file) */}
            {/* <YourSVGLogo /> */}
          </div>

          <div className="flex items-center gap-4 z-10">
            <span className="text-4xl text-black logo__login dark:text-white">
              Yatra.com
            </span>
            <div
              onClick={toggleColorMode}
              className="cursor-pointer p-1 text-[1.3rem] dark:text-white"
            >
              {colorMode === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#000"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 
                      0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 
                      7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 
                      6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 
                      1.591M5.25 12H3m4.227-4.773L5.636 
                      5.636M15.75 12a3.75 3.75 0 11-7.5 
                      0 3.75 3.75 0 017.5 0z"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl text-center dark:text-white">
            Welcome <span className="hand-shake">👋</span>
          </p>
          {children}

          {/* Auth switcher */}
          <div className="pt-12 pb-12 text-center dark:text-white">
            <p>
              {type === "login"
                ? "Don't have an account? "
                : "Already have an account? "}
              <Link
                to={type === "login" ? "/register" : "/login"}
                className="font-semibold underline"
              >
                {type === "login" ? "Register" : "Login"}
              </Link>
            </p>
          </div>
        </div>

        {/* Decorative Bottom SVG (Hidden on small screens) */}
        <div className="bottom-0 hidden sm:absolute sm:inline">
          {/* Long bottom SVG here (can be moved to a separate component too) */}
          {/* <BottomDecorationSVG /> */}
        </div>
      </div>

      {/* Right Side Image */}
     <div className="hidden lg:flex items-center justify-center w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1567981851827-667ceee7658d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Travel Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent z-10" />
        <div className="relative z-20 p-10 text-white max-w-md">
          <h2 className="text-4xl font-bold leading-tight">
            Discover Beautiful Places
          </h2>
          <p className="mt-3 text-sm text-gray-200">
            Travel to your dream destination with <strong>Yatra.com</strong>. Safe, simple, and seamless booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;


