import * as React from 'react';

export function createContext<ContextValueType extends object | null>(rootComponent: string, defaultContext?: ContextValueType) {
  const Context = React.createContext<ContextValueType | undefined>(defaultContext);

  const Provider = (props: any) => {
    const { children, ...rest } = props;
    // Only re-memoize when prop values change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(() => rest, Object.values(rest)) as ContextValueType;
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  Provider.displayName = rootComponent + 'Provider';

  const useContext = (consumerName: string) => {
    const context = React.useContext(Context);
    if (context) return context;
    if (defaultContext !== undefined) return defaultContext;
    throw new Error(`${consumerName} must be within ${rootComponent}`);
  };
  return [Provider, useContext] as const;
}
