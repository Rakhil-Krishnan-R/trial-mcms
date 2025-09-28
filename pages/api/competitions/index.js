import { connectDB } from "../../../lib/mongodb";
import Competition from "../../../models/Competition";
import { getSessionFromReq } from "../_helpers/getSession";

export default async function handler(req, res){
  await connectDB();
  const session = getSessionFromReq(req);
  if (!session) return res.status(401).json({ message: "Unauthorized" });

  if (req.method === "GET"){
    const comps = await Competition.find({ adminId: session.id }).sort({ createdAt: -1 });
    return res.json(comps);
  }
  if (req.method === "POST"){
    const payload = req.body;
    payload.adminId = session.id;
    payload.totalMarks = (payload.scoringRubric || []).reduce((s,c)=> s + Number(c.maxMarks||0), 0);
    const comp = await Competition.create(payload);
    return res.status(201).json(comp);
  }
  return res.status(405).end();
}
