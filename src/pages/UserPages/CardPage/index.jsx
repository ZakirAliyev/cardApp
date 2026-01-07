import Navbar from "../../../components/UserComponents/Navbar";
import Hero from "../../../components/UserComponents/Hero";
import Info from "../../../components/UserComponents/Info";

import { useLocation } from "react-router";
import { useGetUserQuery } from "../../../services/apis/userApi";

function CardPage() {
    const location = useLocation();
    const username = location.pathname.slice(1);

    const { data: getUser, isLoading, isError } = useGetUserQuery(username);

    if (isError) return <p>User not found</p>;

    return (
        <section id="cardPage">
            <Navbar />
            <Hero user={getUser} />
            <Info user={getUser} loading={isLoading} />
        </section>
    );
}

export default CardPage;
