import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="min-h-screen bg-background-primary">
      <nav className="bg-primary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-white text-xl font-bold">
              Workspace Game
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link
                to="/"
                className="text-secondary hover:bg-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/game"
                className="text-secondary hover:bg-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Play
              </Link>
              <Link
                to="/leaderboard"
                className="text-secondary hover:bg-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Leaderboard
              </Link>
            </div>
          </div>

          {/* Profile/Settings */}
          <div className="flex items-center">
            <button className="bg-accent text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-accent-dark transition-colors">
              Login
            </button>
          </div>
        </div>
      </div>
      </nav>
    </div>
  );
};

export default Navbar;