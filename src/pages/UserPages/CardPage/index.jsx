import Navbar from "../../../components/UserComponents/Navbar";
import Hero from "../../../components/UserComponents/Hero";
import Info from "../../../components/UserComponents/Info";

import { useLocation } from "react-router";
import { useGetUserQuery } from "../../../services/apis/userApi";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

function CardPage() {
    const location = useLocation();
    const username = location.pathname.slice(1);

    const { data: getUser, isLoading, isError } = useGetUserQuery(username);
    const { i18n } = useTranslation();
    const lang = i18n.language;

    if (isError) return <p>User not found</p>;

    const nameHelmet =
        lang === "az" ? getUser?.name_az ??
            getUser?.name :
            lang === "ru" ? getUser?.name_ru ??
                getUser?.name :
                getUser?.name;

    return (
        <section id="cardPage">
            <Helmet>
                <title>{nameHelmet || ""}</title>
                <link rel="canonical" href="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" />
            </Helmet>

            <Navbar />
            <Hero user={getUser} />
            <Info user={getUser} loading={isLoading} />
        </section>
    );
}

export default CardPage;
