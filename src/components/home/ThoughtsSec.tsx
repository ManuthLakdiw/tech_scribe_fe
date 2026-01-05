import { Brain, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/pagination';
import { EffectCards, Autoplay, Pagination } from 'swiper/modules';
import type {CSSProperties} from "react";

const ThoughtsSec = () => {
    const thoughts = [
        {
            id: 1,
            text: "The more that you read, the more things you will know.",
            author: "Dr. Seuss",
            profession: "Author & Cartoonist"
        },
        {
            id: 2,
            text: "Talk is cheap. Show me the code.",
            author: "Linus Torvalds",
            profession: "Software Engineer (Creator of Linux)"
        },
        {
            id: 3,
            text: "Programs must be written for people to read.",
            author: "Abelson & Sussman",
            profession: "Computer Scientists & Professors (MIT)"
        },
        {
            id: 4,
            text: "First, solve the problem. Then, write the code.",
            author: "John Johnson",
            profession: "Computer Scientist"
        },
    ];

    return (
        <section  className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-light-primary dark:bg-dark-primary overflow-hidden flex flex-col items-center theme-transition"}>
            <div className={"mb-12 w-full flex flex-col items-center text-center"}>
                <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border border-neutral-200 mb-2" +
                    "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <Brain strokeWidth={2} size={13} />
                    <h3 className={"font-medium"}>wisdom</h3>
                </div>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary mb-4"}>Thoughts on Reading & Learning</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-base"}>Inspiration from tech visionaries and thought leaders</p>
            </div>


            <div className="w-full max-w-[320px] md:max-w-[400px] relative z-10">
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards, Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    style={{
                        "--swiper-pagination-color": "#6366f1",
                        "--swiper-pagination-bullet-inactive-color": "#999999",
                        "--swiper-pagination-bullet-inactive-opacity": "0.5",
                        "--swiper-pagination-bullet-size": "7px",
                        "--swiper-pagination-bullet-horizontal-gap": "3px"
                    } as CSSProperties}

                    className="mySwiper !pb-14"
                >
                    {thoughts.map((item, index) => {

                        const gradientClasses = [
                            "from-indigo-500 via-purple-500 to-pink-500",
                            "from-purple-500 via-indigo-500 to-pink-500",
                            "from-pink-500 via-purple-500 to-indigo-500",

                        ];

                        const currentGradient = gradientClasses[index % gradientClasses.length];

                        return (
                            <SwiperSlide key={item.id} className="rounded-xl">
                                <div className={`
                                    w-full h-[450px] px-8 py-14
                                    bg-light-secondary/97 dark:bg-dark-secondary/97 
                                    rounded-2xl shadow-2xl
                                    flex flex-col justify-between
                                    border border-neutral-soft dark-border
                                    text-dark-secondary dark:text-light-secondary relative overflow-hidden
                                `}>

                                    <div className={`
                                        absolute top-[-20%] left-[-20%] w-80 h-60 
                                        bg-gradient-to-br ${currentGradient} 
                                        rounded-full blur-3xl opacity-20 dark:opacity-10
                                    `}></div>

                                    <div className={`
                                        absolute bottom-[-20%] right-[-20%] w-80 h-60 
                                        bg-gradient-to-tr ${currentGradient} 
                                        rounded-full blur-3xl opacity-20 dark:opacity-10
                                    `}></div>

                                    <Quote size={40} className="text-dark-secondary/20 dark:text-white/20 relative z-10" />

                                    <div className="z-10">
                                        <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-6">"{item.text}"</h3>

                                        {/* Line Gradient */}
                                        <div className={`h-1 w-20 bg-gradient-to-r ${currentGradient} rounded-full mb-4`}></div>
                                    </div>

                                    <div className="z-10 flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-white/10 border border-neutral-200 dark:border-white/5 flex items-center justify-center font-bold text-indigo-500 dark:text-indigo-400">
                                            {item.author[0]}
                                        </div>
                                        <p className="font-medium tracking-wide text-sm uppercase opacity-80">
                                            {item.author}
                                        </p>
                                    </div>

                                </div>
                            </SwiperSlide>
                        );
                    })}

                </Swiper>
            </div>
        </section>
    )
}
export default ThoughtsSec
