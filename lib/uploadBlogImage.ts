import { supabaseService } from "@/lib/supabaseServer";

export async function uploadBlogImage(
  file: File,
  slug: string
): Promise<string> {
  const supabase = supabaseService();

  const fileExt = file.name.split(".").pop();
  const filePath = `${slug}-${Date.now()}.${fileExt}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(filePath, file, {
      contentType: file.type,
      upsert: true,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
