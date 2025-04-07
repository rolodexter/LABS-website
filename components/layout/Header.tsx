// This file is being deprecated in favor of the consolidated Header in navigation/Header.tsx
// Exporting the Header from navigation to maintain backward compatibility
import Header from '../navigation/Header';

// Add a console warning in development to help identify components that need to be updated
if (process.env.NODE_ENV === 'development') {
  console.warn(
    'The Header component at @/components/layout/Header.tsx is deprecated. ' +
    'Please update imports to use @/components/navigation/Header.tsx instead.'
  );
}

export default Header;
