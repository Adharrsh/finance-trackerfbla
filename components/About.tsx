import React from "react";

const BootstrapPage: React.FC = () => {
  return (
    <div className="d-flex flex-column">
      <main className="flex-shrink-0">

        {/* Header */}
        <header className="py-5">
          <div className="container px-5">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-xxl-6">
                <div className="text-center my-5">
                  <h1 className="fw-bolder mb-3">Our mission is to make building websites easier for everyone.</h1>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Team Members Section */}
        <section className="py-5 bg-light">
          <div className="container px-5 my-5">
            <div className="text-center">
              <h2 className="fw-bolder">Our team</h2>
              <p className="lead fw-normal text-muted mb-5">Dedicated to quality and your success</p>
            </div>
            <div className="row gx-5 row-cols-1 row-cols-sm-2 row-cols-xl-4 justify-content-center">
              {["Ibbie Eckart", "Arden Vasek", "Toribio Nerthus", "Malvina Cilla"].map((name, index) => (
                <div className="col mb-5" key={index}>
                  <div className="text-center">
                    <img className="img-fluid rounded-circle mb-4 px-4" src="https://dummyimage.com/150x150/ced4da/6c757d" alt={name} />
                    <h5 className="fw-bolder">{name}</h5>
                    <div className="fst-italic text-muted">{index === 0 ? "Founder & CEO" : index === 1 ? "CFO" : index === 2 ? "Operations Manager" : "CTO"}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BootstrapPage;

