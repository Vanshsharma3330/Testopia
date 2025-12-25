import Features from "./components/features.jsx";
import Main from "./components/main.jsx";
import Testimonial from "./components/testimonial.jsx";
import MoreFeatures from "./components/moreFeatures.jsx";
import EarlyAccess from "./components/earlyAccess.jsx";

export default function Home() {
  return (
    <>
      <Main />
      <Testimonial />
      <Features />
      <MoreFeatures />
      <EarlyAccess />
    </>
  );
}
