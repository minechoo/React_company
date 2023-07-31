import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext(null);

export function GlobalProvider({ children }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	return <GlobalContext.Provider value={{ MenuOpen, setMenuOpen }}>{children}</GlobalContext.Provider>;
}

export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	if (!globalContext) throw new Error('useGlobalData hook은 GlobalProvider 컴포넌트안에서만 호출가능');
	return globalContext;
}
