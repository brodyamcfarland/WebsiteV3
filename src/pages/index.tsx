import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import SocialLinks from "../components/SocialLinks";
import Hero from "../components/Hero";
import ImageCarousel from "../components/ImageCarousel";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

const Home: NextPage = () => {
    return (
        <div className="relative flex min-h-screen flex-col bg-[#0f0f0f] font-main text-white">
            <Head>
                <title>Brody McFarland</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <SocialLinks />
            <main className="pb-20">
                <Hero />
                <ImageCarousel />
                <Projects />
                <Contact />
            </main>
        </div>
    );
};

export default Home;
