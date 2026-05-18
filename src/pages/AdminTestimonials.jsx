import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Trash2, Plus, Eye, EyeOff, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminTestimonials() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ quote: '', name: '', title: '', metric: '', is_published: true });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    base44.auth.me().then(u => {
      setUser(u);
      setLoading(false);
      if (u?.role === 'admin') fetchTestimonials();
    }).catch(() => setLoading(false));
  }, []);

  const fetchTestimonials = async () => {
    const data = await base44.entities.Testimonial.list('-created_date');
    setTestimonials(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await base44.entities.Testimonial.create(form);
    setForm({ quote: '', name: '', title: '', metric: '', is_published: true });
    setShowForm(false);
    await fetchTestimonials();
    setSaving(false);
  };

  const handleDelete = async (id) => {
    await base44.entities.Testimonial.delete(id);
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const togglePublish = async (t) => {
    await base44.entities.Testimonial.update(t.id, { is_published: !t.is_published });
    setTestimonials(prev => prev.map(item => item.id === t.id ? { ...item, is_published: !t.is_published } : item));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-semibold mb-2">Access Denied</h2>
          <p className="text-muted-foreground">This page is only available to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-heading text-3xl font-semibold">Testimonials</h1>
            <p className="text-muted-foreground text-sm mt-1">Admin only — manage client testimonials</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus size={16} /> Add Testimonial
            </button>
            <button
              onClick={() => base44.auth.logout('/')}
              className="flex items-center gap-2 border border-border px-4 py-2 text-sm hover:bg-muted transition-colors"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Add Form */}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="border border-border p-6 mb-8 space-y-4 bg-card"
          >
            <h2 className="font-heading text-lg font-semibold mb-4">New Testimonial</h2>
            <textarea
              required
              placeholder="Quote *"
              value={form.quote}
              onChange={e => setForm({ ...form, quote: e.target.value })}
              rows={3}
              className="w-full border border-border bg-background px-4 py-3 text-sm resize-none focus:outline-none focus:border-accent"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                required
                placeholder="Client Name *"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent"
              />
              <input
                required
                placeholder="Title & Company *"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <input
              placeholder="Key metric / result (optional)"
              value={form.metric}
              onChange={e => setForm({ ...form, metric: e.target.value })}
              className="w-full border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:border-accent"
            />
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={e => setForm({ ...form, is_published: e.target.checked })}
                  className="accent-accent"
                />
                Publish immediately
              </label>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="bg-primary text-primary-foreground px-6 py-2 text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving…' : 'Save Testimonial'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="border border-border px-6 py-2 text-sm hover:bg-muted transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}

        {/* Testimonials List */}
        <div className="space-y-4">
          {testimonials.length === 0 && (
            <p className="text-muted-foreground text-sm text-center py-12">No testimonials yet. Add your first one above.</p>
          )}
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`border p-6 flex gap-4 justify-between items-start ${t.is_published ? 'border-border' : 'border-border/40 opacity-60'}`}
            >
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed mb-3 italic">"{t.quote}"</p>
                <p className="font-medium text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.title}</p>
                {t.metric && <p className="text-accent text-xs mt-1">→ {t.metric}</p>}
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => togglePublish(t)}
                  title={t.is_published ? 'Unpublish' : 'Publish'}
                  className="p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  {t.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="p-2 hover:bg-muted transition-colors text-muted-foreground hover:text-destructive"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
