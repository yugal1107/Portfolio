import React, { useEffect, useMemo, useState } from "react";

import {
  adminLogin,
  adminLogout,
  createAdminProject,
  createAdminSkill,
  createAdminSkillGroup,
  createAdminStory,
  deleteAdminContactMessage,
  deleteAdminProject,
  deleteAdminSkill,
  deleteAdminSkillGroup,
  deleteAdminStory,
  getAdminMe,
  getAdminContactMessages,
  getAdminProjects,
  getAdminSettings,
  getAdminStoryById,
  getAdminSkillGroups,
  getAdminStories,
  uploadAdminFile,
  updateAdminContactMessageStatus,
  updateAdminProject,
  updateAdminSettings,
  updateAdminSkill,
  updateAdminSkillGroup,
  updateAdminStory,
} from "../services/adminApi";

const initialProjectForm = {
  title: "",
  slug: "",
  description: "",
  liveUrl: "",
  githubUrl: "",
  imageUrl: "",
  imagePublicId: "",
  techStackText: "",
  featured: false,
  orderIndex: 0,
  isPublished: true,
};

const initialStoryForm = {
  title: "",
  slug: "",
  dateText: "",
  location: "",
  status: "recent",
  cardImageUrl: "",
  cardImagePublicId: "",
  imagesText: "",
  imagePublicIdsText: "",
  contentMarkdown: "",
  projectJsonText: "",
  outcomesText: "",
  teamJsonText: "",
  orderIndex: 0,
  isPublished: true,
};

const baseInputClass =
  "w-full rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100";

const parseLines = (value) =>
  value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const parseJsonField = (value, label) => {
  if (!value.trim()) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`Invalid ${label} JSON`);
  }
};

export default function AdminPage() {
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loginForm, setLoginForm] = useState({
    username: import.meta.env.VITE_ADMIN_USERNAME || "",
    password: "",
  });

  const [settings, setSettings] = useState(null);
  const [settingsDraft, setSettingsDraft] = useState({});

  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState(initialProjectForm);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const [skillGroups, setSkillGroups] = useState([]);
  const [skillGroupForm, setSkillGroupForm] = useState({
    name: "",
    orderIndex: 0,
    isPublished: true,
  });
  const [editingSkillGroupId, setEditingSkillGroupId] = useState(null);

  const [skillForm, setSkillForm] = useState({
    skillGroupId: "",
    name: "",
    iconKey: "",
    orderIndex: 0,
    isPublished: true,
  });
  const [editingSkillId, setEditingSkillId] = useState(null);

  const [stories, setStories] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [storyForm, setStoryForm] = useState(initialStoryForm);
  const [editingStoryId, setEditingStoryId] = useState(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const projectFormCanSubmit =
    Boolean(projectForm.title.trim()) &&
    Boolean(projectForm.slug.trim()) &&
    Boolean(projectForm.description.trim());

  const storyFormCanSubmit =
    Boolean(storyForm.title.trim()) && Boolean(storyForm.slug.trim());

  const flattenedSkills = useMemo(() => {
    const rows = [];
    for (const group of skillGroups) {
      for (const skill of group.skills || []) {
        rows.push({ ...skill, groupName: group.name, skillGroupId: group.id });
      }
    }
    return rows;
  }, [skillGroups]);

  const loadContactMessages = async () => {
    const contactMessagesData = await getAdminContactMessages();
    setContactMessages(contactMessagesData);
  };

  const loadAllContent = async () => {
    const [settingsData, projectsData, groupsData, storiesData, contactMessagesData] =
      await Promise.all([
        getAdminSettings(),
        getAdminProjects(),
        getAdminSkillGroups(),
        getAdminStories(),
      getAdminContactMessages(),
    ]);

    setSettings(settingsData);
    setSettingsDraft(settingsData);
    setProjects(projectsData);
    setSkillGroups(groupsData);
    setStories(storiesData);
    setContactMessages(contactMessagesData);
  };

  const handleUpdateContactStatus = async (id, status) => {
    try {
      setLoading(true);
      await updateAdminContactMessageStatus(id, status);
      await loadContactMessages();
      setStatusMessage(`Message marked as ${status}.`);
    } catch (error) {
      setStatusMessage(error.message || "Failed to update message status");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContactMessage = async (id) => {
    try {
      setLoading(true);
      await deleteAdminContactMessage(id);
      await loadContactMessages();
      setStatusMessage("Contact message deleted.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to delete contact message");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await getAdminMe();
        setIsAuthed(true);
        await loadAllContent();
      } catch {
        setIsAuthed(false);
      } finally {
        setSessionChecked(true);
      }
    };

    checkSession();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setAuthError("");
    setStatusMessage("");

    try {
      setLoading(true);
      await adminLogin(loginForm.username, loginForm.password);
      setIsAuthed(true);
      setLoginForm({ username: "", password: "" });
      await loadAllContent();
      setStatusMessage("Logged in successfully.");
    } catch (error) {
      setAuthError(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await adminLogout();
      setIsAuthed(false);
      setSettings(null);
      setProjects([]);
      setSkillGroups([]);
      setStories([]);
      setContactMessages([]);
      setStatusMessage("Logged out.");
    } catch (error) {
      setStatusMessage(error.message || "Logout failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await updateAdminSettings(settingsDraft);
      await loadAllContent();
      setStatusMessage("Settings updated.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const toProjectPayload = (form) => ({
    title: form.title,
    slug: form.slug,
    description: form.description,
    liveUrl: form.liveUrl || null,
    githubUrl: form.githubUrl || null,
    imageUrl: form.imageUrl || null,
    imagePublicId: form.imagePublicId || null,
    techStack: parseLines(form.techStackText),
    featured: Boolean(form.featured),
    orderIndex: Number(form.orderIndex) || 0,
    isPublished: Boolean(form.isPublished),
  });

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const payload = toProjectPayload(projectForm);

      if (editingProjectId) {
        await updateAdminProject(editingProjectId, payload);
        setStatusMessage("Project updated.");
      } else {
        await createAdminProject(payload);
        setStatusMessage("Project created.");
      }

      setProjectForm(initialProjectForm);
      setEditingProjectId(null);
      setProjects(await getAdminProjects());
    } catch (error) {
      setStatusMessage(error.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  const startProjectEdit = (project) => {
    setEditingProjectId(project.id);
    setProjectForm({
      title: project.title,
      slug: project.slug,
      description: project.description,
      liveUrl: project.liveUrl || "",
      githubUrl: project.githubUrl || "",
      imageUrl: project.imageUrl || "",
      imagePublicId: project.imagePublicId || "",
      techStackText: (project.techStack || []).join("\n"),
      featured: project.featured,
      orderIndex: project.orderIndex,
      isPublished: project.isPublished,
    });
  };

  const handleDeleteProject = async (id) => {
    try {
      setLoading(true);
      await deleteAdminProject(id);
      setProjects(await getAdminProjects());
      if (editingProjectId === id) {
        setEditingProjectId(null);
        setProjectForm(initialProjectForm);
      }
      setStatusMessage("Project deleted.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file, options = {}) => {
    if (!file) {
      return null;
    }

    try {
      setUploading(true);
      const uploaded = await uploadAdminFile(file, options);
      setStatusMessage("File uploaded successfully.");
      return uploaded;
    } catch (error) {
      setStatusMessage(error.message || "File upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSkillGroupSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const payload = {
        name: skillGroupForm.name,
        orderIndex: Number(skillGroupForm.orderIndex) || 0,
        isPublished: Boolean(skillGroupForm.isPublished),
      };

      if (editingSkillGroupId) {
        await updateAdminSkillGroup(editingSkillGroupId, payload);
        setStatusMessage("Skill group updated.");
      } else {
        await createAdminSkillGroup(payload);
        setStatusMessage("Skill group created.");
      }

      setSkillGroupForm({ name: "", orderIndex: 0, isPublished: true });
      setEditingSkillGroupId(null);
      setSkillGroups(await getAdminSkillGroups());
    } catch (error) {
      setStatusMessage(error.message || "Failed to save skill group");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkillGroup = async (id) => {
    try {
      setLoading(true);
      await deleteAdminSkillGroup(id);
      setSkillGroups(await getAdminSkillGroups());
      setStatusMessage("Skill group deleted.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to delete skill group");
    } finally {
      setLoading(false);
    }
  };

  const handleSkillSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const payload = {
        skillGroupId: Number(skillForm.skillGroupId),
        name: skillForm.name,
        iconKey: skillForm.iconKey || null,
        orderIndex: Number(skillForm.orderIndex) || 0,
        isPublished: Boolean(skillForm.isPublished),
      };

      if (editingSkillId) {
        await updateAdminSkill(editingSkillId, payload);
        setStatusMessage("Skill updated.");
      } else {
        await createAdminSkill(payload);
        setStatusMessage("Skill created.");
      }

      setSkillForm({
        skillGroupId: "",
        name: "",
        iconKey: "",
        orderIndex: 0,
        isPublished: true,
      });
      setEditingSkillId(null);
      setSkillGroups(await getAdminSkillGroups());
    } catch (error) {
      setStatusMessage(error.message || "Failed to save skill");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      setLoading(true);
      await deleteAdminSkill(id);
      setSkillGroups(await getAdminSkillGroups());
      setStatusMessage("Skill deleted.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to delete skill");
    } finally {
      setLoading(false);
    }
  };

  const toStoryPayload = (form) => ({
    title: form.title,
    slug: form.slug,
    dateText: form.dateText || null,
    location: form.location || null,
    status: form.status || null,
    cardImageUrl: form.cardImageUrl || null,
    cardImagePublicId: form.cardImagePublicId || null,
    images: parseLines(form.imagesText),
    imagePublicIds: parseLines(form.imagePublicIdsText),
    contentMarkdown: form.contentMarkdown,
    project: parseJsonField(form.projectJsonText, "project") || null,
    outcomes: parseLines(form.outcomesText),
    team: parseJsonField(form.teamJsonText, "team") || null,
    orderIndex: Number(form.orderIndex) || 0,
    isPublished: Boolean(form.isPublished),
  });

  const handleStorySubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const payload = toStoryPayload(storyForm);

      if (editingStoryId) {
        await updateAdminStory(editingStoryId, payload);
        setStatusMessage("Story updated.");
      } else {
        await createAdminStory(payload);
        setStatusMessage("Story created.");
      }

      setStoryForm(initialStoryForm);
      setEditingStoryId(null);
      setStories(await getAdminStories());
    } catch (error) {
      setStatusMessage(error.message || "Failed to save story");
    } finally {
      setLoading(false);
    }
  };

  const startStoryEdit = async (story) => {
    try {
      setLoading(true);
      const details = await getAdminStoryById(story.id);

      setEditingStoryId(details.id);
      setStoryForm({
        title: details.title,
        slug: details.slug,
        dateText: details.dateText || "",
        location: details.location || "",
        status: details.status || "",
        cardImageUrl: details.cardImageUrl || "",
        cardImagePublicId: details.cardImagePublicId || "",
        imagesText: (details.images || []).join("\n"),
        imagePublicIdsText: (details.imagePublicIds || []).join("\n"),
        contentMarkdown: details.contentMarkdown || "",
        projectJsonText: details.project ? JSON.stringify(details.project, null, 2) : "",
        outcomesText: (details.outcomes || []).join("\n"),
        teamJsonText: details.team ? JSON.stringify(details.team, null, 2) : "",
        orderIndex: details.orderIndex || 0,
        isPublished: Boolean(details.isPublished),
      });
    } catch (error) {
      setStatusMessage(error.message || "Failed to load story details");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStory = async (id) => {
    try {
      setLoading(true);
      await deleteAdminStory(id);
      setStories(await getAdminStories());
      if (editingStoryId === id) {
        setEditingStoryId(null);
        setStoryForm(initialStoryForm);
      }
      setStatusMessage("Story deleted.");
    } catch (error) {
      setStatusMessage(error.message || "Failed to delete story");
    } finally {
      setLoading(false);
    }
  };

  if (!sessionChecked) {
    return <div className="p-8 text-gray-300">Checking admin session...</div>;
  }

  if (!isAuthed) {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-10">
        <div className="mx-auto max-w-md rounded-xl border border-gray-800 bg-gray-950 p-6">
          <h1 className="mb-4 text-2xl font-semibold">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-3">
            <input
              className={baseInputClass}
              placeholder="Username"
              value={loginForm.username}
              onChange={(event) =>
                setLoginForm((prev) => ({ ...prev, username: event.target.value }))
              }
            />
            <input
              className={baseInputClass}
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(event) =>
                setLoginForm((prev) => ({ ...prev, password: event.target.value }))
              }
            />
            {authError ? <p className="text-sm text-red-300">{authError}</p> : null}
            <button
              className="rounded bg-yellow-300 px-4 py-2 font-medium text-black"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold">Portfolio Admin</h1>
          <button
            className="rounded border border-gray-700 px-3 py-2 text-sm"
            onClick={handleLogout}
            disabled={loading}
            type="button"
          >
            Logout
          </button>
        </div>

        {statusMessage ? (
          <div className="rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm">
            {statusMessage}
          </div>
        ) : null}

        <section className="rounded-xl border border-gray-800 bg-gray-950 p-4">
          <h2 className="mb-3 text-xl font-semibold">Settings</h2>
          <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleSaveSettings}>
            <input
              className={baseInputClass}
              placeholder="Full name"
              value={settingsDraft.fullName || ""}
              onChange={(event) =>
                setSettingsDraft((prev) => ({ ...prev, fullName: event.target.value }))
              }
            />
            <input
              className={baseInputClass}
              placeholder="Title"
              value={settingsDraft.title || ""}
              onChange={(event) =>
                setSettingsDraft((prev) => ({ ...prev, title: event.target.value }))
              }
            />
            <textarea
              className={`${baseInputClass} md:col-span-2`}
              rows={4}
              placeholder="Bio"
              value={settingsDraft.bio || ""}
              onChange={(event) =>
                setSettingsDraft((prev) => ({ ...prev, bio: event.target.value }))
              }
            />
            {[
              ["location", "Location"],
              ["email", "Email"],
              ["githubUrl", "GitHub URL"],
              ["linkedinUrl", "LinkedIn URL"],
              ["twitterUrl", "Twitter URL"],
              ["instagramUrl", "Instagram URL"],
              ["resumeUrl", "Resume URL"],
              ["profileImageUrl", "Profile image URL"],
              ["profileImagePublicId", "Profile image public ID"],
            ].map(([field, label]) => (
              <input
                key={field}
                className={baseInputClass}
                placeholder={label}
                value={settingsDraft[field] || ""}
                onChange={(event) =>
                  setSettingsDraft((prev) => ({ ...prev, [field]: event.target.value }))
                }
              />
            ))}
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-300">Upload profile image</label>
              <input
                className={baseInputClass}
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  const uploaded = await handleUpload(file, {
                    folder: "portfolio/settings",
                    publicIdPrefix: "profile",
                  });
                  if (uploaded) {
                    setSettingsDraft((prev) => ({
                      ...prev,
                      profileImageUrl: uploaded.url,
                      profileImagePublicId: uploaded.publicId,
                    }));
                  }
                  event.target.value = "";
                }}
                disabled={uploading || loading}
              />
            </div>
            <div className="md:col-span-2">
              <button
                className="rounded bg-yellow-300 px-4 py-2 font-medium text-black"
                type="submit"
                disabled={loading}
              >
                Save Settings
              </button>
            </div>
          </form>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-950 p-4">
          <h2 className="mb-3 text-xl font-semibold">Projects</h2>
          <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleProjectSubmit}>
            <input className={baseInputClass} placeholder="Title" value={projectForm.title} onChange={(event) => setProjectForm((prev) => ({ ...prev, title: event.target.value }))} />
            <input className={baseInputClass} placeholder="Slug" value={projectForm.slug} onChange={(event) => setProjectForm((prev) => ({ ...prev, slug: event.target.value }))} />
            <textarea className={`${baseInputClass} md:col-span-2`} rows={3} placeholder="Description" value={projectForm.description} onChange={(event) => setProjectForm((prev) => ({ ...prev, description: event.target.value }))} />
            <input className={baseInputClass} placeholder="Live URL" value={projectForm.liveUrl} onChange={(event) => setProjectForm((prev) => ({ ...prev, liveUrl: event.target.value }))} />
            <input className={baseInputClass} placeholder="GitHub URL" value={projectForm.githubUrl} onChange={(event) => setProjectForm((prev) => ({ ...prev, githubUrl: event.target.value }))} />
            <input className={baseInputClass} placeholder="Image URL" value={projectForm.imageUrl} onChange={(event) => setProjectForm((prev) => ({ ...prev, imageUrl: event.target.value }))} />
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-300">Upload project image</label>
              <input
                className={baseInputClass}
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  const uploaded = await handleUpload(file, {
                    folder: "portfolio/projects",
                    publicIdPrefix: "project",
                  });
                  if (uploaded) {
                    setProjectForm((prev) => ({
                      ...prev,
                      imageUrl: uploaded.url,
                      imagePublicId: uploaded.publicId,
                    }));
                  }
                  event.target.value = "";
                }}
                disabled={uploading || loading}
              />
            </div>
            <input className={baseInputClass} placeholder="Image public ID" value={projectForm.imagePublicId} onChange={(event) => setProjectForm((prev) => ({ ...prev, imagePublicId: event.target.value }))} />
            <input className={baseInputClass} type="number" placeholder="Order" value={projectForm.orderIndex} onChange={(event) => setProjectForm((prev) => ({ ...prev, orderIndex: Number(event.target.value) }))} />
            <textarea className={`${baseInputClass} md:col-span-2`} rows={3} placeholder="Tech stack (one per line)" value={projectForm.techStackText} onChange={(event) => setProjectForm((prev) => ({ ...prev, techStackText: event.target.value }))} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={projectForm.featured} onChange={(event) => setProjectForm((prev) => ({ ...prev, featured: event.target.checked }))} /> Featured</label>
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={projectForm.isPublished} onChange={(event) => setProjectForm((prev) => ({ ...prev, isPublished: event.target.checked }))} /> Published</label>
            <div className="md:col-span-2 flex gap-2">
              <button className="rounded bg-yellow-300 px-4 py-2 font-medium text-black" type="submit" disabled={loading || !projectFormCanSubmit}>{editingProjectId ? "Update Project" : "Add Project"}</button>
              {editingProjectId ? <button type="button" className="rounded border border-gray-700 px-4 py-2" onClick={() => { setEditingProjectId(null); setProjectForm(initialProjectForm); }}>Cancel Edit</button> : null}
            </div>
          </form>
          <div className="mt-4 space-y-2">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-wrap items-center justify-between gap-2 rounded border border-gray-800 px-3 py-2 text-sm">
                <div>{project.title} <span className="text-gray-400">({project.slug})</span></div>
                <div className="flex gap-2">
                  <button className="rounded border border-gray-700 px-2 py-1" type="button" onClick={() => startProjectEdit(project)}>Edit</button>
                  <button className="rounded border border-red-700 px-2 py-1 text-red-300" type="button" onClick={() => handleDeleteProject(project.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-950 p-4">
          <h2 className="mb-3 text-xl font-semibold">Skills</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <form className="space-y-3" onSubmit={handleSkillGroupSubmit}>
              <h3 className="font-medium">Skill Group</h3>
              <input className={baseInputClass} placeholder="Group name" value={skillGroupForm.name} onChange={(event) => setSkillGroupForm((prev) => ({ ...prev, name: event.target.value }))} />
              <input className={baseInputClass} type="number" placeholder="Order" value={skillGroupForm.orderIndex} onChange={(event) => setSkillGroupForm((prev) => ({ ...prev, orderIndex: Number(event.target.value) }))} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={skillGroupForm.isPublished} onChange={(event) => setSkillGroupForm((prev) => ({ ...prev, isPublished: event.target.checked }))} /> Published</label>
              <div className="flex gap-2">
                <button className="rounded bg-yellow-300 px-4 py-2 font-medium text-black" type="submit" disabled={loading}>{editingSkillGroupId ? "Update Group" : "Add Group"}</button>
                {editingSkillGroupId ? <button type="button" className="rounded border border-gray-700 px-4 py-2" onClick={() => { setEditingSkillGroupId(null); setSkillGroupForm({ name: "", orderIndex: 0, isPublished: true }); }}>Cancel</button> : null}
              </div>
            </form>

            <form className="space-y-3" onSubmit={handleSkillSubmit}>
              <h3 className="font-medium">Skill</h3>
              <select className={baseInputClass} value={skillForm.skillGroupId} onChange={(event) => setSkillForm((prev) => ({ ...prev, skillGroupId: event.target.value }))}>
                <option value="">Select group</option>
                {skillGroups.map((group) => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
              <input className={baseInputClass} placeholder="Skill name" value={skillForm.name} onChange={(event) => setSkillForm((prev) => ({ ...prev, name: event.target.value }))} />
              <input className={baseInputClass} placeholder="Icon key (e.g. DiReact)" value={skillForm.iconKey} onChange={(event) => setSkillForm((prev) => ({ ...prev, iconKey: event.target.value }))} />
              <input className={baseInputClass} type="number" placeholder="Order" value={skillForm.orderIndex} onChange={(event) => setSkillForm((prev) => ({ ...prev, orderIndex: Number(event.target.value) }))} />
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={skillForm.isPublished} onChange={(event) => setSkillForm((prev) => ({ ...prev, isPublished: event.target.checked }))} /> Published</label>
              <div className="flex gap-2">
                <button className="rounded bg-yellow-300 px-4 py-2 font-medium text-black" type="submit" disabled={loading}>{editingSkillId ? "Update Skill" : "Add Skill"}</button>
                {editingSkillId ? <button type="button" className="rounded border border-gray-700 px-4 py-2" onClick={() => { setEditingSkillId(null); setSkillForm({ skillGroupId: "", name: "", iconKey: "", orderIndex: 0, isPublished: true }); }}>Cancel</button> : null}
              </div>
            </form>
          </div>

          <div className="mt-4 space-y-2">
            {skillGroups.map((group) => (
              <div key={group.id} className="rounded border border-gray-800 p-3">
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <div className="font-medium">{group.name}</div>
                  <div className="flex gap-2">
                    <button className="rounded border border-gray-700 px-2 py-1 text-sm" type="button" onClick={() => { setEditingSkillGroupId(group.id); setSkillGroupForm({ name: group.name, orderIndex: group.orderIndex, isPublished: group.isPublished }); }}>Edit Group</button>
                    <button className="rounded border border-red-700 px-2 py-1 text-sm text-red-300" type="button" onClick={() => handleDeleteSkillGroup(group.id)}>Delete Group</button>
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  {(group.skills || []).map((skill) => (
                    <div key={skill.id} className="flex flex-wrap items-center justify-between gap-2 rounded border border-gray-800 px-2 py-1">
                      <div>{skill.name} <span className="text-gray-400">({skill.iconKey || "no-icon"})</span></div>
                      <div className="flex gap-2">
                        <button className="rounded border border-gray-700 px-2 py-1" type="button" onClick={() => { setEditingSkillId(skill.id); setSkillForm({ skillGroupId: String(skill.skillGroupId), name: skill.name, iconKey: skill.iconKey || "", orderIndex: skill.orderIndex, isPublished: skill.isPublished }); }}>Edit</button>
                        <button className="rounded border border-red-700 px-2 py-1 text-red-300" type="button" onClick={() => handleDeleteSkill(skill.id)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-950 p-4">
          <h2 className="mb-3 text-xl font-semibold">Stories</h2>
          <form className="grid grid-cols-1 gap-3 md:grid-cols-2" onSubmit={handleStorySubmit}>
            <input className={baseInputClass} placeholder="Title" value={storyForm.title} onChange={(event) => setStoryForm((prev) => ({ ...prev, title: event.target.value }))} />
            <input className={baseInputClass} placeholder="Slug" value={storyForm.slug} onChange={(event) => setStoryForm((prev) => ({ ...prev, slug: event.target.value }))} />
            <input className={baseInputClass} placeholder="Date text" value={storyForm.dateText} onChange={(event) => setStoryForm((prev) => ({ ...prev, dateText: event.target.value }))} />
            <input className={baseInputClass} placeholder="Location" value={storyForm.location} onChange={(event) => setStoryForm((prev) => ({ ...prev, location: event.target.value }))} />
            <input className={baseInputClass} placeholder="Status" value={storyForm.status} onChange={(event) => setStoryForm((prev) => ({ ...prev, status: event.target.value }))} />
            <input className={baseInputClass} placeholder="Card image URL" value={storyForm.cardImageUrl} onChange={(event) => setStoryForm((prev) => ({ ...prev, cardImageUrl: event.target.value }))} />
            <input className={baseInputClass} placeholder="Card image public ID" value={storyForm.cardImagePublicId} onChange={(event) => setStoryForm((prev) => ({ ...prev, cardImagePublicId: event.target.value }))} />
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-300">Upload story card image</label>
              <input
                className={baseInputClass}
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  const uploaded = await handleUpload(file, {
                    folder: "portfolio/stories",
                    publicIdPrefix: "story-card",
                  });
                  if (uploaded) {
                    setStoryForm((prev) => ({
                      ...prev,
                      cardImageUrl: uploaded.url,
                      cardImagePublicId: uploaded.publicId,
                    }));
                  }
                  event.target.value = "";
                }}
                disabled={uploading || loading}
              />
            </div>
            <input className={baseInputClass} type="number" placeholder="Order" value={storyForm.orderIndex} onChange={(event) => setStoryForm((prev) => ({ ...prev, orderIndex: Number(event.target.value) }))} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={storyForm.isPublished} onChange={(event) => setStoryForm((prev) => ({ ...prev, isPublished: event.target.checked }))} /> Published</label>
            <textarea className={`${baseInputClass} md:col-span-2`} rows={3} placeholder="Images URLs (one per line)" value={storyForm.imagesText} onChange={(event) => setStoryForm((prev) => ({ ...prev, imagesText: event.target.value }))} />
            <textarea className={`${baseInputClass} md:col-span-2`} rows={3} placeholder="Image public IDs (one per line)" value={storyForm.imagePublicIdsText} onChange={(event) => setStoryForm((prev) => ({ ...prev, imagePublicIdsText: event.target.value }))} />
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm text-gray-300">Upload gallery image</label>
              <input
                className={baseInputClass}
                type="file"
                accept="image/*"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  const uploaded = await handleUpload(file, {
                    folder: "portfolio/stories",
                    publicIdPrefix: "story-gallery",
                  });
                  if (uploaded) {
                    setStoryForm((prev) => {
                      const imageLines = prev.imagesText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean);
                      const publicIdLines = prev.imagePublicIdsText
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean);
                      imageLines.push(uploaded.url);
                      publicIdLines.push(uploaded.publicId);
                      return {
                        ...prev,
                        imagesText: imageLines.join("\n"),
                        imagePublicIdsText: publicIdLines.join("\n"),
                      };
                    });
                  }
                  event.target.value = "";
                }}
                disabled={uploading || loading}
              />
            </div>
            <textarea className={`${baseInputClass} md:col-span-2`} rows={6} placeholder="Story markdown" value={storyForm.contentMarkdown} onChange={(event) => setStoryForm((prev) => ({ ...prev, contentMarkdown: event.target.value }))} />
            <textarea className={`${baseInputClass} md:col-span-2`} rows={4} placeholder="Project JSON" value={storyForm.projectJsonText} onChange={(event) => setStoryForm((prev) => ({ ...prev, projectJsonText: event.target.value }))} />
            <textarea className={`${baseInputClass} md:col-span-2`} rows={3} placeholder="Outcomes (one per line)" value={storyForm.outcomesText} onChange={(event) => setStoryForm((prev) => ({ ...prev, outcomesText: event.target.value }))} />
            <textarea className={`${baseInputClass} md:col-span-2`} rows={4} placeholder="Team JSON" value={storyForm.teamJsonText} onChange={(event) => setStoryForm((prev) => ({ ...prev, teamJsonText: event.target.value }))} />
            <div className="md:col-span-2 flex gap-2">
              <button className="rounded bg-yellow-300 px-4 py-2 font-medium text-black" type="submit" disabled={loading || !storyFormCanSubmit}>{editingStoryId ? "Update Story" : "Add Story"}</button>
              {editingStoryId ? <button type="button" className="rounded border border-gray-700 px-4 py-2" onClick={() => { setEditingStoryId(null); setStoryForm(initialStoryForm); }}>Cancel Edit</button> : null}
            </div>
          </form>

          <div className="mt-4 space-y-2 text-sm">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-wrap items-center justify-between gap-2 rounded border border-gray-800 px-3 py-2">
                <div>{story.title} <span className="text-gray-400">({story.slug})</span></div>
                <div className="flex gap-2">
                  <button className="rounded border border-gray-700 px-2 py-1" type="button" onClick={() => startStoryEdit(story)}>Edit</button>
                  <button className="rounded border border-red-700 px-2 py-1 text-red-300" type="button" onClick={() => handleDeleteStory(story.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-950 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Contact Messages</h2>
            <span className="text-xs text-gray-400">{contactMessages.length} total</span>
          </div>

          {contactMessages.length === 0 ? (
            <div className="rounded border border-gray-800 px-3 py-2 text-sm text-gray-400">
              No contact messages yet.
            </div>
          ) : (
            <div className="space-y-2">
              {contactMessages.map((item) => (
                <article key={item.id} className="rounded border border-gray-800 p-3 text-sm">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium text-gray-100">{item.name}</div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-xs ${
                          item.status === "new"
                            ? "bg-yellow-900/50 text-yellow-300"
                            : item.status === "read"
                              ? "bg-blue-900/50 text-blue-300"
                              : "bg-gray-800 text-gray-300"
                        }`}
                      >
                        {item.status}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <a className="text-xs text-yellow-300" href={`mailto:${item.email}`}>
                    {item.email}
                  </a>
                  <p className="mt-2 whitespace-pre-wrap text-gray-200">{item.message}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      className="rounded border border-gray-700 px-2 py-1 text-xs"
                      type="button"
                      disabled={loading || item.status === "new"}
                      onClick={() => handleUpdateContactStatus(item.id, "new")}
                    >
                      Mark New
                    </button>
                    <button
                      className="rounded border border-gray-700 px-2 py-1 text-xs"
                      type="button"
                      disabled={loading || item.status === "read"}
                      onClick={() => handleUpdateContactStatus(item.id, "read")}
                    >
                      Mark Read
                    </button>
                    <button
                      className="rounded border border-gray-700 px-2 py-1 text-xs"
                      type="button"
                      disabled={loading || item.status === "archived"}
                      onClick={() => handleUpdateContactStatus(item.id, "archived")}
                    >
                      Archive
                    </button>
                    <button
                      className="rounded border border-red-700 px-2 py-1 text-xs text-red-300"
                      type="button"
                      disabled={loading}
                      onClick={() => handleDeleteContactMessage(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      {uploading ? (
        <div className="fixed bottom-4 right-4 rounded border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200">
          Uploading file...
        </div>
      ) : null}
    </div>
  );
}
