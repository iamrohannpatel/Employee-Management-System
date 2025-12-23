// ... admin data
export const adminData = [
    {
        "id": 1,
        "email": "admin@example.com",
        "password": "123"
    }
];

export const hrData = [
    {
        "id": 1,
        "email": "hr@example.com",
        "password": "123"
    }
];


export const employeesData = [
    {
        "id": 1,
        "firstName": "Arjun",
        "lastName": "Mehta",
        "email": "employee1@example.com",
        "password": "123",
        "department": "Engineering",
        "role": "Developer",
        "salary": "80000",
        "rfid": "RFID001",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Design UI",
                "taskDescription": "Design the user interface for the dashboard.",
                "taskDate": "2024-02-20",
                "category": "Design"
            },
            {
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Dev Meeting",
                "taskDescription": "Attend the weekly development team meeting.",
                "taskDate": "2024-02-21",
                "category": "Meeting"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Fix Bugs",
                "taskDescription": "Resolve bugs reported in the issue tracker.",
                "taskDate": "2024-02-22",
                "category": "Development"
            }
        ]
    },
    {
        "id": 2,
        "firstName": "Sneha",
        "lastName": "Patel",
        "email": "employee2@example.com",
        "password": "123",
        "department": "Engineering",
        "role": "Database Admin",
        "salary": "90000",
        "rfid": "RFID002",
        "taskCounts": {
            "active": 1,
            "newTask": 0,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Database Optimization",
                "taskDescription": "Optimize queries for better performance.",
                "taskDate": "2024-02-23",
                "category": "Database"
            },
            {
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Client Call",
                "taskDescription": "Discuss requirements with the client.",
                "taskDate": "2024-02-24",
                "category": "Communication"
            }
        ]
    },
    {
        "id": 3,
        "firstName": "Ravi",
        "lastName": "Sharma",
        "email": "employee3@example.com",
        "password": "123",
        "department": "Marketing",
        "role": "Marketing Executive",
        "salary": "60000",
        "rfid": "RFID003",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 0,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Prepare Presentation",
                "taskDescription": "Prepare slides for the upcoming product launch.",
                "taskDate": "2024-02-25",
                "category": "Marketing"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Code Review",
                "taskDescription": "Review code submitted by junior developers.",
                "taskDate": "2024-02-26",
                "category": "Development"
            }
        ]
    },
    {
        "id": 4,
        "firstName": "Priya",
        "lastName": "Singh",
        "email": "employee4@example.com",
        "password": "123",
        "department": "Documentation",
        "role": "Technical Writer",
        "salary": "55000",
        "rfid": "RFID004",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 0,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Write Documentation",
                "taskDescription": "Update the API documentation.",
                "taskDate": "2024-02-27",
                "category": "Documentation"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Set up CI/CD",
                "taskDescription": "Configure the CI/CD pipeline.",
                "taskDate": "2024-02-28",
                "category": "DevOps"
            }
        ]
    },
    {
        "id": 5,
        "firstName": "Karan",
        "lastName": "Verma",
        "email": "employee5@example.com",
        "password": "123",
        "department": "QA",
        "role": "QA Engineer",
        "salary": "60000",
        "rfid": "RFID005",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 0,
            "failed": 0
        },
        "tasks": [
            {
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Testing",
                "taskDescription": "Perform unit testing for the new module.",
                "taskDate": "2024-02-29",
                "category": "Testing"
            },
            {
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Team Lunch",
                "taskDescription": "Join the team for a lunch outing.",
                "taskDate": "2024-03-01",
                "category": "Social"
            }
        ]
    }
];
