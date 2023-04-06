import { Footer } from "../Footer/Footer";
import { Navigation } from "../Nav/Nav";

export const Layout = ({ children }: any) => {
  return (
    <div className="shell">
      <header>
        <Navigation />
      </header>
      <main style={{marginTop: "7rem"}}>{children}</main>
      <Footer />
    </div>
  );
};
