"use client";

import { useEffect, useState } from "react";

const CopyRight = () => {
  const [Y, setY] = useState<number | null>(null);

  useEffect(() => {
    setY(new Date().getFullYear());
  }, []);

  return <p>© {Y ?? "20XX"} QuietStack · BLOG</p>;
};

export default CopyRight;
