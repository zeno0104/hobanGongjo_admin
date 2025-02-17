import { supabase } from "../utils/SupabaseClient";

export const getUserData = async () => {
  const { data: guest } = await supabase.from("guest").select("*");
  return guest;
};

export const updateCounselData = async (id: number) => {
  await supabase
    .from("guest")
    .update({ status: "counselCompleted" })
    .eq("id", id)
    .select();
};
export const updateInstallConfirmData = async(id:number)=>{
  await supabase
  .from("guest")
  .update({status: "installConfirm"})
  .eq("id", id)
  .select()
}
export const updateInstallFinished = async(id:number)=>{
  await supabase
  .from("guest")
  .update({status: "installFinished"})
  .eq("id", id)
  .select()
}
export const deleteUserData = async (id: number) => {
  await supabase.from("guest").delete().eq("id", id);
};
