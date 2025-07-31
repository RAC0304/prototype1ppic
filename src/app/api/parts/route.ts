import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const part_type = searchParams.get("part_type") || "";

    let query = supabase
      .from("parts")
      .select("*")
      .order("created_at", { ascending: false });

    if (search) {
      query = query.or(
        `part_number.ilike.%${search}%,part_name.ilike.%${search}%`
      );
    }

    if (status) {
      query = query.eq("status", status);
    }

    if (part_type) {
      query = query.eq("part_type", part_type);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from("parts")
      .insert([body])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
