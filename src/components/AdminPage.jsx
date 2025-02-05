import { useState } from "react";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, collection } from "firebase/firestore";
import { Upload, Plus, Trophy, Medal, Award } from "lucide-react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDS27RDZrx72z7QwnedhX7iVkLXJW4t4Oc",
  authDomain: "persnal-website-9ab5f.firebaseapp.com",
  projectId: "persnal-website-9ab5f",
  databaseURL: "https://persnal-website-9ab5f-default-rtdb.firebaseio.com/",
  storageBucket: "persnal-website-9ab5f.appspot.com",
  messagingSenderId: "135506035497",
  appId: "1:135506035497:web:62199e679d661e2b3d6d38",
};

// Initialize Firebase
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const db = getFirestore(app); // Initialize Firestore

// Icon mapping
const iconMap = {
  trophy: Trophy,
  medal: Medal,
  award: Award,
};

// Helper Input Component
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

// Dynamic Input Component for adding items to an array
const DynamicInput = ({ label, items, setItems, placeholders, fields }) => {
  const [currentItem, setCurrentItem] = useState({});

  const handleAdd = () => {
    if (Object.values(currentItem).some((value) => !value)) return;
    setItems([...items, currentItem]);
    setCurrentItem({});
  };

  const handleRemove = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>
              {fields
                .map((field) => `${field.label}: ${item[field.key]}`)
                .join(", ")}
            </span>
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="flex">
          {fields.map((field) => (
            <input
              key={field.key}
              type="text"
              value={currentItem[field.key] || ""}
              onChange={(e) =>
                setCurrentItem({ ...currentItem, [field.key]: e.target.value })
              }
              placeholder={field.placeholder}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ml-2"
            />
          ))}
          <button
            type="button"
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 rounded-lg ml-2"
          >
            Add
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
    imageLink: "",
    links: {
      demo: "",
      github: "",
    },
    tags: [],
  });

  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e, section) => {
    const { name, value } = e.target;

    if (section === "project") {
      if (name.startsWith("links.")) {
        const key = name.split(".")[1];
        setProject((prev) => ({
          ...prev,
          links: { ...prev.links, [key]: value },
        }));
      } else if (name === "tags") {
        setProject((prev) => ({
          ...prev,
          tags: value.split(",").map((tag) => tag.trim()),
        }));
      } else {
        setProject((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    }
  };

  // Handle form submission
  const handleSubmit = async (e, section) => {
    e.preventDefault();
    setUploading(true);

    try {
      let data = {};

      // Prepare data for each section
      if (section === "project") {
        data = {
          title: project.title,
          description: project.description,
          imageLink: project.imageLink,
          links: project.links,
          tags: project.tags,
        };
      }

      if (section === "skills") {
        data = { skills };
      }

      if (section === "certificates") {
        data = { certificates };
      }

      if (section === "achievements") {
        data = { achievements };
      }

      // Save the data to Firestore
      const sectionRef = doc(collection(db, section));
      await setDoc(sectionRef, data);

      alert(`${section} details saved successfully!`);
    } catch (error) {
      console.error(`Error saving ${section} details:`, error);
      alert(`Failed to save ${section} details...`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Fill in the details below and submit them independently.
        </p>
      </div>

      {/* Project Details Section */}
      <form onSubmit={(e) => handleSubmit(e, "project")} className="space-y-6">
        <div className="p-6 rounded-lg mb-6 bg-white shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Project Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Project Title"
              type="text"
              name="title"
              placeholder="Enter project title"
              value={project.title}
              onChange={(e) => handleChange(e, "project")}
            />
            <Input
              label="Image Link"
              type="text"
              name="imageLink"
              placeholder="Enter image URL"
              value={project.imageLink}
              onChange={(e) => handleChange(e, "project")}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Describe your project..."
              value={project.description}
              onChange={(e) => handleChange(e, "project")}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              label="Demo Link"
              type="text"
              name="links.demo"
              placeholder="https://..."
              value={project.links.demo}
              onChange={(e) => handleChange(e, "project")}
            />
            <Input
              label="GitHub Link"
              type="text"
              name="links.github"
              placeholder="https://github.com/"
              value={project.links.github}
              onChange={(e) => handleChange(e, "project")}
            />
          </div>
          <Input
            label="Tags"
            type="text"
            name="tags"
            placeholder="React, TypeScript, Tailwind CSS"
            value={project.tags.join(",")}
            onChange={(e) => handleChange(e, "project")}
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Submit Project"}
          </button>
        </div>
      </form>

      {/* Skills Section */}
      <form onSubmit={(e) => handleSubmit(e, "skills")} className="space-y-6">
        <div className="p-6 rounded-lg mb-6 bg-white shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>

          {/* Dynamic Input for Skills */}
          <DynamicInput
            label="Add Skills"
            items={skills}
            setItems={setSkills}
            placeholders={{
              title: "Skill",
              description: "Percentage",
            }}
            fields={[
              { key: "title", label: "Skill", placeholder: "Skill" },
              {
                key: "description",
                label: "Percentage",
                placeholder: "Percentage",
              },
            ]}
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Submit Skills"}
          </button>
        </div>
      </form>

      {/* Certificates Section */}
      <form
        onSubmit={(e) => handleSubmit(e, "certificates")}
        className="space-y-6"
      >
        <div className="p-6 rounded-lg mb-6 bg-white shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Certificates
          </h2>
          <DynamicInput
            label="Add Certificates"
            items={certificates}
            setItems={setCertificates}
            placeholders={{ title: "Certificate Title", description: "Link" }}
            fields={[
              {
                key: "title",
                label: "Title",
                placeholder: "Certificate Title",
              },
              { key: "issuer", label: "Issuer", placeholder: "Issuer" },
              { key: "date", label: "Date", placeholder: "Year" },
              {
                key: "credentialUrl",
                label: "Credential URL",
                placeholder: "https://...",
              },
              { key: "image", label: "Image URL", placeholder: "Image URL" },
              { key: "category", label: "Category", placeholder: "Category" },
            ]}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Submit Certificates"}
          </button>
        </div>
      </form>

      {/* Achievements Section */}
      <form
        onSubmit={(e) => handleSubmit(e, "achievements")}
        className="space-y-6"
      >
        <div className="p-6 rounded-lg mb-6 bg-white shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Achievements
          </h2>
          <DynamicInput
            label="Add Achievements"
            items={achievements}
            setItems={setAchievements}
            placeholders={{ title: "Achievement", description: "Details/Link" }}
            fields={[
              { key: "title", label: "Title", placeholder: "Achievement" },
              {
                key: "description",
                label: "Description",
                placeholder: "Details",
              },
              { key: "date", label: "Date", placeholder: "Year" },
              { key: "icon", label: "Icon", placeholder: "Icon Name" },
            ]}
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            disabled={uploading}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Submit Achievements"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPage;
