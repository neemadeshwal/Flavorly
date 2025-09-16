import EditorChoice from "@/components/tabs/EditorChoice";
import Category from "@/components/tabs/home/category";
import { Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useEditorsChoiceList } from "@/Query/recipe";
import { recipe } from "@/types";
import { useRouter } from "expo-router";
import { ArrowLeft, SearchIcon } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useEditorsChoiceList();
  const router = useRouter();

  const filteredRecipes =
    data?.recipes?.filter((recipe: recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 100,
            paddingTop: 40,
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header + Back Button */}
          <View style={{ position: "relative", marginBottom: 16 }}>
            <TouchableOpacity
              onPress={() => {
                router.replace("/(tabs)");
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 10,
                padding: 4,
              }}
            >
              <Icon as={ArrowLeft} className="w-8 h-8 text-gray-500" />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: "PoppinsSemiBold",
              }}
              className="text-[26px] text-center "
            >
              Search
            </Text>
          </View>

          {/* Search Input */}
          <View className="mt-4">
            <Input className="rounded-[18px] h-[60px] border-2">
              <InputSlot className="pl-3">
                <InputIcon as={SearchIcon} />
              </InputSlot>
              <InputField
                value={searchQuery}
                onChangeText={(val) => setSearchQuery(val)}
                className="text-[18px]"
                placeholder="Search"
              />
            </Input>
          </View>

          {/* Categories */}
          <View className="mt-6">
            <Category />
          </View>

          {/* Editor's Choice */}
          <View className="mt-6">
            <EditorChoice
              data={{ ...data, recipes: filteredRecipes }}
              isLoading={isLoading}
              error={error}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
