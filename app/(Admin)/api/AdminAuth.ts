// import { getServerSession } from "next-auth";
// import { GET } from "../auth/[...nextauth]/route";

// export default async (req,res) => {
//     const session = await getServerSession(req,res, GET)

//     if (session) {
//         res.send({
//             content: "Connected",
//         })
//     }
//     else {
//         res.send({
//             error:'Not signed in.'
//         })
//     }
// }