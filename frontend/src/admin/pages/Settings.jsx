import { useState } from "react";
import AdminLayout from "../AdminLayout";
import {
  Settings as SettingsIcon,
  Save,
  Shield,
  Bell,
  Globe,
  Database,
  RefreshCw,
  CheckCircle
} from "lucide-react";

export default function Settings() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowRegistration: true,
    emailNotifications: true,
    securityLogging: true,
    autoApproveContractors: false,
    backupEnabled: true,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleToggle(name) {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  }

  async function saveSettings() {
    setSaving(true);
    setSaved(false);

    // Future API Integration
    // await fetch(`${API_URL}/api/settings`, {...})

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    }, 1200);
  }

  return (
    <AdminLayout>
      <div className="admin-content">

        <div className="page-header">
          <div>
            <h1>System Settings</h1>
            <p>
              Configure platform preferences, security settings, and system
              options.
            </p>
          </div>

          <button
            className="primary-btn"
            onClick={saveSettings}
            disabled={saving}
          >
            {saving ? (
              <>
                <RefreshCw className="spin" size={18} />
                Saving...
              </>
            ) : (
              <>
                <Save size={18} />
                Save Settings
              </>
            )}
          </button>
        </div>

        <div className="dashboard-cards">

          <div className="dashboard-card">
            <div className="card-icon analytics">
              <SettingsIcon size={30} />
            </div>
            <span>System Status</span>
            <h1>Online</h1>
            <p>Platform Operational</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon users">
              <Shield size={30} />
            </div>
            <span>Security</span>
            <h1>Enabled</h1>
            <p>All Protections Active</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon contractors">
              <Database size={30} />
            </div>
            <span>Backups</span>
            <h1>Daily</h1>
            <p>Automatic Backups</p>
          </div>

          <div className="dashboard-card">
            <div className="card-icon reviews">
              <Bell size={30} />
            </div>
            <span>Notifications</span>
            <h1>On</h1>
            <p>Admin Alerts Enabled</p>
          </div>

        </div>

        <div className="activity-panel">

          <div className="panel-header">
            <h2>Application Settings</h2>
          </div>

          <div className="settings-grid">

            <div className="setting-row">
              <div>
                <h3>Maintenance Mode</h3>
                <p>Temporarily disable public access.</p>
              </div>

              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={() =>
                  handleToggle("maintenanceMode")
                }
              />
            </div>

            <div className="setting-row">
              <div>
                <h3>User Registration</h3>
                <p>Allow new users to register.</p>
              </div>

              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={() =>
                  handleToggle("allowRegistration")
                }
              />
            </div>

            <div className="setting-row">
              <div>
                <h3>Email Notifications</h3>
                <p>Send platform notifications.</p>
              </div>

              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={() =>
                  handleToggle("emailNotifications")
                }
              />
            </div>

            <div className="setting-row">
              <div>
                <h3>Security Logging</h3>
                <p>Record authentication events.</p>
              </div>

              <input
                type="checkbox"
                checked={settings.securityLogging}
                onChange={() =>
                  handleToggle("securityLogging")
                }
              />
            </div>

            <div className="setting-row">
              <div>
                <h3>Auto Approve Contractors</h3>
                <p>Automatically verify contractor accounts.</p>
              </div>

              <input
                type="checkbox"
                checked={settings.autoApproveContractors}
                onChange={() =>
                  handleToggle("autoApproveContractors")
                }
              />
            </div>

            <div className="setting-row">
              <div>
                <h3>Automatic Database Backup</h3>
                <p>Create scheduled backups daily.</p>
              </div>

              <input
                type="checkbox"
                checked={settings.backupEnabled}
                onChange={() =>
                  handleToggle("backupEnabled")
                }
              />
            </div>

          </div>

        </div>

        <div className="system-health-grid">

          <div className="health-card">
            <Shield size={34} />
            <h3>Security</h3>
            <p>Protected</p>
          </div>

          <div className="health-card">
            <Database size={34} />
            <h3>Database</h3>
            <p>Healthy</p>
          </div>

          <div className="health-card">
            <Bell size={34} />
            <h3>Notifications</h3>
            <p>Operational</p>
          </div>

          <div className="health-card">
            <Globe size={34} />
            <h3>API</h3>
            <p>Online</p>
          </div>

        </div>

        {saved && (
          <div
            className="activity-panel"
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            <CheckCircle
              size={36}
              color="#10B981"
            />
            <h2>Settings Saved Successfully</h2>
          </div>
        )}

      </div>
    </AdminLayout>
  );
}