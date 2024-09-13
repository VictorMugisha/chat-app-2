/* eslint-disable react/prop-types */

export default function ChatMessage({ user, message }) {
  return (
    <div className="mb-2 p-2 bg-gray-100 rounded-md">
      <p>
        <strong>{user}:</strong> {message}
      </p>
    </div>
  );
}
