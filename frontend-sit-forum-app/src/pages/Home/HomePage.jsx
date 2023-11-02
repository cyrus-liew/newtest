import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Posts from "./container/Posts";
import CTA from "./container/CTA";

const HomePage = () => {
    return (
    <MainLayout>
        <Hero />
        <Posts />
        <CTA />
    </MainLayout>
    );
};

export default HomePage