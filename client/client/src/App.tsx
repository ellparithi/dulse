 
import { useState } from 'react';

function App() {
  const [resume, setResume] = useState<File | null>(null);
  const [recipientName, setRecipientName] = useState('');
  const [recipientContact, setRecipientContact] = useState('');
  const [role, setRole] = useState('');
  const [goal, setGoal] = useState('');
  const [tone, setTone] = useState('friendly');
  const [format, setFormat] = useState('linkedin');
  const [generatedMessage, setGeneratedMessage] = useState('');


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full space-y-6">
        <h1 className="text-2xl font-bold text-center text-blue-700">Dulse Outreach Generator</h1>

        <form
          className="space-y-4"
          onSubmit={async (e) => {
            e.preventDefault(); // Prevent page reload

            // Step 1: Validate fields 
            if (!recipientName || !recipientContact || !role || !goal) {
              alert("Please fill out all required fields.");
              return;
            }

            // Step 2: Prepare the payload
            const formData = {
              recipientName,
              recipientContact,
              role,
              goal,
              tone,
              format,
            };

            try {
              // Step 3: Send POST request to backend
              const response = await fetch("http://localhost:3001/generate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
              });

              const data = await response.json();
              console.log("✅ Backend response:", data);
              setGeneratedMessage(data.message);
            } catch (err) {
              console.error("❌ Error sending data:", err);
              alert("Something went wrong. Check the console.");
            }
          }}
        >

          {/* Resume Upload */}
          <div>
            <label className="block font-medium text-sm mb-1">Upload your resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              className="w-full border border-gray-300 rounded px-3 py-2"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Recipient Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Recipient LinkedIn URL / Email</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={recipientContact}
              onChange={(e) => setRecipientContact(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Role you're looking for</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Goal (referral, job inquiry, mentorship)</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Tone</label>
            <select
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option value="friendly">Friendly</option>
              <option value="formal">Formal</option>
              <option value="confident">Confident</option>
              <option value="curious">Curious</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm mb-1">Message Format</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="format"
                  value="linkedin"
                  checked={format === 'linkedin'}
                  onChange={() => setFormat('linkedin')}
                />
                LinkedIn Message
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="format"
                  value="email"
                  checked={format === 'email'}
                  onChange={() => setFormat('email')}
                />
                Cold Email
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Generate Message
            
          </button>
        </form>
        {generatedMessage && (
          <div className="mt-8 p-4 bg-white shadow-md rounded-lg border border-blue-200 space-y-4">
            <h2 className="text-xl font-bold text-blue-700">Generated Message:</h2>
            <p className="text-gray-800 whitespace-pre-line">{generatedMessage}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedMessage);
                alert('Message copied to clipboard!');
              }}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Copy to Clipboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
