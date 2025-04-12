export default function NetworkBackground({ children, isDark = false }) {
  return (
    <div className="absolute inset-0 -z-10 transition-colors duration-500" 
         style={{ 
           backgroundColor: isDark ? '#000000' : '#ffffff',
           backgroundImage: `radial-gradient(${isDark ? '#ffffff20' : '#00000020'} 1px, transparent 1px)`,
           backgroundSize: '20px 20px'
         }}>
      {children}
    </div>
  );
}
