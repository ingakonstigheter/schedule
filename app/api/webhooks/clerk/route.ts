import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser } from "../../../../lib/data/user";
import { User } from "../../../../lib/types/types";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Add CLER_WEBHOOK_SECRET from Clerk dashboard");
  }
  const headerPayload = headers();
  const svix_id = (await headerPayload).get("svix-id");
  const svix_timestamp = (await headerPayload).get("svix-timestamp");
  const svix_signature = (await headerPayload).get("svix-signature");
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  /* 
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;
  try {
    evt = wh.verify(body, {
      svix_id: svix_id,
      svix_timestamp: svix_timestamp,
      svix_signature: svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
 */
  const { type, data } = payload;
  if (type === "user.created") {
    const { id, email_addresses, first_name, last_name } = data;
    const user = {
      clerkUserId: id,
      email: email_addresses[0].email_address,
      firstName: first_name,
      lastName: last_name,
      role: "user",
    };
    try {
      const response = await createUser(user as User);
      console.log(response.success);
      /*   if (!response.success) {
        return new Response("Error occurd when syncing with database", {
          status: 400,
        });
      } */
    } catch (err) {
      console.log("error creating user", err);
    }
    return new Response("OK", { status: 200 });
  }
  if (type === "user.deleted") {
    const response = await deleteUser(data.id);
    if (!response.success) {
      return new Response("Error occurd when syncing with database", {
        status: 400,
      });
    }
    return new Response("OK", { status: 200 });
  } else {
    return new Response("OK", { status: 200 });
  }
}
