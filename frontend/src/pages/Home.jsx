import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import FeaturedContractors from "../components/home/FeaturedContractors";
import Gallery from "../components/home/Gallery";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
  <Hero />
  <Services />
  <FeaturedContractors />
  <Gallery />
  <Footer />
</>
  );
}