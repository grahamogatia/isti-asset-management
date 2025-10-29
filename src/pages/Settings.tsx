function Settings() {
  return (
    <div className="flex h-screen p-5">
      <div className="h-full w-1/5 border" id="sidebar">Sidebar</div>
      <div className="flex-1" id="content">Content</div>
    </div>
  );
}

export default Settings;
