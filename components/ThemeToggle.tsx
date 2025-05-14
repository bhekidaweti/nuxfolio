'use client';

import useDarkMode from '../hooks/useDarkMode';

export default function ThemeToggle() {
  const { isDark, toggleDark } = useDarkMode();

  return (
    <button
      onClick={toggleDark}
      className="p-2 rounded border border-gray-400 dark:border-gray-200"
    >
      {isDark ? '☀' : '🌙'}
    </button>
  );
}

