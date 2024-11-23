import Accordion from "../components/home/Accordion";
import Banner from "../components/home/Banner";
import FeaturedProducts from "../components/home/FeaturedProducts";
import UserReview from "../components/home/UserReview";

const Home = () => {
  return <div>
    <Banner/>
    <div className="container mx-auto">
      <div className="my-12">
        <h1 className="mb-12 text-2xl font-semibold text-center">Featured Products</h1>
        <FeaturedProducts/>
      </div>
      <div className="my-12">
        <h1 className="mb-12 text-2xl font-semibold text-center">User Review</h1>
        <UserReview/>
      </div>
      <div className="my-12">
        <h1 className="mb-12 text-2xl font-semibold text-center">Frequently Asked Questions</h1>
        <Accordion/>
      </div>
    </div>
  </div>;
};

export default Home;
