import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
      
      // Ctrl/Cmd + Key
      const modifier = ctrlKey || metaKey;

      shortcuts.forEach(shortcut => {
        const keyMatch = shortcut.key.toLowerCase() === key.toLowerCase();
        const ctrlMatch = shortcut.ctrl === modifier;
        const shiftMatch = shortcut.shift === (shiftKey || false);
        const altMatch = shortcut.alt === (altKey || false);

        if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
          event.preventDefault();
          shortcut.action();
        }
      });
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts]);
};
