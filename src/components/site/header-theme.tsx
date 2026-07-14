"use client";

import { createContext, useContext, useEffect, useState } from "react";

const HeaderThemeContext = createContext<{
  dark: boolean;
  setDark: (v: boolean) => void;
}>({ dark: false, setDark: () => {} });

export function HeaderThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dark, setDark] = useState(false);
  return (
    <HeaderThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme() {
  return useContext(HeaderThemeContext);
}

/**
 * Rendered by a page whose hero sits behind the fixed header on a dark
 * background — flips the header to light text while the page is mounted.
 */
export function HeaderDark() {
  const { setDark } = useHeaderTheme();
  useEffect(() => {
    setDark(true);
    return () => setDark(false);
  }, [setDark]);
  return null;
}
