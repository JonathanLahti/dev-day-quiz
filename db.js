import * as dotenv from "dotenv";
dotenv.config();

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://sethfccmmlalsogwkvov.supabase.co";

// fuck it hardcode it
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNldGhmY2NtbWxhbHNvZ3drdm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1NTQ4MDMsImV4cCI6MTk4MzEzMDgwM30.HFs9jNRPXK7d3sSYi0Qm6Rn5QQP1e5sbWWHfmLl5bu4';
const supabase = createClient(supabaseUrl, supabaseKey);

export const insertPlayerScore = async (playerName, score) => {
  const { data, error } = await supabase
    .from("quiz")
    .insert([{ player: playerName, score: score }]);

  if (error) console.log(error);
};

export const getRankings = async () => {
  let { data: quiz, error } = await supabase
    .from("quiz")
    .select("player, score")
    .order("score", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }


  return quiz;
};
