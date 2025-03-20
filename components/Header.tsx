import React from "react";

// src/components/Header.tsx
export default function Header() {
  return (
    <header className="bg-dark py-5">
      <div className="container px-5">
        <div className="row gx-5 align-items-center justify-content-center">
          <div className="col-lg-8 col-xl-7 col-xxl-6">
            <div className="my-5 text-center text-xl-start">
              <h1 className="display-5 fw-bolder text-white mb-2">
                Welcome to Spending Smartly!
              </h1>
              <p className="lead fw-normal text-white-50 mb-4">
              The Smart way to Track your Finances
              </p>

              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                <a
                  className="btn btn-primary btn-lg px-4 me-sm-3"
                  href="#features"
                >
                  Get Started
                </a>
                <a className="btn btn-outline-light btn-lg px-4" href="#!">
                  Learn More
                </a>
              </div>
            </div>
          </div>
          <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center">
            <img
              className="img-fluid rounded-3 my-5"
              src="https://www.fbla.org/media/2022/08/cropped-cropped-FBLA_HorizontalLogo-600x464-1-1.png"
              alt="FBLA Logo"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
