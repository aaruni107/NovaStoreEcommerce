"use client";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Search,
  Heart,
  Cart3,
  Person,
  List,
  X,
  Moon,
  Sun,
} from "react-bootstrap-icons";
import "@/styles/navbar.css";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const cache = sessionStorage.getItem("product-cache");

    if (cache) {
      setAllProducts(JSON.parse(cache));
      return;
    }

    const res = await fetch("https://dummyjson.com/products?limit=0");
    const data = await res.json();

    const formatted: Product[] = data.products.map((item: any) => ({
      id: item.id,
      name: item.title,
      slug: item.title.toLowerCase().replace(/\s+/g, "-"),
      brand: item.brand,
      image: item.thumbnail,
      images: item.images,
      price: item.price,
      salePrice:
        item.discountPercentage > 0
          ? Math.round(item.price / (1 - item.discountPercentage / 100))
          : null,
      rating: item.rating,
      reviewCount: item.reviews?.length ?? 0,
      reviews: item.reviews ?? [],
      category: item.category,
      badge: item.discountPercentage > 0 ? "Sale" : "New",
      instock: item.availabilityStatus,
    }));

    sessionStorage.setItem("products-cache", JSON.stringify(formatted));

    setAllProducts(formatted);
  }
  useEffect(() => {
    if (!search.trim()) {
      setSearchResults([]);
      return;
    }

    const value = search.toLowerCase();

    const filtered = allProducts
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(value) ||
          p.brand?.toLowerCase().includes(value) ||
          p.category.toLowerCase().includes(value)
        );
      })
      .slice(0, 8);

    setSearchResults(filtered);
  }, [search, allProducts]);
  useEffect(() => {
    setMounted(true);

    const scroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
  }, []);
  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    document.startViewTransition(() => {
      setTheme(theme === "dark" ? "light" : "dark");
    });
  };
  return (
    <>
      <header className={`navbar-custom ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-wrapper">
            <Link href="/" className="logo">
              <span>Nova</span>Store
            </Link>

            <nav className="desktop-nav">
              <Link href="/">Home</Link>
              <Link href="/shop">Shop</Link>
              <Link href="/category">Categories</Link>
              <Link href="/deals">Deals</Link>
              <Link href="/contact">Contact</Link>
            </nav>

            <div className="search-box d-none d-xl-flex position-relative">
              <Search />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-item"
                      onClick={() => {
                        setSearch("");
                        router.push(`/product/${product.slug}`);
                      }}
                    >
                      <img src={product.image} alt={product.name} />

                      <div>
                        <h6>{product.name}</h6>
                        <small>${product.price}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="navbar-icons">
              <button className="nav-icon-btn">
                <Heart />
              </button>

              <button className="nav-icon-btn cart-btn">
                <Cart3 />
                <span>2</span>
              </button>

              <button className="nav-icon-btn">
                <Person />
              </button>

              <button className="nav-icon-btn" onClick={toggleTheme}>
                {mounted ? theme === "dark" ? <Sun /> : <Moon /> : null}
              </button>
            </div>

            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(true)}
            >
              <List />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} />

          <div className="mobile-drawer">
            <div className="drawer-header">
              <h4>
                <span>Nova</span>Store
              </h4>

              <button onClick={() => setMenuOpen(false)}>
                <X />
              </button>
            </div>

            <div className="drawer-search position-relative">
              <Search />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {searchResults.length > 0 && (
                <div className="search-dropdown mobile-search-dropdown">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      className="search-item"
                      onClick={() => {
                        setSearch("");
                        setMenuOpen(false);
                        router.push(`/product/${product.slug}`);
                      }}
                    >
                      <img src={product.image} alt={product.name} />

                      <div className="flex-grow-1">
                        <h6>{product.name}</h6>
                        <small>${product.price}</small>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <nav className="drawer-nav">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link href="/shop" onClick={() => setMenuOpen(false)}>
                Shop
              </Link>

              <Link href="/categories" onClick={() => setMenuOpen(false)}>
                Categories
              </Link>

              <Link href="/deals" onClick={() => setMenuOpen(false)}>
                Deals
              </Link>

              <Link href="/contact" onClick={() => setMenuOpen(false)}>
                Contact
              </Link>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
