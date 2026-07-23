import { supabase } from "./supabaseClient";

const BUCKET = "documentos-clientes";

export async function uploadFile(file, folder) {
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${folder}/${Date.now()}-${safeName}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file);
  if (error) {
    console.error("No se pudo subir el archivo", error);
    return { ok: false, error: error.message };
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl, nombre: file.name };
}

export async function loadSaved() {
  const { data, error } = await supabase
    .from("intakes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("No se pudo cargar", error);
    return [];
  }
  return data.map((r) => ({ id: r.id, tipo: r.tipo, empresa: r.empresa, fecha: r.fecha, data: r.data }));
}

export async function insertSaved(registro) {
  const { error } = await supabase.from("intakes").insert({
    id: registro.id,
    tipo: registro.tipo,
    empresa: registro.empresa,
    fecha: registro.fecha,
    data: registro.data,
  });
  if (error) console.error("No se pudo guardar", error);
  return !error;
}

export async function deleteSaved(id) {
  const { error } = await supabase.from("intakes").delete().eq("id", id);
  if (error) console.error("No se pudo eliminar", error);
}
