// src/app/layout.tsx
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap globally
import styles from "./styles/Home.module.css";
import Header from "../components/Header"; // Import the Header component
import Features from "../components/Features"; // Import the Features component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrinkToFit=no"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Finance Tracker</title> {/* Update title */}
        {/* Add favicon */}
        <link rel="icon" href="/favicon.ico" />
        {/* Bootstrap icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css"
          rel="stylesheet"
        />
      </head>
      <body className="d-flex flex-column h-100">
        <main className="flex-shrink-0">
          {/* Include Header component here */}
          <Header />

          {/* Include Features component here */}
          <Features />

          {/* Navigation */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container px-5">
              <a className="navbar-brand" href="/">
                Finance Tracker
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/dashboard">
                      Dashboard
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          {/* Page content */}
          <div>{children}</div>
        </main>

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

        {/* Bootstrap JS */}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
