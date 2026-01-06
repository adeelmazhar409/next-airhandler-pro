// app/page.tsx or any component
import ContactCard from "@/components/app/UI-components/contactPageData";

function LoadingSkeleton() {
  return (
    <div className="flex gap-3 flex-wrap">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="w-full max-w-sm h-64 bg-gray-200 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
}

export default function ContactPageDataFormed({
  loading,
  error,
  contacts,
  handleDeleteContact,
  onEditContact,
}: {
  loading?: boolean;
  error?: string | null;
  contacts?: any[];
  handleDeleteContact?: (contactId: string, contactName: string) => void;
  onEditContact?: (contact: any) => void;
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Contacts
      </h2>

      {loading && <LoadingSkeleton />}

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
        <div className="flex gap-3 flex-wrap">
          {contacts?.map((contact) => {

            return (
              <ContactCard
                key={contact.id}
                contactData={contact}
                onEdit={() => {
                  if (onEditContact) {
                    onEditContact(contact.id);
                  }
                }}
                onDelete={() =>
                  handleDeleteContact &&
                  handleDeleteContact(
                    contact.id,
                    contact.first_name + " " + contact.last_name
                  )
                }
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
