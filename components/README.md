# rolodexterLABS Component Guidelines

## 🔧 Component Development Best Practices

### 1. Prop Type Definitions

- Always define explicit prop types
- Use optional props with default values
- Leverage TypeScript for type safety

### 2. Prop Conventions

- Use `className?` for optional styling
- Provide sensible default styles
- Allow external style overrides

### 3. Component Structure

```typescript
type ComponentProps = {
  className?: string;  // Optional styling
  variant?: 'primary' | 'secondary';  // Optional variants
  children?: React.ReactNode;  // Optional child content
};

export function MyComponent({
  className = '',
  variant = 'primary',
  children
}: ComponentProps) {
  return (
    <div
      className={`
        base-styles
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
```

### 4. Error Handling

- Implement graceful degradation
- Use default props
- Provide clear console warnings

### 5. Performance Considerations

- Memoize complex components
- Use lazy loading when possible
- Minimize re-renders

## 🚨 Common Pitfalls to Avoid

- Never use `any` type
- Always specify prop types
- Use type assertions sparingly
- Prefer composition over inheritance

## 📝 Recommended Tools

- ESLint with TypeScript plugin
- Prettier for consistent formatting
- React DevTools for debugging

---

_Maintained by rolodexterLABS Engineering_
