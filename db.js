import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://igglygwqxxrpqezogysi.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export const insertPlayerScore = async (playerName, score) => {
  const { data, error } = await supabase
    .from("dev_quiz")
    .insert([{ player_name: playerName, player_score: score }]);

  if (!error) console.log(error);
};
