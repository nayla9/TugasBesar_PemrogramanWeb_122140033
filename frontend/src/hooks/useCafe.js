import { useState, useEffect } from "react";
import axios from "axios";

export function useCafe() {
  const [cafes, setCafes] = useState([]);

  const fetchCafes = async () => {
    try {
      const res = await axios.get("/cafes");
      setCafes(res.data.cafes);
    } catch (err) {
      console.error("Gagal fetch cafes:", err);
    }
  };

  const createCafe = async (data) => {
    try {
      const res = await axios.post("/cafes/create", data);
      if (res.data.status === "success") {
        fetchCafes();
      } else {
        console.error("Gagal tambah cafe:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal tambah cafe:", err);
    }
  };

  const updateCafe = async (id, data) => {
    try {
      const res = await axios.put(`/cafes/update/${id}`, data);
      if (res.data.status === "success") {
        fetchCafes();
      } else {
        console.error("Gagal update cafe:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal update cafe:", err);
    }
  };

  const deleteCafe = async (id) => {
    try {
      const res = await axios.delete(`/cafes/delete/${id}`);
      if (res.data.status === "success") {
        fetchCafes();
      } else {
        console.error("Gagal hapus cafe:", res.data.message);
      }
    } catch (err) {
      console.error("Gagal hapus cafe:", err);
    }
  };

  useEffect(() => {
    fetchCafes();
  }, []);

  return { cafes, createCafe, updateCafe, deleteCafe };
}