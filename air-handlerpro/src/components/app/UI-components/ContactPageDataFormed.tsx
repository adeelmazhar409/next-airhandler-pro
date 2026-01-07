"use client";
import ContactCard from "@/components/app/UI-components/contactPageData";

function LoadingSkeleton({ viewMode }: { viewMode: "list" | "grid" }) {
  return (
    <div className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}>
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={
            viewMode === "grid"
              ? "w-full max-w-sm h-80 bg-gray-200 animate-pulse rounded-xl"
              : "w-full h-32 bg-gray-200 animate-pulse rounded-lg"
          }
        />
      ))}
    </div>
  );
}

interface ContactPageDataFormedProps {
  loading?: boolean;
  error?: string | null;
  contacts?: any[];
  handleDeleteContact?: (contactId: string, contactName: string) => void;
  onEditContact?: (contactId: string) => void;
  viewMode?: "list" | "grid";
}

export default function ContactPageDataFormed({
  loading,
  error,
  contacts,
  handleDeleteContact,
  onEditContact,
  viewMode = "grid",
}: ContactPageDataFormedProps) {
  return (
    <div>
      {loading && <LoadingSkeleton viewMode={viewMode} />}

      {error && (
        <div className="text-center py-12">
          <p className="text-gray-500">{error}</p>
        </div>
      )}

      {!loading && !error && contacts?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No contacts found.</p>
        </div>
      )}

      {!loading && !error && contacts && contacts.length > 0 && (
        <div
          className={viewMode === "grid" ? "flex gap-3 flex-wrap" : "space-y-4"}
        >
          {contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contactData={contact}
              viewMode={viewMode}
              onEdit={() => onEditContact?.(contact.id)}
              onDelete={() =>
                handleDeleteContact?.(
                  contact.id,
                  `${contact.first_name} ${contact.last_name}`
                )
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
