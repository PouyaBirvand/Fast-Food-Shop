import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Menu from "./Menu";
import SearchBar from "./SearchBar";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const closeSearch = () => setIsSearchOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        closeSearch();
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className="relative">
      <div className="flex justify-between items-center p-4">
        <button
          aria-label="Menu"
          className="focus:outline-none z-10"
          onClick={toggleMenu}
        >
          <img
            src="/assets/images/eva_menu-2-outline.png"
            alt="HamburgerMenu"
            className="w-8 h-8 cursor-pointer"
          />
        </button>

        {isSearchOpen ? (
          <div className="absolute inset-0 z-20" ref={searchRef}>
            <SearchBar onClose={closeSearch} />
          </div>
        ) : (
          <div className="flex space-x-4 items-center z-10">
            <button aria-label="Search" className="focus:outline-none" onClick={toggleSearch}>
              <img src="/assets/images/Vector.png" alt="" className="w-6 h-6 cursor-pointer" />
            </button>
            <button aria-label="Basket" className="focus:outline-none">
              <img src="/assets/images/lets-icons_basket-alt-3.png" alt="" className="w-9 h-9 cursor-pointer" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isMenuOpen && <Menu closeMenu={closeMenu} />}
      </AnimatePresence>

      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
          />
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;