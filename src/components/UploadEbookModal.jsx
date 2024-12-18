import React, { useState } from "react";
import api from "../api";

const UploadEbookModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        title: "",
        genre: "",
        author: "",
        description: "",
        file: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate if file exists
        if (!formData.file) {
            alert("Please select a file to upload");
            return;
        }

        console.log("Form state before submission:", formData);
        const data = new FormData();
        console.log(data);
        data.append("ebook", formData.file);
        data.append("title", formData.title);
        data.append("genre", formData.genre);
        data.append("author", formData.author);
        data.append("description", formData.description);

        console.log(data);
        for (let pair of data.entries()) {
            console.log(pair[0] + ": " + pair[1]);
        }

        try {
            await api.post("/ebooks", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("eBook uploaded successfully!");
            onClose();
        } catch (error) {
            console.error("Upload failed:", error);
            console.error("Response data:", error.response?.data);
            console.error("Status code:", error.response?.status);
            alert(
                `Upload failed: ${
                    error.response?.data?.message || error.message
                }`
            );
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-[#2D4740] p-8 rounded-lg w-full max-w-lg">
                <h2 className="text-2xl text-[#C26320] font-bold mb-6 text-center">
                    Upload eBook
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        name="title"
                        placeholder="Title"
                        className="p-3 rounded bg-[#A9B092] placeholder-black text-black"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="genre"
                        placeholder="Genre"
                        className="p-3 rounded bg-[#A9B092] placeholder-black text-black"
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="author"
                        placeholder="Author"
                        className="p-3 rounded bg-[#A9B092] placeholder-black text-black"
                        onChange={handleChange}
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="p-3 rounded bg-[#A9B092] placeholder-black text-black"
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="file"
                        name="file"
                        className="p-3 bg-[#A9B092] text-black"
                        onChange={handleChange}
                        required
                    />
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-[#C26320] hover:bg-[#A9B092] text-white py-2 px-4 rounded transition"
                        >
                            Upload
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadEbookModal;
