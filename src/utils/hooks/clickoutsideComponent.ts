import React from "react";

export default function useOutsideClick(callback: () => void) {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  React.useEffect(() => {
    const handleClick = (e: Event) => {
      const target = e.target as Element;
      if (ref.current && !ref.current.contains(target)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [callback, ref]);

  return ref;
}
