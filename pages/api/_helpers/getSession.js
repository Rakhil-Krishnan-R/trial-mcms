import cookie from 'cookie';
import { verifyToken } from '../../../lib/auth';
export function getSessionFromReq(req){
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.mcms_token;
  if (!token) return null;
  try { return verifyToken(token); } catch(e) { return null; }
}
