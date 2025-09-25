import { PostListItem } from "@/components/PostListItem";
import { dummyPosts } from "@/dummy-data";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <FlatList
      data={dummyPosts}
      renderItem={({ item }) => <PostListItem post={item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
