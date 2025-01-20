import { Day, PrismaClient, UserGender } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    // Seed ADMIN data
    await prisma.admin.create({
        data: {
            id: "admin1",
            username: "admin1",
        },
    });
    await prisma.admin.create({
        data: {
            id: "admin2",
            username: "admin2",
        },
    });

    // Seed GRADE data
    for (let i = 1; i <= 12; i++) {
        await prisma.grade.create({
            data: {
                level: i,
            },
        });
    }

    // Seed CLASS data
    for (let i = 1; i <= 12; i++) {
        await prisma.class.create({
            data: {
                name: `${i}A`, 
                gradeId: i, 
                capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15, // Random capacity between 15 and 20
            },
        });
    }

    // Seed SUBJECT data
    const subjectData = [
        { name: "Mathematics" },
        { name: "Science" },
        { name: "English" },
        { name: "History" },
        { name: "Geography" },
        { name: "Physics" },
        { name: "Chemistry" },
        { name: "Biology" },
        { name: "French" },
        { name: "Art" },
        { name: "Music" },
    ];

    for (const subject of subjectData) {
        await prisma.subject.create({ data: subject });
    }

    // Seed TEACHER data
    for (let i = 1; i <= 15; i++) {
        await prisma.teacher.create({
            data: {
                id: `teacher${i}`, // Unique ID for the teacher
                username: `teacher${i}`,
                name: `TName${i}`,
                Surname: `TSurname${i}`,
                email: `teacher${i}@example.com`,
                phone: `123-456-789${i}`,
                address: `Address${i}`,
                bloodType: "A+",
                gender: i % 2 === 0 ? UserGender.MALE : UserGender.FEMALE,
                subjects: { connect: [{ id: (i % 10) + 1 }] }, // Connect teacher to a subject
                classes: { connect: [{ id: (i % 6) + 1 }] }, // Connect teacher to a class
                // birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)), // Set birthday 30 years ago
            },
        });
    }

    // Seed LESSON data
    for (let i = 1; i <= 30; i++) {
        await prisma.lesson.create({
            data: {
                name: `Lesson${i}`, 
                day: Day[
                    Object.keys(Day)[
                        Math.floor(Math.random() * Object.keys(Day).length)
                    ] as keyof typeof Day
                ], // Random day of the week
                startTime: new Date(new Date().setHours(new Date().getHours() + 1)), // Start time 1 hour from now
                endTime: new Date(new Date().setHours(new Date().getHours() + 3)), // End time 3 hours from now
                subjectId: (i % 10) + 1, // Connect to a subject
                classId: (i % 6) + 1, // Connect to a class
                teacherId: `teacher${(i % 15) + 1}`, // Connect to a teacher
            },
        });
    }

    // Seed PARENT data
    for (let i = 1; i <= 25; i++) {
        await prisma.parent.create({
            data: {
                id: `parentId${i}`,
                username: `parentId${i}`,
                name: `PName ${i}`,
                Surname: `PSurname ${i}`,
                email: `parent${i}@example.com`,
                phone: `123-456-789${i}`,
                address: `Address${i}`,
            },
        });
    }

    // Seed STUDENT data
    for (let i = 1; i <= 50; i++) {
        await prisma.student.create({
            data: {
                id: `student${i}`, 
                username: `student${i}`, 
                name: `SName${i}`,
                Surname: `SSurname ${i}`,
                email: `student${i}@example.com`,
                phone: `987-654-321${i}`,
                address: `Address${i}`,
                bloodType: "O-",
                gender: i % 2 === 0 ? UserGender.Male : UserGender.Female,
                parentId: `parentId${Math.ceil(i / 2) % 25 || 25}`, // Connect to a parent
                gradeId: (i % 6) + 1, // Connect to a grade
                classId: (i % 6) + 1, // Connect to a class
               // birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)), // Set birthday 10 years ago
            },
        });
    }

    // Seed EXAM data
    for (let i = 1; i <= 10; i++) {
        await prisma.exam.create({
            data: {
                title: `Exam ${i}`, 
                startTime: new Date(new Date().setHours(new Date().getHours() + 1)), // Start time 1 hour from now
                endTime: new Date(new Date().setHours(new Date().getHours() + 2)), // End time 2 hours from now
                // lessonId: (i % 30) + 1, // Connect to a lesson
            },
        });
    }

    // Seed ASSIGNMENT data
    for (let i = 1; i <= 10; i++) {
        await prisma.assignment.create({
            data: {
                title: `Assignment ${i}`, 
                startTime: new Date(new Date().setHours(new Date().getHours() + 1)), // Start time 1 hour from now
                dueDate: new Date(new Date().setDate(new Date().getDate() + 1)), // Due date 1 day from now
                lessonId: (i % 30) + 1, // Connect to a lesson
            },
        });
    }

    // Seed RESULT data
    for (let i = 1; i <= 10; i++) {
        await prisma.result.create({
            data: {
                score: 90, // Fixed score
                studentId: `student${i}`, // Connect to a student
                ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }), // Connect to an exam or assignment
            },
        });
    }

    // Seed ATTENDANCE data
    for (let i = 1; i <= 10; i++) {
        await prisma.attendance.create({
            data: {
                date: new Date(), // Current date
                present: true, // Mark as present
                studentId: `student${i}`, // Connect to a student
                lessonId: (i % 30) + 1, // Connect to a lesson
            },
        });
    }

    // Seed EVENT data
    for (let i = 1; i <= 5; i++) {
        await prisma.event.create({
            data: {
                title: `Event ${i}`, 
                description: `Description for Event ${i}`, 
                startTime: new Date(new Date().setHours(new Date().getHours() + 1)), // Start time 1 hour from now
                endTime: new Date(new Date().setHours(new Date().getHours() + 2)), // End time 2 hours from now
                classId: (i % 5) + 1, // Connect to a class
            },
        });
    }

    // Seed ANNOUNCEMENT data
    for (let i = 1; i <= 5; i++) {
        await prisma.announcement.create({
            data: {
                title: `Announcement ${i}`, 
                description: `Description for Announcement ${i}`, 
                date: new Date(), // Current date
                classId: (i % 5) + 1, // Connect to a class
            },
        });
    }

    console.log("Seeding completed successfully.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });