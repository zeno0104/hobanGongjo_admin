import { supabase } from "../utils/SupabaseClient";

export const getUserData = async () => {
  const { data: guest } = await supabase.from("guest").select("*");
  return guest;
};

export const updateCounselData = async (id: number) => {
  await supabase
    .from("guest")
    .update({ is_counsel_completed: true })
    .eq("id", id)
    .select();
};
export const deleteUserData = async (id: number) => {
  await supabase.from("guest").delete().eq("id", id);
};
