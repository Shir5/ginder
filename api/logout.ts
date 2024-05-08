"use server"

import { deleteSession } from "@/lib/session";
import router from "next/navigation";


export default async function logout() {
    deleteSession();
}