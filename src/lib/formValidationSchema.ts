import { z } from "zod";

// Schema for validating subject data
export const subjectSchema = z.object({
    id: z.coerce.number().optional(), // Optional subject ID
    name: z.string().min(1, { message: "Subject name is required!" }), // Subject name must be at least 1 character long
    teachers: z.array(z.string()), // Array of teacher IDs
});

export type SubjectSchema = z.infer<typeof subjectSchema>; // Type inference for subject schema

// Schema for validating class data
export const classSchema = z.object({
    id: z.coerce.number().optional(), // Optional class ID
    name: z.string().min(1, { message: "Class name is required!" }), // Class name must be at least 1 character long
    capacity: z.coerce.number().min(1, { message: "Capacity is required!" }), // Capacity must be at least 1
    gradeId: z.coerce.number().min(1, { message: "Grade ID is required!" }), // Grade ID must be at least 1
    supervisorId: z.coerce.string().optional(), // Optional supervisor ID
});

export type ClassSchema = z.infer<typeof classSchema>; // Type inference for class schema

// Schema for validating teacher data
export const teacherSchema = z.object({
    id: z.string().optional(), // Optional teacher ID
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" }) // Username must be between 3 and 20 characters
        .max(20, { message: "Username must be at most 20 characters long!" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" }) // Password must be at least 8 characters long
        .optional()
        .or(z.literal("")), // Optional password or empty string
    name: z.string().min(1, { message: "First name is required!" }), // First name must be at least 1 character long
    surname: z.string().min(1, { message: "Last name is required!" }), // Last name must be at least 1 character long
    email: z
        .string()
        .email({ message: "Invalid email address!" }) // Valid email address
        .optional()
        .or(z.literal("")), // Optional email or empty string
    phone: z.string().optional(), // Optional phone number
    address: z.string(), // Address is required
    img: z.string().optional(), // Optional image URL
    bloodType: z.string().min(1, { message: "Blood Type is required!" }), // Blood type must be at least 1 character long
    birthday: z.coerce.date({ message: "Birthday is required!" }), // Valid date for birthday
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }), // Sex must be either MALE or FEMALE
    subjects: z.array(z.string()).optional(), // Optional array of subject IDs
});

export type TeacherSchema = z.infer<typeof teacherSchema>; // Type inference for teacher schema

// Schema for validating student data
export const studentSchema = z.object({
    id: z.string().optional(), // Optional student ID
    username: z
        .string()
        .min(3, { message: "Username must be at least 3 characters long!" }) // Username must be between 3 and 20 characters
        .max(20, { message: "Username must be at most 20 characters long!" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long!" }) // Password must be at least 8 characters long
        .optional()
        .or(z.literal("")), // Optional password or empty string
    name: z.string().min(1, { message: "First name is required!" }), // First name must be at least 1 character long
    surname: z.string().min(1, { message: "Last name is required!" }), // Last name must be at least 1 character long
    email: z
        .string()
        .email({ message: "Invalid email address!" }) // Valid email address
        .optional()
        .or(z.literal("")), // Optional email or empty string
    phone: z.string().optional(), // Optional phone number
    address: z.string(), // Address is required
    img: z.string().optional(), // Optional image URL
    bloodType: z.string().min(1, { message: "Blood Type is required!" }), // Blood type must be at least 1 character long
    birthday: z.coerce.date({ message: "Birthday is required!" }), // Valid date for birthday
    sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }), // Sex must be either MALE or FEMALE
    gradeId: z.coerce.number().min(1, { message: "Grade is required!" }), // Grade ID must be at least 1
    classId: z.coerce.number().min(1, { message: "Class is required!" }), // Class ID must be at least 1
    parentId: z.string().min(1, { message: "Parent ID is required!" }), // Parent ID must be at least 1 character long
});

export type StudentSchema = z.infer<typeof studentSchema>; // Type inference for student schema

// Schema for validating exam data
export const examSchema = z.object({
    id: z.coerce.number().optional(), // Optional exam ID
    title: z.string().min(1, { message: "Title is required!" }), // Title must be at least 1 character long
    startTime: z.coerce.date({ message: "Start time is required!" }), // Valid date for start time
    endTime: z.coerce.date({ message: "End time is required!" }), // Valid date for end time
    lessonId: z.coerce.number({ message: "Lesson ID is required!" }), // Lesson ID is required
});

export type ExamSchema = z.infer<typeof examSchema>; // Type inference for exam schema