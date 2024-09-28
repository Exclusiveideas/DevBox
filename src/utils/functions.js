
// Helper function for debounce
export function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

export const cn = (...args) => args.filter(Boolean).join(" ");
