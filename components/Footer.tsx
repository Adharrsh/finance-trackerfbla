// src/components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-dark py-4 mt-auto">
      <div className="container px-5">
        <div className="row align-items-center justify-content-between flex-column flex-sm-row">
          <div className="col-auto">
            <div className="small m-0 text-white">
              Copyright &copy; Finance Tracker 2024
            </div>
          </div>
          <div className="col-auto">
            <a className="link-light small" href="/privacy">
              Privacy
            </a>
            <span className="text-white mx-1">&middot;</span>
            <a className="link-light small" href="/terms">
              Terms
            </a>
            <span className="text-white mx-1">&middot;</span>
            <a className="link-light small" href="/contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
