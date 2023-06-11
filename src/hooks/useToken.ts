import useTokenCookies from "@/hooks/useTokenCookies";
import decryptToken from "@/helpers/decryptToken";

export default function useToken(){
    const [{token}] = useTokenCookies()
    return decryptToken(token);
}