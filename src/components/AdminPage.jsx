import { useState } from "react";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import {
  Upload,
  Plus,
  Trophy,
  Medal,
  Award,
  Bookmark,
  GitBranch,
  ClipboardList,
} from "lucide-react";

// Firebase configuration (WARNING: This should be in environment variables in production)
const firebaseConfig = {
  /* ... */
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const iconMap = { trophy: Trophy, medal: Medal, award: Award };

const Input = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  required,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {label}
    </label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
    />
  </div>
);

const DynamicInput = ({ label, items, setItems, fields, section }) => {
  const [currentItem, setCurrentItem] = useState({});
  const [error, setError] = useState("");

  const handleAdd = () => {
    const missingFields = fields.filter((field) => !currentItem[field.key]);
    if (missingFields.length > 0) {
      setError(`Missing: ${missingFields.map((f) => f.label).join(", ")}`);
      return;
    }

    setItems([...items, currentItem]);
    setCurrentItem({});
    setError("");
  };

  const handleRemove = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex flex-wrap gap-3">
              {fields.map((field) => (
                <span key={field.key} className="text-sm">
                  <span className="font-medium">{field.label}:</span>{" "}
                  {item[field.key]}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex flex-wrap gap-2">
          {fields.map((field) => (
            <div key={field.key} className="flex-1 min-w-[200px]">
              {field.key === "icon" ? (
                <select
                  value={currentItem[field.key] || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      [field.key]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Icon</option>
                  {Object.keys(iconMap).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={currentItem[field.key] || ""}
                  onChange={(e) =>
                    setCurrentItem({
                      ...currentItem,
                      [field.key]: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAdd}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    imageLinks: [], // Array of image URLs
    links: { demo: "", github: "", website: "" }, // Add website field
    tags: [],
  });

  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState({});
  const [error, setError] = useState({});

  const handleSubmit = async (e, section) => {
    e.preventDefault();
    setUploading(true);
    setError((prev) => ({ ...prev, [section]: "" }));
    setSuccess((prev) => ({ ...prev, [section]: false }));

    try {
      const data = {
        project: project,
        skills: { items: skills },
        certificates: { items: certificates },
        achievements: { items: achievements },
      }[section];

      const sectionRef = doc(collection(db, section));
      await setDoc(sectionRef, data);

      setSuccess((prev) => ({ ...prev, [section]: true }));
      setTimeout(
        () => setSuccess((prev) => ({ ...prev, [section]: false })),
        3000
      );

      // Reset form
      if (section === "project") {
        setProject({
          title: "",
          description: "",
          imageLinks: [],
          links: { demo: "", github: "", website: "" }, // Reset website field
          tags: [],
        });
      } else {
        eval(`set${section.charAt(0).toUpperCase() + section.slice(1)}([])`);
      }
    } catch (err) {
      setError((prev) => ({ ...prev, [section]: err.message }));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
          <ClipboardList size={24} /> Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Manage your portfolio content efficiently
        </p>
      </div>

      {/* Project Form */}
      <form onSubmit={(e) => handleSubmit(e, "project")} className="mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Upload size={20} /> Project Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Project Title"
              name="title"
              value={project.title}
              onChange={(e) =>
                setProject({ ...project, title: e.target.value })
              }
            />
            <Input
              label="Image URLs (comma-separated)"
              value={project.imageLinks.join(", ")}
              onChange={(e) =>
                setProject({
                  ...project,
                  imageLinks: e.target.value
                    .split(",")
                    .map((link) => link.trim()),
                })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Demo URL"
              name="links.demo"
              value={project.links.demo}
              onChange={(e) =>
                setProject({
                  ...project,
                  links: { ...project.links, demo: e.target.value },
                })
              }
            />
            <Input
              label="GitHub URL"
              name="links.github"
              value={project.links.github}
              onChange={(e) =>
                setProject({
                  ...project,
                  links: { ...project.links, github: e.target.value },
                })
              }
            />
            {/* Add Website URL Input */}
            <Input
              label="Website URL"
              name="links.website"
              value={project.links.website}
              onChange={(e) =>
                setProject({
                  ...project,
                  links: { ...project.links, website: e.target.value },
                })
              }
            />
          </div>

          <Input
            label="Tags (comma-separated)"
            value={project.tags.join(", ")}
            onChange={(e) =>
              setProject({
                ...project,
                tags: e.target.value.split(",").map((t) => t.trim()),
              })
            }
          />

          <div className="mt-6 flex items-center gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {uploading ? "Saving..." : "Save Project"}
            </button>
            {success.project && (
              <span className="text-green-500 text-sm">✓ Project saved!</span>
            )}
            {error.project && (
              <span className="text-red-500 text-sm">{error.project}</span>
            )}
          </div>
        </div>
      </form>

      {/* Skills Form */}
      <form onSubmit={(e) => handleSubmit(e, "skills")} className="mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <GitBranch size={20} /> Skills
          </h2>

          <DynamicInput
            label="Technical Skills"
            items={skills}
            setItems={setSkills}
            fields={[
              { key: "title", label: "Skill", placeholder: "e.g., React" },
              {
                key: "description",
                label: "Level",
                placeholder: "e.g., Advanced",
              },
            ]}
          />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={uploading}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              {uploading ? "Saving..." : "Save Skills"}
            </button>
            {success.skills && (
              <span className="text-green-500 text-sm">✓ Skills saved!</span>
            )}
            {error.skills && (
              <span className="text-red-500 text-sm">{error.skills}</span>
            )}
          </div>
        </div>
      </form>

      {/* Certificates & Achievements Forms */}
      <div className="grid md:grid-cols-2 gap-6">
        <form
          onSubmit={(e) => handleSubmit(e, "certificates")}
          className="mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bookmark size={20} /> Certificates
            </h2>

            <DynamicInput
              label="Certifications"
              items={certificates}
              setItems={setCertificates}
              fields={[
                {
                  key: "title",
                  label: "Title",
                  placeholder: "Certificate name",
                },
                {
                  key: "issuer",
                  label: "Issuer",
                  placeholder: "Issuing organization",
                },
                { key: "date", label: "Date", placeholder: "YYYY-MM-DD" },
                {
                  key: "credentialUrl",
                  label: "URL",
                  placeholder: "Credential URL",
                },
              ]}
            />

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {uploading ? "Saving..." : "Save Certificates"}
              </button>
              {success.certificates && (
                <span className="text-green-500 text-sm">
                  ✓ Certificates saved!
                </span>
              )}
              {error.certificates && (
                <span className="text-red-500 text-sm">
                  {error.certificates}
                </span>
              )}
            </div>
          </div>
        </form>

        <form
          onSubmit={(e) => handleSubmit(e, "achievements")}
          className="mb-8"
        >
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Trophy size={20} /> Achievements
            </h2>

            <DynamicInput
              label="Achievements & Awards"
              items={achievements}
              setItems={setAchievements}
              fields={[
                {
                  key: "title",
                  label: "Title",
                  placeholder: "Achievement name",
                },
                {
                  key: "description",
                  label: "Details",
                  placeholder: "Description",
                },
                { key: "date", label: "Date", placeholder: "YYYY-MM-DD" },
                { key: "icon", label: "Icon", placeholder: "Select icon" },
              ]}
            />

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={uploading}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {uploading ? "Saving..." : "Save Achievements"}
              </button>
              {success.achievements && (
                <span className="text-green-500 text-sm">
                  ✓ Achievements saved!
                </span>
              )}
              {error.achievements && (
                <span className="text-red-500 text-sm">
                  {error.achievements}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
        ⚠️ Security Note: Firebase configuration should be stored in environment
        variables in production.
      </div>
    </div>
  );
};

export default AdminPage;
