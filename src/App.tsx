import { useEffect, useState } from "react";
import MegaPersonalsDemoApp from "./MegaPersonalsDemoApp";

function currentPath() {
  return window.location.pathname || "/";
}

export default function App() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onPopState = () => setPath(currentPath());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const onNavigate = (nextPath: string) => {
    if (nextPath === path) {
      return;
    }
    window.history.pushState({}, "", nextPath);
    setPath(nextPath);
  };

  return <MegaPersonalsDemoApp path={path} onNavigate={onNavigate} />;
}
