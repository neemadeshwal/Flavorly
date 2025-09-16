import EditorChoice from "@/components/tabs/EditorChoice";
import Category from "@/components/tabs/home/category";
import { Icon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useEditorsChoiceList } from "@/Query/recipe";
import { recipe } from "@/types";
import { ArrowLeft, SearchIcon } from "lucide-react-native";
import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native"; // Add this import
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, error } = useEditorsChoiceList();

  // Filter recipes based on title matching search query
  const filteredRecipes =
    data?.recipes?.filter((recipe: recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <ScrollView
      className="px-6 pt-20"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <TouchableOpacity className="absolute top-1 left-0 text-gray-500">
          <Icon as={ArrowLeft} className="w-10 h-10 text-gray-500" />
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "PoppinsSemiBold" }}
          className=" text-[26px] capitalize text-center"
        >
          Search
        </Text>
      </View>

      {/* Search input */}
      <View className="mt-6">
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
  );
};

export default Search;
