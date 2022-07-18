import axios from "axios";

export default async () => await axios.get("/sanctum/csrf-cookie");
