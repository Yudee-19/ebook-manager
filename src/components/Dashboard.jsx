import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import EbookCard from "./EbookCard";
import UploadEbookModal from "./UploadEbookModal";

const Dashboard = () => {
    const navigate = useNavigate();
    const [ebooks, setEbooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchEbooks = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await api.get("/ebooks");
                setEbooks(res.data.ebooks);
            } catch (err) {
                console.error(err);
                if (err.response?.status === 401) {
                    navigate("/login"); // Redirect to login if unauthorized
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchEbooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await api.delete(`/ebooks/${id}`);
            setEbooks(ebooks.filter((e) => e._id !== id));
        } catch (err) {
            console.error(err);
            alert("Failed to delete ebook");
        }
    };

    return (
        <div className="min-h-screen bg-black text-[#A9B092] p-6">
            <h2 className="text-4xl font-bold mb-8 text-[#C26320]">
                Your eBooks
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {ebooks &&
                            ebooks.map((ebook) => {
                                // console.log("Mapping ebook:", ebook);
                                return (
                                    <EbookCard
                                        key={ebook._id}
                                        id={ebook._id}
                                        title={ebook.title}
                                        onDelete={handleDelete}
                                    />
                                );
                            })}
                        <div
                            className="bg-[#2D4740] text-white p-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#C26320] transition"
                            onClick={() => setShowModal(true)}
                        >
                            <span className="text-xl font-bold">
                                Upload eBook
                            </span>
                        </div>
                    </>
                )}
            </div>

            {showModal && (
                <UploadEbookModal onClose={() => setShowModal(false)} />
            )}
        </div>
    );
};

export default Dashboard;
