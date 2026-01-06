import Navbar from "../../../components/UserComponents/Navbar";
import Hero from "../../../components/UserComponents/Hero";
import Info from "../../../components/UserComponents/Info";

import { useLocation } from "react-router";
import { useGetUserQuery } from "../../../services/apis/userApi";
import {HashLoader} from "react-spinners";
import { useEffect, useState } from "react";

function CardPage() {
    const location = useLocation();
    const username = location.pathname.slice(1);

    const { data: getUser, isLoading, isError } = useGetUserQuery(username);

    const [minDone, setMinDone] = useState(false);
    const [hideLoader, setHideLoader] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMinDone(true), 2100);
        return () => clearTimeout(t);
    }, []);

    const stillLoading = isLoading || !minDone;

    useEffect(() => {
        if (!stillLoading) {
            const t = setTimeout(() => setHideLoader(true), 400);
            return () => clearTimeout(t);
        }
    }, [stillLoading]);

    if (isError || (!stillLoading && !getUser?.username)) {
        return <p>User not found</p>;
    }

    return (
        <>
            {!hideLoader && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#ffffff",
                        transition: "opacity .4s ease",
                        opacity: stillLoading ? 1 : 0,
                        zIndex: 9999,
                    }}
                >
                    <HashLoader color="#C11018" size={48} />
                </div>
            )}

            <section id="cardPage">
                <Navbar />
                <Hero user={getUser} />
                <Info user={getUser} />
            </section>
        </>
    );
}

export default CardPage;
