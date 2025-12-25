import { getRequestConfig as getBaseRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default async function getRequestConfig({
	locale,
}: {
	locale: string;
}) {
	return {
		locale,
		messages: (await import(`./messages/${locale}.json`)).default,
		timeZone: "UTC",
		now: new Date(),
	};
}
