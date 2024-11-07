import AsyncStorage from "@react-native-async-storage/async-storage";

const migratePosts = async () => {
  try {
    // Get existing posts
    const posts = [
      {
        bulletPoints: [
          "3x sets bench press",
          "4x sets incline bench press",
          "3x sets cable flys",
          "3x sets dips",
        ],
        id: "945eb9f9-aa91-4abb-aa7f-9b2756b5e2af",
        image:
          "https://i.pinimg.com/474x/b5/cd/56/b5cd56a1698c7e03efec4963770cffbb.jpg",
        timestamp: "2024-11-04T16:30:00.000Z",
        title: "chest day was a success",
      },
      {
        bulletPoints: [
          "Finished tinykeywords API endpoints",
          "Spent the rest of the time building kazien",
          "Had lot a good time",
        ],
        id: "76cf169a-dfac-4149-9ec9-957da92f5d29",
        image:
          "https://i.pinimg.com/1200x/d7/0e/44/d70e44acd2d7b71ee59b36533608b169.jpg",
        timestamp: "2024-11-04T20:45:00.000Z",
        title: "tom n tom grind sesh",
      },
      {
        id: "7b14aac6-3e57-483b-abaa-bc166e700901",
        image:
          "https://i.pinimg.com/474x/18/10/b1/1810b19e620bee72c384356e9e98732e.jpg",
        timestamp: "2024-11-04T22:20:00.000Z",
        title: "cutest dog in the world 🐶",
      },
      {
        bulletPoints: [
          "Added custome swipiing anmiations to kazien",
          "Decideding what to do next",
          "Thinking about how tomm if going to go",
        ],
        id: "b74ec45c-3a95-4e4b-b8f8-77a40b354c07",
        image:
          "https://i.pinimg.com/474x/5f/43/3a/5f433a54776c1ab47fa76e4b900e3d61.jpg",
        timestamp: "2024-11-04T05:15:00.000Z",
        title: "cant sleep :(",
      },
    ];

    // Create new data structures
    const tasks = {};
    const dateIndex = {};

    // Transform each post
    posts.forEach((post) => {
      // Transform post to task format
      const task = {
        id: post.id,
        title: post.title,
        bulletPoints: post.bulletPoints || [],
        image: post.image,
        timestamp: new Date(post.timestamp).getTime(),
      };

      // Add to tasks object
      tasks[task.id] = task;

      // Add to date index
      const dateStr = new Date(post.timestamp).toISOString().split("T")[0];
      if (!dateIndex[dateStr]) {
        dateIndex[dateStr] = [];
      }
      dateIndex[dateStr].push(task.id);
    });

    // Save new data structures
    await Promise.all([
      AsyncStorage.setItem("@tasks", JSON.stringify(tasks)),
      AsyncStorage.setItem("@dateIndex", JSON.stringify(dateIndex)),
    ]);

    console.log("Migration complete!");
    console.log("Tasks:", tasks);
    console.log("DateIndex:", dateIndex);
  } catch (error) {
    console.error("Migration failed:", error);
  }
};

export default migratePosts;
