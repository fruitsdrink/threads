import { supabase } from "@/lib/supabase";
import { Text, View } from "react-native";

export default function ProfileScreen(){
    async function handleSignOut(){
        try{
            await supabase.auth.signOut();
        }catch(error){
            console.log(error);
        }
    }
        
    return (
        <View className="flex-1 items-center justify-center">
            <Text onPress={handleSignOut} className="text-2xl font-bold text-white">Sign Out</Text>
        </View>
    )
}