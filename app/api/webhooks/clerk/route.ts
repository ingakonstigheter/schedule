import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser } from "../../../../lib/data/user";
import { User } from "../../../../lib/types/types";

export async function POST(req: Request) {
  const body = await req.json();
  const { type, data } = body;
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
      if (!response.success) {
        return new Response("Error occurd when syncing with database", {
          status: 400,
        });
      }
      return new Response("OK", { status: 200 });
    } catch (err) {
      console.log("error creating user", err);
      return new Response("Error occurd when syncing with database", {
        status: 400,
      });
    }
  }
  if (type === "user.deleted") {
    try {
      const response = await deleteUser(data.id);
      if (!response.success) {
        return new Response("Error occurd when syncing with database", {
          status: 400,
        });
      }
      return new Response("OK", { status: 200 });
    } catch (err) {
      console.log("error creating user", err);
      return new Response("Error occurd when syncing with database", {
        status: 400,
      });
    }
  } else {
    return new Response("ERROR", { status: 400 });
  }
}
