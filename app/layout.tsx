import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap globally
import Navbar from "../components/Navbar"; // Import the Navbar component
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Sidebar from "../components/Sidebar"; // Import the Sidebar component
import { UserButton, useUser } from "@clerk/nextjs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>Finance Tracker</title>
        </head>
        <body className="d-flex flex-column min-vh-100">
          <Navbar />
          <div className="container flex-grow-1">
            <div className="row">
              <Sidebar />
              <main className="flex-shrink-0">{children}</main>
            </div>
          </div>
          {/* Footer */}
          <footer className="bg-dark py-4 mt-auto">
            <div className="container px-5">
              <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                <div className="col-auto">
                  <div className="small m-0 text-white">
                    Copyright &copy; Your Website 2023
                  </div>
                </div>
                <div className="col-auto">
                  <a className="link-light small" href="#!">
                    Privacy
                  </a>
                  <span className="text-white mx-1">&middot;</span>
                  <a className="link-light small" href="#!">
                    Terms
                  </a>
                  <span className="text-white mx-1">&middot;</span>
                  <a className="link-light small" href="#!">
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
