import { supabase } from "../utils/SupabaseClient";
type Data = {
  content: string;
  created_at: string;
  id: number;
  install_location: string;
  install_type: string;
  name: string;
  phone_number: string;
  region: string;
  type: string;
  status: string;
};
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
export const updateInstallFinished = async (user_id: number) => {
  const { data, error } = await supabase
    .from("guest")
    .update({ status: "installFinished" })
    .eq("id", user_id)
    .select();

  if (error) {
    console.error("Update error:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.error("No data found for user_id:", user_id);
    return;
  }

  const installData: Data = data[0]; // data 배열에서 첫 번째 항목을 Data 타입으로 사용

  console.log(installData.id, installData.created_at, installData.name);

  const { error: insertError } = await supabase
    .from("install_finished")
    .insert({
      id: installData.id,
      created_at: installData.created_at,
      name: installData.name,
      phone_number: installData.phone_number,
      install_location: installData.install_location,
      type: installData.type,
      content: installData.content,
      region: installData.region,
      install_type: installData.install_type,
      status: installData.status,
    })
    .select();

  if (insertError) {
    console.error("Insert error:", insertError);
  }
};

export const deleteUserData = async (id: number) => {
  await supabase.from("guest").delete().eq("id", id);
};
