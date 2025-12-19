import Button from "../../UI-components/button";
const users = [
  {
    id: 1,
    name: "kagok71099@roratu.com",
    email: "kagok71099@roratu.com",
    role: "software admin",
    company: "", // No company shown for this user
    joined: "12/17/2025",
  },
  
  {
    id: 5,
    name: "Dead",
    email: "twallick@gmail.com",
    role: "user",
    company: "Default Company",
    joined: "7/24/2025",
  },
];
export default function UserManegement() {
  return (<div className="p-8 border-slate/30 border rounded-lg ">
        {/* Header with Title and Invite Button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            User Management
          </h1>
        
          <Button value="Invite User"/>
        </div>
  
        {/* Users Table */}
        <div className="bg-white border border-silver rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="bg-platinum/30 border-b border-silver">
            <div className="grid grid-cols-12 gap-4 px-6 py-3">
              <div className="col-span-3 text-xs font-medium text-slate uppercase tracking-wider">
                Name
              </div>
              <div className="col-span-3 text-xs font-medium text-slate uppercase tracking-wider">
                Email
              </div>
              <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
                Role
              </div>
              <div className="col-span-2 text-xs font-medium text-slate uppercase tracking-wider">
                Company
              </div>
              <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider">
                Joined
              </div>
              <div className="col-span-1 text-xs font-medium text-slate uppercase tracking-wider text-right">
                Actions
              </div>
            </div>
          </div>
  
          {/* Table Body */}
          <div className="divide-y divide-silver">
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-platinum/20 transition-colors items-center"
              >
                {/* Name */}
                <div className="col-span-3">
                  <p className="text-sm font-medium text-charcoal">{user.name}</p>
                </div>
  
                {/* Email */}
                <div className="col-span-3">
                  <p className="text-sm text-slate">{user.email}</p>
                </div>
  
                {/* Role */}
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "software admin"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </div>
  
                {/* Company */}
                <div className="col-span-2 text-sm text-slate">
                  {user.company || "—"}
                </div>
  
                {/* Joined Date */}
                <div className="col-span-1 text-sm text-slate">{user.joined}</div>
  
                {/* Actions */}
                <div className="col-span-1 flex justify-end">
                  <button className="p-2 text-slate hover:text-cerulean hover:bg-platinum rounded transition-colors">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
