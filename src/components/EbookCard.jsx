import React from "react";
import { Link } from "react-router-dom";

const EbookCard = ({ id, title, onDelete }) => {
    // console.log({ id, title, onDelete });
    return (
        <div className="bg-[#2D4740] text-white p-6 rounded-lg shadow-md flex flex-col items-center">
            <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
            <div className="flex gap-4">
                <Link to={`/read/${id}`}>
                    <button className="bg-[#C26320] hover:bg-[#A9B092] text-white py-2 px-4 rounded transition">
                        Read Now
                    </button>
                </Link>
                <button
                    onClick={() => onDelete(id)}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default EbookCard;
