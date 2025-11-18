import type { Company } from "@/data/types";
import { useQuery } from "@tanstack/react-query";
import { getAll } from "./controller";

const COMPANY = "company";
const DEPARTMENT = "department";
const UNIT = "unit";

/* USE KYLE'S API */
