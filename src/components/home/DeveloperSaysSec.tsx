import {Quote, Star} from "lucide-react";

import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, EffectCoverflow, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
    {
        quote: "TechScribe has transformed how I learn new technologies. The quality of content here is unmatched.",
        author: "Dan Abramov",
        role: "React Core Team",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
        quote: "Finally, a platform where developers can share deep technical knowledge without compromising on quality.",
        author: "Sarah Drasner",
        role: "VP of Developer Experience",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
        quote: "The MDX editor and developer-focused features make TechScribe my go-to platform for technical writing.",
        author: "Kent C. Dodds",
        role: "Educator & Developer",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
        quote: "I've found my community here. TechScribe brings together the best minds in software engineering.",
        author: "Cassidy Williams",
        role: "Director of Developer Experience",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
];


const DeveloperSaysSec = () => {
    return (
        <section className={"w-full min-h-screen px-4 py-8 sm:p-8 md:p-12 lg:p-16 xl:p-20 bg-neutral-100 dark:bg-dark-secondary/40 overflow-hidden theme-transition"}>
            <div className={"mb-12 w-full flex flex-col items-center text-center"}>
                <div className={"inline-flex items-center gap-2 py-1 px-3 rounded-lg border border-neutral-200 mb-2" +
                    "text-dark-secondary font-secondary uppercase text-[0.7rem] tracking-widest mb-2 dark-border dark:text-light-secondary"}>
                    <Quote strokeWidth={2} size={13} />
                    <h3 className={"font-medium"}>testimonials</h3>
                </div>
                <h2 className={"text-2xl sm:text-3xl font-bold dark:text-light-secondary mb-4"}>What Developers Say</h2>
                <p className={"text-neutral-strong font-light text-sm sm:text-base"}>Trusted by developers from leading tech companies worldwide</p>
            </div>
            <div className="w-full relative flex">
                <Swiper
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{

                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2.5,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}

                    className="mySwiper !pb-14"
                >

                    {testimonials.map((item, index) => {

                        return (
                            <SwiperSlide key={index} >
                                <div className={`
                                    w-full min-h-[394.75px] px-8 py-14
                                    bg-light-secondary dark:bg-dark-secondary 
                                    border border-neutral-soft dark-border 
                                    rounded-xl shadow-sm 
                                    transition-all duration-300 hover:shadow-md
                                    relative overflow-hidden
                                `}>
                                    <div className={"w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20   relative z-10 mb-6"}>
                                        <Quote className="w-6 h-6 text-xl text-indigo-500 " />
                                    </div>

                                    <p className={"text-base md:text-lg mb-6 italic leading-relaxed mb-6 font-light dark:text-light-secondary"}>"{item.quote}"</p>
                                    <div className={"flex gap-1 mb-6"}>
                                        <Star className={"w-4 h-4 fill-yellow-400 text-yellow-400"} />
                                        <Star className={"w-4 h-4 fill-yellow-400 text-yellow-400"} />
                                        <Star className={"w-4 h-4 fill-yellow-400 text-yellow-400"} />
                                        <Star className={"w-4 h-4 fill-yellow-400 text-yellow-400"} />
                                        <Star className={"w-4 h-4 fill-yellow-400 text-yellow-400"} />
                                    </div>

                                    <div className={"flex items-center gap-3 pt-4 border-t border-neutral-soft dark-border"}>
                                        <div
                                            style={{backgroundImage: `url(${item.avatar})`}}
                                            className={"w-12 h-12 bg-white rounded-full backdrop-blur-2xl shadow-sm flex items-center justify-center text-lg md:text-xl bg-contain bg-no-repeat font-medium"}>
                                        </div>
                                        <div>
                                            <h5 className={"font-semibold text-dark-secondary dark:text-light-secondary"}>{item.author}</h5>
                                            <h6 className={"text-sm text-neutral-strong dark:text-neutral-medium"}>{item.role}</h6>
                                        </div>
                                    </div>

                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

                <style>{`
                    .swiper-pagination-bullet {
                        background: #999999;
                        opacity: 0.5;
                    }
                    .swiper-pagination-bullet-active {
                        background-color: #6366f1 !important; 
                        opacity: 1;
                        width: 20px; 
                        border-radius: 10px;
                        transition: all 0.3s ease;
                    }
                `}</style>
            </div>
        </section>
    )
}
export default DeveloperSaysSec
