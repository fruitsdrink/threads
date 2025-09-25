import { PostListItem } from "@/components/PostListItem";
import { dummyPosts } from "@/dummy-data";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";
import { useState } from "react";
import { Post } from "@/types";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const {data, error} = await supabase.from('posts').select('*,user:profiles(*)')
      if(error) throw error;
      setPosts(data)
    }
    fetchPosts()
  }, [])

  console.log(JSON.stringify(posts,null,2))
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
    />
  );
}
