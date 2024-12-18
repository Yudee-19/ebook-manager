import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/signup", formData);
            alert("Signup successful!");
            navigate("/login");
        } catch (error) {
            console.error(error.response.data);
            alert("Signup failed!");
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-[#2D4740] p-8 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl text-[#C26320] font-bold mb-6 text-center">
                    Sign Up
                </h2>

                <input
                    name="name"
                    placeholder="Name"
                    className="w-full mb-4 p-3 rounded-lg bg-[#A9B092] placeholder-black text-black"
                    onChange={handleChange}
                />
                <input
                    name="email"
                    placeholder="Email"
                    type="email"
                    className="w-full mb-4 p-3 rounded-lg bg-[#A9B092] placeholder-black text-black"
                    onChange={handleChange}
                />
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="w-full mb-4 p-3 rounded-lg bg-[#A9B092] placeholder-black text-black"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="w-full bg-[#C26320] hover:bg-[#2D4740] text-white py-3 rounded-lg transition"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
