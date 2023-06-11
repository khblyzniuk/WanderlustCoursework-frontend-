import {useCookies} from "react-cookie";

export default function useTokenCookies() {
    return useCookies(['token']);
}