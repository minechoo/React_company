import { createContext, useContext, useState } from 'react';

export const GlobalContext = createContext(null);

export function GlobalProvider({ chidren }) {
	const [MenuOpen, setMenuOpen] = useState(false);
	return <GlobalProvider.Provider value={(MenuOpen, setMenuOpen)}>{chidren}</GlobalProvider.Provider>;
}

export function useGlobalData() {
	const globalContext = useContext(GlobalContext);
	if (!globalContext) throw new Error('useGlobalData hook은 GlobalProvider 컴포넌트안에서만 호출가능');
	return globalContext;
}
