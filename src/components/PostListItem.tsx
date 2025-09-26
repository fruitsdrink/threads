import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
import { Tables } from "@/types/database.types";

type PostWithUser = Tables<"posts"> & {
  user: Tables<"profiles">;
};

type Props = {
  post: PostWithUser;
};
dayjs.extend(relativeTime);
dayjs.locale("zh-cn");

export const PostListItem: React.FC<Props> = ({ post }) => {
  const { user } = post;
  const time = dayjs(post.created_at).fromNow();

  return (
    <View className="flex-row p-4 border-b border-gray-800/70">
      {/* 头像 */}
      <View className="mr-3">
        <Image
          source={{ uri: user.avatar_url! }}
          className="w-12 h-12 rounded-full"
        />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="text-white font-semibold mr-2" numberOfLines={1}>
            {user.username}
          </Text>
          <Text className="text-gray-500">· {time}</Text>
        </View>

        <Text className="text-white mt-2 mb-3">{post.content}</Text>

        <View className="flex-row gap-4 mt-2">
          <Pressable className="flex-row items-center gap-1">
            <Ionicons name="heart-outline" size={16} color={"#d1d5db"} />
            <Text className="text-gray-300 ml-2">{0}</Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-1">
            <Ionicons name="chatbubble-outline" size={16} color={"#d1d5db"} />
            <Text className="text-gray-300 ml-2">0</Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-1">
            <Ionicons name="repeat-outline" size={16} color={"#d1d5db"} />
            <Text className="text-gray-300 ml-2">0</Text>
          </Pressable>
          <Pressable className="flex-row items-center gap-1">
            <Ionicons name="paper-plane-outline" size={16} color={"#d1d5db"} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};
