import HeroSec from "../components/home/HeroSec.tsx";
import FeaturedArticleSec from "../components/home/FeaturedArticleSec.tsx";
import RecentArticleSec from "../components/home/RecentArticleSec.tsx";
import ThoughtsSec from "../components/home/ThoughtsSec.tsx";
import ExploreCategoriesSec from "../components/home/ExploreCategoriesSec.tsx";
import TopAuthorsSec from "../components/home/TopAuthorsSec.tsx";
import DeveloperSaysSec from "../components/home/DeveloperSaysSec.tsx";
import UserReviewsSec from "../components/home/UserReviewsSec.tsx";
import NewsLetterSec from "../components/home/NewsLetterSec.tsx";

const Home = () => {
    return (
        <div className={"w-full min-h-screen dark:bg-dark-primary"}>
            <HeroSec/>
            <FeaturedArticleSec/>
            <RecentArticleSec/>
            <ThoughtsSec/>
            <ExploreCategoriesSec/>
            <TopAuthorsSec/>
            <DeveloperSaysSec/>
            <UserReviewsSec/>
            <NewsLetterSec/>
        </div>
    )
}
export default Home
