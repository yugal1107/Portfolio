import { db } from "./client.js";

type SeedProject = {
  title: string;
  slug: string;
  description: string;
  liveUrl: string;
  githubUrl: string;
  imageUrl: string;
  imagePublicId?: string | null;
  techStack: string[];
  featured: number;
  orderIndex: number;
};

type SeedSkillGroup = {
  name: string;
  orderIndex: number;
  skills: Array<{ name: string; iconKey: string; orderIndex: number }>;
};

type SeedStory = {
  title: string;
  slug: string;
  dateText: string;
  location: string;
  status: string;
  cardImageUrl: string;
  cardImagePublicId?: string | null;
  images: string[];
  imagePublicIds?: string[];
  description: string[];
  project: Record<string, unknown> | null;
  outcomes: string[];
  team: Record<string, unknown> | null;
  orderIndex: number;
};

const seedSiteSettings = () => {
  db.prepare(
    `
      INSERT INTO site_settings (
        id,
        full_name,
        title,
        bio,
        location,
        email,
        github_url,
        linkedin_url,
        twitter_url,
        instagram_url,
        resume_url,
        profile_image_url,
        profile_image_public_id,
        updated_at
      )
      VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET
        full_name = excluded.full_name,
        title = excluded.title,
        bio = excluded.bio,
        location = excluded.location,
        email = excluded.email,
        github_url = excluded.github_url,
        linkedin_url = excluded.linkedin_url,
        twitter_url = excluded.twitter_url,
        instagram_url = excluded.instagram_url,
        resume_url = excluded.resume_url,
        profile_image_url = excluded.profile_image_url,
        profile_image_public_id = excluded.profile_image_public_id,
        updated_at = CURRENT_TIMESTAMP
    `,
  ).run(
    "Yugal Burde",
    "Full Stack Developer",
    "I am a passionate developer with experience in creating dynamic and responsive web applications. Currently pursuing B.Tech at MITS Gwalior with an 8.5 CGPA. Skilled in MERN stack, API development, and programming languages including JavaScript, Python, and C++.",
    "Gwalior, India",
    "",
    "https://github.com/yugal1107",
    "https://www.linkedin.com/in/yugal-burde-58012a256/",
    "https://twitter.com/YugalBurde",
    "https://www.instagram.com/yugal__1107",
    "https://drive.google.com/file/d/1Upi9GbANVs9rlurVwAAmyi6Oi37b-O3o/view?usp=sharing",
    "/profile.png",
    null,
  );
};

const defaultProjects: SeedProject[] = [
  {
    title: "Dynamic Movies Website",
    slug: "dynamic-movies-website",
    description:
      "Developed a dynamic movies website with Node.js, Express.js, EJS, and an external API, allowing users to explore movie details, view films by cast members, and browse by genre.",
    liveUrl: "https://movies.yugal.tech",
    githubUrl: "https://github.com/yugal1107/YMoviez---Movies-Website",
    imageUrl: "/movies-website-image.png",
    imagePublicId: null,
    techStack: ["Node.js", "Express", "EJS", "API"],
    featured: 1,
    orderIndex: 1,
  },
  {
    title: "AI Quiz Generator",
    slug: "ai-quiz-generator",
    description:
      "An AI-powered quiz generator that creates random MCQs on any topic. Users can select the difficulty level and receive their score instantly after completing the quiz.",
    liveUrl: "https://quizzzify.vercel.app",
    githubUrl: "https://github.com/yugal1107/Testyourself--AI-quiz-app",
    imageUrl: "/ai-quiz.png",
    imagePublicId: null,
    techStack: ["React", "Node.js", "AI"],
    featured: 1,
    orderIndex: 2,
  },
  {
    title: "Shiksha Mitra",
    slug: "shiksha-mitra",
    description:
      "ShikshaMitra is a next-gen educational ecosystem built to bridge the gap between students, teachers, and institutions through technology.",
    liveUrl: "https://shikshamitra-virid.vercel.app/",
    githubUrl: "https://github.com/yugal1107/Shiksha-Mitra",
    imageUrl: "/shiskhamitra_img.png",
    imagePublicId: null,
    techStack: ["React", "Node.js", "MongoDB"],
    featured: 1,
    orderIndex: 3,
  },
  {
    title: "Data Analysis Using Python",
    slug: "data-analysis-using-python",
    description:
      "Analyzed data using Python libraries such as Pandas and Matplotlib to gain insights into the data of marks of students and visualize the results.",
    liveUrl:
      "https://github.com/yugal1107/Python-Project-Data-Visualization-of-midsem-marks",
    githubUrl:
      "https://github.com/yugal1107/Python-Project-Data-Visualization-of-midsem-marks",
    imageUrl: "/project2-front.png",
    imagePublicId: null,
    techStack: ["Python", "Pandas", "Matplotlib"],
    featured: 0,
    orderIndex: 4,
  },
  {
    title: "AI Chatbot",
    slug: "ai-chatbot",
    description:
      "An AI-powered PDF chatbot that allows users to upload a PDF and ask questions about its content, providing instant answers based on the document.",
    liveUrl: "https://ai-chatbot-black-one.vercel.app/",
    githubUrl: "https://github.com/yugal1107/AI-Chatbot",
    imageUrl: "/pdf-chatbot.png",
    imagePublicId: null,
    techStack: ["React", "Node.js", "AI", "PDF"],
    featured: 0,
    orderIndex: 5,
  },
];

const seedProjects = () => {
  const upsertProject = db.prepare(
    `
      INSERT INTO projects (
        title,
        slug,
        description,
        live_url,
        github_url,
        image_url,
        image_public_id,
        tech_stack_json,
        featured,
        order_index,
        is_published,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        description = excluded.description,
        live_url = excluded.live_url,
        github_url = excluded.github_url,
        image_url = excluded.image_url,
        image_public_id = excluded.image_public_id,
        tech_stack_json = excluded.tech_stack_json,
        featured = excluded.featured,
        order_index = excluded.order_index,
        is_published = excluded.is_published,
        updated_at = CURRENT_TIMESTAMP
    `,
  );

  const transaction = db.transaction(() => {
    for (const project of defaultProjects) {
      upsertProject.run(
        project.title,
        project.slug,
        project.description,
        project.liveUrl,
        project.githubUrl,
        project.imageUrl,
        project.imagePublicId ?? null,
        JSON.stringify(project.techStack),
        project.featured,
        project.orderIndex,
      );
    }
  });

  transaction();
};

const defaultSkillGroups: SeedSkillGroup[] = [
  {
    name: "Backend",
    orderIndex: 1,
    skills: [
      { name: "Django", iconKey: "DiDjango", orderIndex: 1 },
      { name: "Express.js", iconKey: "SiExpress", orderIndex: 2 },
      { name: "Node.js", iconKey: "DiNodejs", orderIndex: 3 },
      { name: "Docker", iconKey: "SiDocker", orderIndex: 4 },
    ],
  },
  {
    name: "Frontend",
    orderIndex: 2,
    skills: [
      { name: "React", iconKey: "DiReact", orderIndex: 1 },
      { name: "Tailwind CSS", iconKey: "SiTailwindcss", orderIndex: 2 },
    ],
  },
  {
    name: "Version Control",
    orderIndex: 3,
    skills: [
      { name: "Git", iconKey: "SiGit", orderIndex: 1 },
      { name: "GitHub", iconKey: "SiGithub", orderIndex: 2 },
    ],
  },
  {
    name: "DSA/CP",
    orderIndex: 4,
    skills: [
      { name: "Python", iconKey: "DiPython", orderIndex: 1 },
      { name: "C++", iconKey: "SiCplusplus", orderIndex: 2 },
      { name: "LeetCode", iconKey: "SiLeetcode", orderIndex: 3 },
      { name: "CodeChef", iconKey: "SiCodechef", orderIndex: 4 },
      { name: "Codeforces", iconKey: "SiCodeforces", orderIndex: 5 },
    ],
  },
  {
    name: "Programming Languages",
    orderIndex: 5,
    skills: [
      { name: "Python", iconKey: "DiPython", orderIndex: 1 },
      { name: "JavaScript", iconKey: "DiJavascript1", orderIndex: 2 },
      { name: "C++", iconKey: "SiCplusplus", orderIndex: 3 },
    ],
  },
  {
    name: "Tools/Platforms",
    orderIndex: 6,
    skills: [
      { name: "Linux", iconKey: "DiLinux", orderIndex: 1 },
      { name: "Docker", iconKey: "SiDocker", orderIndex: 2 },
      { name: "Postman", iconKey: "SiPostman", orderIndex: 3 },
    ],
  },
];

const seedSkills = () => {
  const findGroup = db.prepare(
    "SELECT id FROM skill_groups WHERE name = ? LIMIT 1",
  );
  const insertGroup = db.prepare(
    `
      INSERT INTO skill_groups (name, order_index, is_published, updated_at)
      VALUES (?, ?, 1, CURRENT_TIMESTAMP)
    `,
  );
  const updateGroup = db.prepare(
    `
      UPDATE skill_groups
      SET order_index = ?, is_published = 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
  );

  const findSkill = db.prepare(
    "SELECT id FROM skills WHERE skill_group_id = ? AND name = ? LIMIT 1",
  );
  const insertSkill = db.prepare(
    `
      INSERT INTO skills (skill_group_id, name, icon_key, order_index, is_published, updated_at)
      VALUES (?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
    `,
  );
  const updateSkill = db.prepare(
    `
      UPDATE skills
      SET icon_key = ?, order_index = ?, is_published = 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `,
  );

  const transaction = db.transaction(() => {
    for (const group of defaultSkillGroups) {
      const existingGroup = findGroup.get(group.name) as { id: number } | undefined;

      let groupId: number;
      if (existingGroup) {
        groupId = existingGroup.id;
        updateGroup.run(group.orderIndex, groupId);
      } else {
        const result = insertGroup.run(group.name, group.orderIndex);
        groupId = Number(result.lastInsertRowid);
      }

      for (const skill of group.skills) {
        const existingSkill = findSkill.get(groupId, skill.name) as
          | { id: number }
          | undefined;

        if (existingSkill) {
          updateSkill.run(skill.iconKey, skill.orderIndex, existingSkill.id);
        } else {
          insertSkill.run(groupId, skill.name, skill.iconKey, skill.orderIndex);
        }
      }
    }
  });

  transaction();
};

const defaultStories: SeedStory[] = [
  {
    title: "HackHound 3.0",
    slug: "hackhound-3-0",
    dateText: "27th Feb - 28th Feb, 2025",
    location: "SRM Modinagar Campus, Delhi NCR, UP",
    status: "recent",
    cardImageUrl: "/hackhound-presentation.jpeg",
    cardImagePublicId: null,
    images: [
      "/hackhound-team.jpeg",
      "/hackhound-presentation.jpeg",
      "/hackhound-certificate.jpeg",
      "/hackhound-group-photo.jpeg",
    ],
    imagePublicIds: [],
    description: [
      "I participated in HackHound 3.0, a 2-day hackathon at SRM Modinagar Campus, organized by the university's tech community. It was an incredible experience collaborating with talented peers and engaging with the vibrant tech ecosystem.",
      "Our team developed a project called MahaKumbh, a comprehensive web application designed to enhance the experience of devotees attending the Maha Kumbh Mela. The platform provides real-time stampede updates, crowd management, and essential information for pilgrims.",
      "We built the application using React for the frontend, Node.js with Express for the backend, MongoDB for the database, and integrated APIs for real-time data and user authentication, YOLO for object detection, and Streamlit for visualization.",
    ],
    project: {
      name: "MahaKumbh",
      techStack: [
        "Next.js",
        "Node.js",
        "Express",
        "MongoDB",
        "REST APIs",
        "JWT Authentication",
        "Web Sockets",
        "Yolov5 for Object Detection",
        "OAuth for Authentication",
        "Streamlit for Object Detection Visualization",
      ],
      description:
        "A web application to assist devotees at Maha Kumbh Mela with real-time updates, crowd management, and essential services.",
    },
    outcomes: [
      "Secured a spot in the Top 10 shortlisted teams out of a fierce pool of innovators",
      "Won the MongoDB and Streamlit track Winner title",
      "Took home a 37-sensor kit and an Arduino R4 board as prizes",
    ],
    team: {
      name: "Tech Titans",
      members: [
        {
          name: "Yugal Burde (Me)",
          role: "Full Stack Developer",
          LinkedIn: "https://www.linkedin.com/in/yugal-burde-58012a256/",
        },
        {
          name: "Tanmay Sawankar",
          role: "Team Lead",
          LinkedIn: "https://www.linkedin.com/in/tanmay-sawankar-57a945223/",
        },
        {
          name: "Akshat Jain",
          role: "Backend Developer",
          LinkedIn: "https://www.linkedin.com/in/its-akshat-jain/",
        },
        {
          name: "Om Bhayde",
          role: "Frontend Developer",
          LinkedIn: "https://www.linkedin.com/in/om-bhayde-66a643253/",
        },
        {
          name: "Pratham Sharma",
          role: "Machine Learning Engineer",
          LinkedIn: "https://www.linkedin.com/in/pratham-sharma-9a5307251/",
        },
      ],
    },
    orderIndex: 1,
  },
  {
    title: "HackN'dore",
    slug: "hackndore",
    dateText: "26th July - 28th July",
    location: "Indore, MP",
    status: "recent",
    cardImageUrl: "/hackindore.jpg",
    cardImagePublicId: null,
    images: ["/certificate-hackndore.jpg"],
    imagePublicIds: [],
    description: [
      "I had the opportunity to attend a 3-day hackathon in Indore named HackN'dore, organized by IMC Indore at Acropolis College. It was an exhilarating experience where I was part of a team of five students, including Pratham Sharma, Yuvraj Yadav, Tejaswa Jhode, Yogesh Jat, and myself.",
      "During the event, we had the chance to meet the Mayor of Indore, which was a remarkable experience. The interaction provided us with valuable insights and encouragement to pursue our goals.",
      "Apart from the competition, the hackathon was a great platform for networking with like-minded individuals and industry professionals.",
    ],
    project: {
      name: "Water Supply Management System",
      techStack: ["React", "Node.js", "IoT", "Machine Learning"],
      description: "Developed a system to monitor water supply in real-time",
      github: "https://github.com/YogeshJat8965/WaterManagement",
    },
    outcomes: [
      "Implemented end-to-end IoT solution",
      "Enhanced team collaboration skills",
    ],
    team: {
      name: "Code Crusaders",
      members: [
        {
          name: "Yugal Burde (Me)",
          role: "Full Stack Developer",
          LinkedIn: "https://www.linkedin.com/in/yugal-burde-58012a256/",
        },
        {
          name: "Pratham Sharma",
          role: "Machine Learning Engineer",
          LinkedIn: "https://www.linkedin.com/in/pratham-sharma-9a5307251/",
        },
        {
          name: "Yuvraj Yadav",
          role: "Backend Developer",
          LinkedIn: "https://www.linkedin.com/in/yuvraj7000/",
        },
        {
          name: "Tejaswa Jhode",
          role: "IoT Developer",
          LinkedIn: "https://www.linkedin.com/in/tejaswa-jhode-669362163/",
        },
        {
          name: "Yogesh Jat",
          role: "Frontend Developer",
          LinkedIn: "https://www.linkedin.com/in/yogesh-jat-94590728b/",
        },
      ],
    },
    orderIndex: 2,
  },
  {
    title: "DevsHouse",
    slug: "devshouse",
    dateText: "15th August - 17th August",
    location: "VIT Chennai, TN",
    status: "recent",
    cardImageUrl: "/devshouse.jpg",
    cardImagePublicId: null,
    images: [
      "/devshouse-cover.jpg",
      "/yugal-chennai.jpg",
      "/deepanshu.jpg",
      "/akshat.jpg",
      "/idcard-chennai.jpg",
    ],
    imagePublicIds: [],
    description: [
      "I had attended a 3-day hackathon named DevsHouse at VIT Chennai, organized by GDSC of that college. It was my first hackathon and I had a great experience interacting with new people from the south and the tech community there.",
      "We built a project called OTAx, an Order Tracking Accompany application with three user roles: driver, buyer, and service manager.",
      "The stack included Node.js for backend, React with Tailwind CSS for frontend, and MongoDB as database.",
    ],
    project: {
      name: "OTAx",
      techStack: [
        "Node.js",
        "React",
        "TailwindCSS",
        "MongoDB",
        "JWT Authentication",
      ],
      description:
        "An application for real-time order tracking with different user roles",
    },
    outcomes: [
      "Developed a full-stack application",
      "Integrated real-time location tracking",
      "Enhanced team collaboration and technical skills",
    ],
    team: {
      name: "Tech Titans",
      members: [
        {
          name: "Yugal Burde (Me)",
          role: "React Leaflet Maps Integration",
          LinkedIn: "https://www.linkedin.com/in/yugal-burde-58012a256/",
        },
        {
          name: "Tanmay Sawankar",
          role: "Team Lead",
          LinkedIn: "https://www.linkedin.com/in/tanmay-sawankar-57a945223/",
        },
        {
          name: "Akshat Jain",
          role: "Backend Developer",
          LinkedIn: "https://www.linkedin.com/in/its-akshat-jain/",
        },
        {
          name: "Deepanshu Pathak",
          role: "Frontend Developer",
          LinkedIn: "https://www.linkedin.com/in/deepanshu-pathak-262428265/",
        },
      ],
    },
    orderIndex: 3,
  },
  {
    title: "Codathon 2.0",
    slug: "codathon-2-0",
    dateText: "10th September - 12th September",
    location: "Gwalior, MP",
    status: "1 year ago",
    cardImageUrl: "/codathon.jpg",
    cardImagePublicId: null,
    images: [],
    imagePublicIds: [],
    description: [
      "Codathon 2.0 was a 3-day competitive contest in college, organized by IETE in collaboration with Coding Ninjas. The event featured three rounds of intense competition.",
      "Our team, consisting of Pratham Sharma and myself, reached the final round and were among the top 10 teams in the college.",
      "The event provided a great platform to test our skills, learn new concepts, and interact with fellow coders.",
    ],
    project: {
      name: "Code Competition Platform",
      techStack: ["React", "Express", "MongoDB", "Socket.io"],
      description: "Created a real-time code compilation and competition platform",
    },
    outcomes: [
      "Solved complex DSA problems",
      "Enhanced problem-solving skills",
      "Improved programming logic and efficiency",
    ],
    team: {
      name: "Dynamic Duo",
      members: [
        {
          name: "Yugal Burde (Me)",
          role: "DSA and Programmer in C++",
          LinkedIn: "https://www.linkedin.com/in/yugal-burde-58012a256/",
        },
        {
          name: "Pratham Sharma",
          role: "Python Specialist and Programmer",
          LinkedIn: "https://www.linkedin.com/in/pratham-sharma-9a5307251/",
        },
      ],
    },
    orderIndex: 4,
  },
];

const seedStories = () => {
  const upsertStory = db.prepare(
    `
      INSERT INTO stories (
        title,
        slug,
        date_text,
        location,
        status,
        card_image_url,
        card_image_public_id,
        images_json,
        images_public_ids_json,
        description_json,
        project_json,
        outcomes_json,
        team_json,
        order_index,
        is_published,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        date_text = excluded.date_text,
        location = excluded.location,
        status = excluded.status,
        card_image_url = excluded.card_image_url,
        card_image_public_id = excluded.card_image_public_id,
        images_json = excluded.images_json,
        images_public_ids_json = excluded.images_public_ids_json,
        description_json = excluded.description_json,
        project_json = excluded.project_json,
        outcomes_json = excluded.outcomes_json,
        team_json = excluded.team_json,
        order_index = excluded.order_index,
        is_published = excluded.is_published,
        updated_at = CURRENT_TIMESTAMP
    `,
  );

  const transaction = db.transaction(() => {
    for (const story of defaultStories) {
      upsertStory.run(
        story.title,
        story.slug,
        story.dateText,
        story.location,
        story.status,
        story.cardImageUrl,
        story.cardImagePublicId ?? null,
        JSON.stringify(story.images),
        JSON.stringify(story.imagePublicIds ?? []),
        JSON.stringify(story.description),
        story.project ? JSON.stringify(story.project) : null,
        JSON.stringify(story.outcomes),
        story.team ? JSON.stringify(story.team) : null,
        story.orderIndex,
      );
    }
  });

  transaction();
};

const runSeed = () => {
  seedSiteSettings();
  seedProjects();
  seedSkills();
  seedStories();

  console.log("Seed complete");
};

runSeed();
