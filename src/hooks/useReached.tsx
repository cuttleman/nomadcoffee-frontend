import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const useReached = (options) => {
  const observedRef = useRef<any>();
  const [isReached, setIsReached] = useState<boolean>(false);

  const callback = (entries) => {
    entries.forEach((entry) => {
      setIsReached(entry.isIntersecting);
    });
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (observedRef.current) observer.observe(observedRef.current);
    // return () => {
    //   if (observedRef.current) observer.unobserve(observedRef.current);
    // };
  }, [observedRef, options]);

  return { observedRef, isReached };
};

export default useReached;
