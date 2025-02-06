// components/Features.js
export default function Features() {
  return (
    <section className="py-5" id="features">
      <div className="container px-5 my-5">
        <div className="row gx-5">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <h2 className="fw-bolder mb-0">A better way to manage money.</h2>
          </div>
          <div className="col-lg-8">
            <div className="row gx-5 row-cols-1 row-cols-md-2">
              <div className="col mb-5 h-100">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-wallet"></i>
                </div>
                <h2 className="h5">Track Expenses</h2>
                <p className="mb-0">Easily add and categorize your expenses.</p>
              </div>
              <div className="col mb-5 h-100">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h2 className="h5">View Insights</h2>
                <p className="mb-0">
                  Visualize your income and spending trends.
                </p>
              </div>
              <div className="col mb-5 mb-md-0 h-100">
                <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3">
                  <i className="bi bi-credit-card"></i>
                </div>
                <h2 className="h5">Budget Smartly</h2>
                <p className="mb-0">Set and manage your monthly budget.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
