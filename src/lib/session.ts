import { cookies } from "next/headers";
import { decodeGrant } from "./access";

export async function getGrant() {
  const jar = await cookies();
  return decodeGrant(jar.get("nexus_access")?.value);
}
