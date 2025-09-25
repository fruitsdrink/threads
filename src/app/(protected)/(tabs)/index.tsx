import { PostListItem } from "@/components/PostListItem";
import { dummyPosts } from "@/dummy-data";
import { Link } from "expo-router";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { useState } from "react";
import { Post } from "@/types";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchPosts = async () => {
  const { data } = await supabase
    .from("posts")
    .select("*,user:profiles(*)")
    .order("created_at", { ascending: false })
    .throwOnError();

  return data;
};

export default function HomeScreen() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts
  });

  const queryClient = useQueryClient()

  // console.log(JSON.stringify(posts,null,2))

  if(isLoading){
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    )
  }
  if(error){
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-red-500">{error.message ?? "Something went wrong"}</Text>
      </View>
    )
  }
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <>
          <Link
            href={"/new"}
            className="text-blue-500 p-4 text-center text-3xl"
          >
            New Post
          </Link>
        </>
      )}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={()=>{
          // console.log("refreshing")
          queryClient.invalidateQueries({
            queryKey: ["posts"],
          })
        }} />
      }
    />
  );
}
