import About from "@/components/About";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";


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