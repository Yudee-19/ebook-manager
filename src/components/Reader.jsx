import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ReactReader } from "react-reader";
import api from "../api";

const Reader = () => {
    const { id } = useParams();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [bookUrl, setBookUrl] = useState(null);

    useEffect(() => {
        const fetchEpub = async () => {
            try {
                // Fetch the URL of the EPUB file
                const response = await api.get(`/ebooks/read/${id}`);
                setBookUrl(response.data.url); // Use the URL returned by the backend
            } catch (err) {
                console.error(
                    "Error fetching EPUB:",
                    err.response?.data || err.message
                );
                setError("Failed to load the book");
            }
        };

        fetchEpub();
    }, [id]);

    if (!bookUrl) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div style={{ position: "relative", height: "100vh" }}>
            <ReactReader
                url={bookUrl} // Pass the URL to the EPUB file
                location={location}
                locationChanged={setLocation}
                getRendition={(rendition) => {
                    rendition.themes.fontSize("140%");
                }}
                epubOptions={{
                    flow: "scrolled",
                    manager: "continuous",
                }}
            />
        </div>
    );
};

export default Reader;
