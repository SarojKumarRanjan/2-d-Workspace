import { Link } from 'react-router-dom';

function Sidebar() {
  const menuItems = [
    { path: '/spaces', label: 'Spaces' },
    { path: '/maps', label: 'Maps' },
    { path: '/my-spaces', label: 'My Spaces' },
    { path: '/profile', label: 'Profile' },
    { path: '/create-space', label: 'Create Space' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        {menuItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className="block py-2 px-4 hover:bg-gray-700 rounded"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;