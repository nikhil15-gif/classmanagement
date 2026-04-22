/**
 * Button Component
 * A reusable button that accepts `props` like `variant`, `onClick`, etc.
 * Shows how PROPS allow us to reuse the same structure with different styles/behaviors.
 */
export default function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    className = '',
    disabled = false
  }) {
    
    // Base classes applied to all buttons
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
    
    // Variant-specific classes
    const variants = {
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm disabled:bg-indigo-400",
      secondary: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 shadow-sm disabled:opacity-50",
      danger: "bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
    };
  
    return (
      <button 
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variants[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }
