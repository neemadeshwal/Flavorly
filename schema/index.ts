import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Email is required" }),

  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase letter" })
    .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase letter" })
    .regex(/^(?=.*\d)/, { message: "Must include a number" })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Must include a special character (@$!%*?&)",
    }),
});

export const signupSchema = z.object({
  firstname: z
    .string({ message: "first name is required." })
    .min(5, "Firstname should be atleast five characters.")
    .max(20, "First name should be atmost 20 characters."),
  lastname: z.string().optional(),
  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])/, { message: "Must include a lowercase letter" })
    .regex(/^(?=.*[A-Z])/, { message: "Must include an uppercase letter" })
    .regex(/^(?=.*\d)/, { message: "Must include a number" })
    .regex(/^(?=.*[@$!%*?&])/, {
      message: "Must include a special character (@$!%*?&)",
    }),
  phone: z
    .string()
    .regex(/^(\+91)?[1-9]\d{9}$/, {
      message: "Phone number must be 10 digits.",
    })
    .optional(),
});

export const EmailSchema = z.object({
  email: z.email({ message: "Email is required" }),
});

export const recipeSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(2, "Title should be at least 2 characters long")
    .max(100, "Title should not exceed 100 characters"),

  description: z
    .string({ message: "Description is required" })
    .min(10, "Description should be at least 10 characters long")
    .max(500, "Description should not exceed 500 characters"),

  ingredients: z
    .array(
      z.object({
        name: z
          .string({ message: "Ingredient name is required" })
          .min(1, "Ingredient name cannot be empty")
          .max(50, "Ingredient name should not exceed 50 characters"),

        quantity: z
          .number({ message: "Quantity is required" })
          .min(0.1, "Quantity must be greater than 0")
          .max(10000, "Quantity seems too large"),

        unit: z
          .string({ message: "Unit is required" })
          .min(1, "Unit cannot be empty")
          .max(20, "Unit should not exceed 20 characters"),
      })
    )
    .min(1, "At least one ingredient is required")
    .max(50, "Maximum 50 ingredients allowed"),

  instructions: z
    .array(
      z.object({
        stepNumber: z
          .number({ message: "Step number is required" })
          .min(1, "Step number must be at least 1"),

        title: z
          .string({ message: "Step title is required" })
          .min(1, "Step title cannot be empty")
          .max(100, "Step title should not exceed 100 characters"),

        text: z
          .string({ message: "Step instruction is required" })
          .min(5, "Step instruction should be at least 5 characters long")
          .max(1000, "Step instruction should not exceed 1000 characters"),
      })
    )
    .min(1, "At least one instruction step is required")
    .max(20, "Maximum 20 instruction steps allowed"),

  imageUrl: z
    .string({ message: "Image URL is required" })
    .min(1, "Image URL cannot be empty"),

  cuisineType: z.enum(
    [
      "Indian",
      "Italian",
      "Chinese",
      "Mexican",
      "Thai",
      "French",
      "American",
      "Mediterranean",
      "Japanese",
      "Other",
    ],
    {
      message: "Please select a valid cuisine type",
    }
  ),
  category: z.enum(
    [
      "breakfast",
      "lunch",
      "dinner",
      "snack",
      "dessert",
      "beverage",
      "appetizer",
      "main course",
      "side dish",
      "salad",
      "soup",
      "smoothie",
      "grill",
      "baking",
    ],
    {
      message: "Please select a valid category type",
    }
  ),

  isFeatured: z.boolean(),

  isEditorsChoice: z.boolean(),

  isFavourite: z.boolean(),

  isPopularRecipe: z.boolean(),

  timeTaken: z
    .string({ message: "Time taken is required" })
    .min(1, "Time taken cannot be empty")
    .max(20, "Time taken should not exceed 20 characters")
    .regex(
      /^\d+\s*(min|mins|minutes|hr|hrs|hours?|h)$/i,
      "Time format should be like '30 min' or '2 hrs'"
    ),

  calories: z
    .string({ message: "Calories value is required" })
    .min(1, "Calories must be at least 1")
    .max(10000, "Calories value seems too high"),
  protein: z
    .string({ message: "Protein value is required" })
    .min(1, "Protein value is required")
    .max(1000, "Protein value seems too high"),

  fats: z
    .string({ message: "Fats value is required" })
    .min(1, "Fats value is required")
    .max(1000, "Fats value seems too high"),

  carbs: z
    .string({ message: "Carbs value is required" })
    .min(1, "Carbs value is required")
    .max(1000, "Carbs value seems too high"),

  isVeg: z.boolean({ message: "Dietary preference is required" }),
});

export const userDetailSchema = z.object({
  firstname: z
    .string({ message: "first name is required." })
    .min(5, "Firstname should be atleast five characters.")
    .max(20, "First name should be atmost 20 characters."),
  lastname: z.string().optional(),
  bio: z.string().optional(),

  phoneNumber: z
    .string()

    .optional()
    .refine((val) => !val || /^(\+91)?[1-9]\d{9}$/.test(val), {
      message: "Phone number must be 10 digits.",
    }),
});
