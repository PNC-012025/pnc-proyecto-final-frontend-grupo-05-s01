"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [prevPath, setPrevPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== prevPath) {
      setLoadingRoute(true);
      setPrevPath(pathname);
      requestAnimationFrame(() => requestAnimationFrame(() => setLoadingRoute(false)));
    }
  }, [pathname, prevPath]);

  if (!loadingRoute) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/10 z-50">
      <Spinner />
    </div>
  );
}
