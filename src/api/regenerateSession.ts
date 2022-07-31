import axios from "@/api";

export default async () => await axios.get("/sanctum/csrf-cookie");