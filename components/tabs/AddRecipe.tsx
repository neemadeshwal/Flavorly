import { recipeSchema } from "@/schema";
import { recipeFormType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import {
  useAddRecipeMutation,
  useUpdateRecipeMutation,
} from "@/hooks/mutation/recipe";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "../ui/form-control";
import { HStack } from "../ui/hstack";
import { Icon } from "../ui/icon";
import { Input, InputField } from "../ui/input";
import { Switch } from "../ui/switch";
import { Text } from "../ui/text";
import { VStack } from "../ui/vstack";

const cuisineItemsArr = [
  { label: "Indian", value: "Indian" },
  { label: "Italian", value: "Italian" },
  { label: "Chinese", value: "Chinese" },
  { label: "Mexican", value: "Mexican" },
  { label: "Thai", value: "Thai" },
  { label: "French", value: "French" },
  { label: "American", value: "American" },
  { label: "Mediterranean", value: "Mediterranean" },
  { label: "Japanese", value: "Japanese" },
  { label: "Other", value: "Other" },
];

const categoryItemsArr = [
  { label: "Breakfast", value: "breakfast" },
  { label: "Lunch", value: "lunch" },
  { label: "Dinner", value: "dinner" },
  { label: "Snack", value: "snack" },
  { label: "Dessert", value: "dessert" },
  { label: "Beverage", value: "beverage" },
  { label: "Appetizer", value: "appetizer" },
  { label: "Main Course", value: "main course" },
  { label: "Side Dish", value: "side dish" },
  { label: "Salad", value: "salad" },
  { label: "Soup", value: "soup" },
  { label: "Smoothie", value: "smoothie" },
  { label: "Grill", value: "grill" },
  { label: "Baking", value: "baking" },
];

const AddRecipe = ({
  setCloseDialog,
  isEdit,
  editData,
}: {
  setCloseDialog: React.Dispatch<React.SetStateAction<boolean>>;
  isEdit?: boolean;
  editData?: any;
}) => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<recipeFormType>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      ingredients: [],
      instructions: [],
      imageUrl: "",
      cuisineType: undefined,
      category: undefined,
      timeTaken: "",
      calories: "",
      protein: "",
      fats: "",
      carbs: "",
      isFeatured: false,
      isEditorsChoice: false,
      isFavourite: false,
      isPopularRecipe: false,
      isVeg: false,
    },
  });

  useEffect(() => {
    if (isEdit && editData) {
      reset({
        title: editData.title,
        description: editData.description,
        ingredients: editData.ingredients,
        instructions: editData.instructions,
        imageUrl: editData.imageUrl,
        cuisineType: editData.cuisineType,
        category: editData.category,
        timeTaken: editData.timeTaken,
        calories: String(editData.calories),
        protein: String(editData.protein),
        carbs: String(editData.carbs),
        fats: String(editData.fats),
        isFeatured: editData.isFeatured === true,
        isEditorsChoice: editData.isEditorsChoice === true,
        isPopularRecipe: editData.isPopularRecipe === true,
        isVeg: editData.isVeg === true,
      });
    }
  }, []);

  const [cuisineItems, setCuisineItems] = useState(cuisineItemsArr);
  const [cuisineDropdownOpen, setCuisineDropdownOpen] = useState(false);
  const [categoryItems, setCategoryItems] = useState(categoryItemsArr);
  const [categoryDropDownOpen, setCategoryDropdownOpen] = useState(false);
  const {
    fields: ingredients,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({ control, name: "ingredients" });
  const {
    fields: instructions,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({ control, name: "instructions" });

  const addRecipeMutation = useAddRecipeMutation();
  const updateRecipeMutation = useUpdateRecipeMutation();

  const onSubmit = async (data: any) => {
    try {
      if (isEdit) {
        const response = await updateRecipeMutation.mutateAsync({
          id: editData._id,
          data: data,
        });
      } else {
        const response = await addRecipeMutation.mutateAsync(data);
      }
      setCloseDialog(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
  };

  return (
    <Modal
      visible={true}
      transparent
      animationType="fade"
      onRequestClose={() => setCloseDialog(false)}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            maxWidth: 500,
            height: "97%",
            borderRadius: 24,
            zIndex: 10000,
            padding: 16,
            elevation: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.25,
            shadowRadius: 20,
            flex: 1,
            maxHeight: "90%",
          }}
          className="bg-white dark:bg-[#202225]"
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={() => setCloseDialog(false)}
            style={{
              position: "absolute",
              right: 16,
              top: 16,
              zIndex: 50,
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon as={X} size={25} className="dark:text-white text-black " />
          </TouchableOpacity>

          {/* Header */}
          <View
            style={{ marginTop: 20, marginBottom: 20, alignItems: "center" }}
          >
            <Text className="dark:text-white text-[24px] font-bold text-center">
              {isEdit ? "Edit Recipe" : "Add New Recipe"}
            </Text>
          </View>

          {/* Scrollable Form */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={!cuisineDropdownOpen && !categoryDropDownOpen}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <FormControl className="flex flex-col gap-4" size="md">
              {/* Title */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Title
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter recipe title"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.title && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </Text>
                )}
              </VStack>

              {/* Description */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Description
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="description"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter recipe description"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.description && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </Text>
                )}
              </VStack>

              {/* Category */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Category
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="category"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DropDownPicker
                      open={categoryDropDownOpen}
                      value={value}
                      setValue={(callback) => {
                        const newValue = callback(value);
                        onChange(newValue);
                      }}
                      setOpen={setCategoryDropdownOpen}
                      items={categoryItems}
                      setItems={setCategoryItems}
                      placeholder="Select category"
                      onChangeValue={(val) => {
                        onChange(val);
                      }}
                    />
                  )}
                />
                {errors.category && (
                  <Text className="text-red-500">
                    {errors.category.message}
                  </Text>
                )}
              </VStack>

              {/* Ingredients */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Ingredients
                  </FormControlLabelText>
                </FormControlLabel>
                {ingredients.map((field, index) => (
                  <View key={field.id} className="mt-2 space-y-4">
                    <Controller
                      control={control}
                      name={`ingredients.${index}.name`}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          variant="outline"
                          className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                        >
                          <InputField
                            className=""
                            placeholder="Name"
                            value={value}
                            onChangeText={onChange}
                          />
                        </Input>
                      )}
                    />
                    <View className="flex-row space-x-2 mt-3 gap-4">
                      <Controller
                        control={control}
                        name={`ingredients.${index}.quantity`}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            variant="outline"
                            className="rounded-2xl h-[70px] w-[100px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                          >
                            <InputField
                              placeholder="Quantity"
                              keyboardType="numeric"
                              value={`${value}`}
                              onChangeText={(v) => onChange(Number(v))}
                            />
                          </Input>
                        )}
                      />
                      <Controller
                        control={control}
                        name={`ingredients.${index}.unit`}
                        render={({ field: { value, onChange } }) => (
                          <Input
                            variant="outline"
                            className="rounded-2xl h-[70px] w-[100px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                          >
                            <InputField
                              placeholder="Unit"
                              value={value}
                              onChangeText={onChange}
                            />
                          </Input>
                        )}
                      />
                    </View>
                    <TouchableOpacity
                      onPress={() => removeIngredient(index)}
                      className="text-red-500"
                    >
                      <Text className="text-red-500">Remove</Text>
                    </TouchableOpacity>
                    {errors.ingredients?.[index] && (
                      <Text className="text-red-500">
                        {errors.ingredients[index]?.name?.message ||
                          errors.ingredients[index]?.quantity?.message ||
                          errors.ingredients[index]?.unit?.message}
                      </Text>
                    )}
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() =>
                    appendIngredient({ name: "", quantity: 0, unit: "" })
                  }
                  className="mt-2 bg-card rounded-lg py-2 items-center"
                >
                  <Text className="text-white">Add Ingredient</Text>
                </TouchableOpacity>
              </VStack>

              {/* Instructions */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Instructions
                  </FormControlLabelText>
                </FormControlLabel>
                {instructions.map((field, index) => (
                  <View
                    key={index + field.id}
                    className="mt-2 space-y-2 flex flex-col gap-3"
                  >
                    <Controller
                      control={control}
                      name={`instructions.${index}.stepNumber`}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          variant="outline"
                          className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                        >
                          <InputField
                            placeholder="Step #"
                            keyboardType="numeric"
                            value={`${value}`}
                            onChangeText={(v) => onChange(Number(v))}
                          />
                        </Input>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`instructions.${index}.title`}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          variant="outline"
                          className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                        >
                          <InputField
                            placeholder="Step Title"
                            value={value}
                            onChangeText={onChange}
                          />
                        </Input>
                      )}
                    />
                    <Controller
                      control={control}
                      name={`instructions.${index}.text`}
                      render={({ field: { value, onChange } }) => (
                        <Input
                          variant="outline"
                          className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                        >
                          <InputField
                            placeholder="Step Description"
                            multiline
                            value={value}
                            onChangeText={onChange}
                          />
                        </Input>
                      )}
                    />
                    <TouchableOpacity
                      onPress={() => removeInstruction(index)}
                      className="text-red-500"
                    >
                      <Text className="text-red-500">Remove</Text>
                    </TouchableOpacity>
                    {errors.instructions?.[index]?.text && (
                      <Text className="text-red-500">
                        {errors.instructions[index]?.text?.message}
                      </Text>
                    )}
                  </View>
                ))}
                <TouchableOpacity
                  onPress={() =>
                    appendInstruction({
                      stepNumber: instructions.length + 1,
                      title: "",
                      text: "",
                    })
                  }
                  className="mt-2 bg-card rounded-lg py-2 items-center"
                >
                  <Text className="text-white">Add Instruction</Text>
                </TouchableOpacity>
              </VStack>

              {/* Image URL */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Image URL
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="imageUrl"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter image URL"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.imageUrl && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.imageUrl.message}
                  </Text>
                )}
              </VStack>

              {/* Cuisine Picker */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Cuisine
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="cuisineType"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DropDownPicker
                      open={cuisineDropdownOpen}
                      value={value}
                      setValue={(callback) => {
                        const newValue = callback(value);
                        onChange(newValue);
                      }}
                      setOpen={setCuisineDropdownOpen}
                      items={cuisineItems}
                      setItems={setCuisineItems}
                      placeholder="Select cuisine type"
                      onChangeValue={(val) => {
                        onChange(val);
                      }}
                    />
                  )}
                />
                {errors.cuisineType && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.cuisineType.message}
                  </Text>
                )}
              </VStack>

              {/* Time & Nutrients */}
              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Time Taken
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="timeTaken"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter time taken"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.timeTaken && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.timeTaken.message}
                  </Text>
                )}
              </VStack>

              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Calories
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="calories"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter calories"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.calories && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.calories.message}
                  </Text>
                )}
              </VStack>

              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Protein
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="protein"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter protein intake"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.protein && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.protein.message}
                  </Text>
                )}
              </VStack>

              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Fats
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="fats"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter fats amount"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.fats && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.fats.message}
                  </Text>
                )}
              </VStack>

              <VStack>
                <FormControlLabel>
                  <FormControlLabelText className="font-semibold mb-3 text-[20px]">
                    Carbs
                  </FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="carbs"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      variant="outline"
                      className="rounded-2xl h-[70px] px-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border-2 border-gray-300"
                    >
                      <InputField
                        type="text"
                        value={value}
                        onChangeText={onChange}
                        className="placeholder:font-[500] text-[20px]"
                        placeholder="Enter carbs amount"
                        onBlur={onBlur}
                      />
                    </Input>
                  )}
                />
                {errors.carbs && (
                  <Text className="text-red-500 text-sm mt-1">
                    {errors.carbs.message}
                  </Text>
                )}
              </VStack>

              {/* Boolean Switches */}
              {[
                { label: "Featured", name: "isFeatured" },
                { label: "Editor's Choice", name: "isEditorsChoice" },
                { label: "Favourite", name: "isFavourite" },
                { label: "Popular Recipe", name: "isPopularRecipe" },
                { label: "Vegetarian", name: "isVeg" },
              ].map(({ label, name }) => (
                <VStack key={name}>
                  <Controller
                    control={control}
                    name={name as any}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <HStack className="flex gap-4 items-center">
                        <Text className="font-semibold text-lg mt-4">
                          {label}
                        </Text>
                        <Switch
                          value={value}
                          onValueChange={(val) => {
                            onChange(val);
                          }}
                          size="md"
                          trackColor={{ false: "#d4d4d4", true: "#70b9b3" }}
                          thumbColor="#fafafa"
                          ios_backgroundColor="#d4d4d4"
                        />
                      </HStack>
                    )}
                  />
                </VStack>
              ))}

              {/* Submit */}
              <TouchableOpacity
                onPress={handleSubmit(onSubmit, onError)}
                className="mt-[32px] bg-card dark:bg-button rounded-[12px] py-4 items-center"
              >
                <Text className="text-white font-semibold text-lg">
                  {isEdit ? "Update Recipe" : "Save Recipe"}
                </Text>
              </TouchableOpacity>
            </FormControl>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddRecipe;
