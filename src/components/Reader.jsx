import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ReactReader } from "react-reader";
import api from "../api";

const Reader = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [bookData, setBookData] = useState(null);

    useEffect(() => {
        const fetchEpub = async () => {
            try {
                const response = await api.get(`/ebooks/read/${id}`);
                setBookData(response.data);
            } catch (err) {
                setError("Failed to load the book");
                console.error(err);
            }
        };
        fetchEpub();

        // Cleanup when component unmounts
        return () => {
            if (bookData?.filePath) {
                // Optionally notify backend to clean up the file immediately
                api.post("/ebooks/cleanup", {
                    filePath: bookData.filePath,
                }).catch((err) => console.error("Cleanup error:", err));
            }
        };
    }, [id]);

    if (!bookData) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div style={{ position: "relative", height: "100vh" }}>
            <ReactReader
                url={`file://${bookData.filePath}`}
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
