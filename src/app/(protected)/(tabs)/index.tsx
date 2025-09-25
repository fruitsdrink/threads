import { PostListItem } from "@/components/PostListItem";
import { dummyPosts } from "@/dummy-data";
import { Link } from "expo-router";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <FlatList
      data={dummyPosts}
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
