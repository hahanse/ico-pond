import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke atas setiap kali URL berubah
    window.scrollTo({
      top: 0,
      behavior: "smooth" // gunakan "auto" kalau tidak ingin efek smooth
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
