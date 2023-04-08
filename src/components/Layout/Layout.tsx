import { LayoutProps } from "../../types";
import { Footer } from "../Footer/Footer";
import { Navigation } from "../Nav/Nav";

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="shell">
      <header>
        <Navigation />
      </header>
      <main style={{ marginTop: "7rem" }}>{children}</main>
      <Footer />
    </div>
  );
};
