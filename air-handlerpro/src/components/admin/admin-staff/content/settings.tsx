"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Save,
  Upload,
  Camera,
} from "lucide-react";

export default function Settings() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-charcoal flex items-center gap-3">
            <User className="w-6 h-6" />
            Profile Settings
          </h1>
          <p className="text-sm text-slate mt-2">
            Update your personal information and profile picture
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white border border-slate/30 rounded-lg p-8 space-y-8">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-platinum border-2 border-slate/30 flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-slate" />
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-cerulean text-white p-2 rounded-full cursor-pointer hover:bg-cerulean/90 transition-colors shadow-lg"
              >
                <Camera className="w-4 h-4" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-slate mt-3">
              Click the camera icon to upload a new profile picture
            </p>
          </div>

          <hr className="border-slate/30" />

          {/* Personal Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-charcoal">
              Personal Information
            </h2>

            {/* Full Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="(555) 123-4567"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Job Title
              </label>
              <input
                type="text"
                placeholder="System Administrator"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Address
              </label>
              <input
                type="text"
                placeholder="123 Main Street"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean mb-3"
              />
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate/30" />

          {/* Password Change Section */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-charcoal">
              Change Password
            </h2>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border border-silver rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cerulean focus:border-cerulean"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button className="w-full px-4 py-3 bg-cerulean text-white rounded-lg font-medium hover:bg-cerulean/90 transition-colors flex items-center justify-center gap-2">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}