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
          <meta name="description" content="" />
          <meta name="author" content="" />
          <title>Finance Tracker</title>
          <link rel="icon" href="/favicon.ico" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
            rel="stylesheet"
          />
        </head>
        <body className="d-flex flex-column h-100">
          <div className="d-flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="d-flex flex-column flex-grow-1">
              <Navbar />
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
