import { useEffect } from "react";

// _________팝업 바깥 요소 클릭 감지 _______
export function useClickOutSide(refs = [], onClickOutside) {
  useEffect(() => {
    function handleClick(e) {
      const isOutside = refs.every(
        (ref) => ref.current && !ref.current.contains(e.target)
      );
      if (isOutside) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [refs, onClickOutside]);
}
