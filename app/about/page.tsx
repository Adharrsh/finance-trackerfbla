import React from "react";
import About from "About";
import Footer from "components/Footer";
import Navbar from "components/Navbar";

const AboutPage: React.FC = () => {
    return (
        <div>
            <Navbar />
            <About />
            <Footer />
        </div>
    );
};

export default AboutPage;