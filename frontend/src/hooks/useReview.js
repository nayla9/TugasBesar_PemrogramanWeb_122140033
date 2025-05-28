import { useState, useEffect } from "react";
import axios from "axios";

export function useReview() {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const res = await axios.get("/reviews");
      setReviews(res.data.reviews);
    } catch (err) {
      console.error("Gagal fetch reviews:", err);
    }
  };

  const createReview = async (data) => {
    try {
      const res = await axios.post("/reviews/create", data);
      if (res.data.status === "success") {
        fetchReviews();
      } else {
        console.error("Gagal tambah review:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal tambah review:", err);
    }
  };

  const updateReview = async (id, data) => {
    try {
      const res = await axios.put(`/reviews/update/${id}`, data);
      if (res.data.status === "success") {
        fetchReviews();
      } else {
        console.error("Gagal update review:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal update review:", err);
    }
  };

  const deleteReview = async (id) => {
    try {
      const res = await axios.delete(`/reviews/delete/${id}`);
      if (res.data.status === "success") {
        fetchReviews();
      } else {
        console.error("Gagal hapus review:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal hapus review:", err);
    }co
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return { reviews, createReview, updateReview, deleteReview };
}