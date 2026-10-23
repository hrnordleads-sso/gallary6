import { useEffect, useState } from "react";
import MegaPersonalsDemoApp from "./MegaPersonalsDemoApp";

const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";

function stripBase(pathname: string) {
  if (BASE && pathname.startsWith(BASE)) {
    const rest = pathname.slice(BASE.length) || "/";
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

function withBase(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (!BASE) {
    return normalized;
  }
  if (normalized === "/") {
    return `${BASE}/`;
  }
  return `${BASE}${normalized}`;
}

function currentAppPath() {
  return stripBase(window.location.pathname);
}

export default function App() {
  const [path, setPath] = useState(currentAppPath);

  useEffect(() => {
    const onPopState = () => setPath(currentAppPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const onNavigate = (nextPath: string) => {
    if (nextPath === path) {
      return;
    }
    window.history.pushState({}, "", withBase(nextPath));
    setPath(nextPath);
  };

  return <MegaPersonalsDemoApp path={path} onNavigate={onNavigate} />;
}
