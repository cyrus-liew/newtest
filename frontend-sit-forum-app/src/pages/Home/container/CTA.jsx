import React from 'react'
import { images } from "../../../constants"
const CTA = () => {
    return (
        <>
            <img
                src={images.Wave}
                alt="Footer Wave"
                className="w-full h-auto max-h-40 translate-y-[1px]"
                preserveAspectRatio="none"
            />

            <section className="relative bg-dark-hard px-5">
                <div className="container grid grid-cols-12 mx-auto py-10 md:pb-20 lg:place-items-center">
                    <div className="col-span-12 lg:col-span-6">
                        <h2 className="text-white font-roboto font-bold text-2xl md:text-4xl md:text-center md:leading-normal lg:text-left"> Get our latest posts from your inbox weekly.</h2>
                        <div className="w-full max-w-[494px] mt-12 space-y-3 mx-auto md:space-y-0 md:flex md:items-center md:space-x-2">
                            <input type="text"
                                className="px-4 py-3 rounded-lg w-full placeholder:text-dark-light"
                                placeholder="Your Email" />
                            <button className="px-4 py-3 rounded-lg w-full bg-primary text-white font-bold md:w-fit md:whitespace-nowrap lg:mx-0">
                                Get Started!
                                </button>
                        </div>
                        <p className="text-dark-light text-sm leading-7 mt-6 md:text-center md:text-base lg:text-left">
                            <span className="italic font-bold text-[#B3BAC5] md:not-italic md:font-normal md:text-dark-light">Get a reponse tomorrow</span> if you submit by 6pm today. If we received after 6pm will get a respose the following day.
                        </p>
                    </div>
                    <div className="col-span-12 hidden mt-[70px] md:block md:order-first lg:col-span-6 lg:order-last">
                        <div className="w-3/4 mx-auto relative">
                            <div className="w-1/2 h-1/2 bg-[#FC5A5A] rounded-lg absolute top-[10%] -right-[8%]"></div>
                            <div className="w-1/2 h-1/2 bg-white rounded-lg opacity-[.06] absolute -bottom-[10%] -left-[8%]"></div>
                            <div className="w-full rounded-xl bg-white p-3 z-[1] relative">
                                <img
                                    src={images.CTAImage1}
                                    alt="CTA"
                                    className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
                                />

                                <div className="p-5">
                                    <h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
                                        Daily Posts
                                    </h2>
                                    <p className="text-dark-light mt-3 text-sm md:text-lg">We take a look at what robots are, how they're currently used, and how they might shape the world in the future.</p>

                                </div>
                            </div>

                        </div>


                    </div>
                </div>
            </section>
        </>
    )
}

export default CTA