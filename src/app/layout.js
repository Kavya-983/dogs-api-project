import "./page.css";
import Theme from "./theme";

export const metadata = {
  title: "Dogs API",
  description: "Dogs pictures and breeds information",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <div className="title">Puppy Planet</div>
          <Theme/>
        </nav>
        {children}
      </body>
    </html>
  );
}
