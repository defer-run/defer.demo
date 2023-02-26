import { format } from "date-fns";

export const now = () => format(new Date(), "'Today is a' eeee");
